// Path to IdExtenso entry point.
// ---
#include '../$$.jsxinc'

// =============================================================================
// LevenFilterList [190313]
// Dynamic listbox filter based on Levenshteim distance.
// ---
// Demonstrates:
// - Using `String.levenFilter()`
// - Using the `ScriptUI.builder()` function with event handlers.
// =============================================================================

if( $$.isBooting() )
{
	run = function(/*uint=auto*/nw,  w)
	//----------------------------------
	// `nw` :: Number of words in the original listbox. By default, 3000+ items!
	{
		w = ScriptUI.builder.call(callee,
		{
			properties:                 { type:'dialog', text:callee.TITLE, },
			margins:                    callee.MARGINS,
			spacing:                    callee.MARGINS,
			orientation:                'column',
			alignChildren:              ScriptUI.CT,

			Panel$Main:
			{
				properties:             { text:__("Levenshteim Filter"), },
				margins:                callee.MARGINS,
				spacing:                0,
				orientation:            'column',
				helpTip:                __("The listbox will show similar words while you're typing.\r(Two characters min.)"),

				EditText$Edit:
				{
					properties:         { text:callee.INVITE, invite:callee.INVITE },
					optimalSize:        { width:callee.WIDTH },
					_focus:             callee.ED_FOCUS,
					_changing:          callee.ED_CHANGING,
				},

				ListBox$List:
				{
					properties:         { items:callee.GET_STRINGS(nw), filtered:0 },
					optimalSize:        { width:callee.WIDTH },
					maximumSize:        { height: 25*15 },
					itemSize:           [ callee.WIDTH,24 ],
					_change:            callee.LB_CHANGE,
				},
			},

			Group$Footer:
			{
				Button$Done:
				{
					properties:         { text:__("Done"), name:'OK' },
				},
			},
		});

		w.show();
	}
	.setup
	({
		INVITE:  __("<Enter some word>"),
		TITLE:   File($$.Env.runningScript).nudeName(),
		WIDTH:   300,
		MARGINS: 25,
		
		GET_STRINGS: function(/*uint=all*/n,  q,W,N,P,r,i)
		//----------------------------------
		// str[]
		{
			n >>>= 0;
			q = callee.ADOBE;
			if( !n ) return q.concat(callee.WORDS);
			if( n < q.length ) return q;

			N = (W=callee.WORDS).length;
			P = [11,13,31,47,61,79,101][~~(7*Math.random())];
			r = q.concat();

			for( i=~~(N*Math.random()) ; r.length < n ; r[r.length]=W[(i+=P)%N] );

			return r.sort();
		}
		.setup
		({
			ADOBE:
			#include 'LevenFilterList/adobe.jsxres'
			.trim().split(RegExp.LINE),

			WORDS:
			#include 'LevenFilterList/words.jsxres'
			.trim().split(RegExp.LINE),
		}),
		
		ED_FOCUS: function onFocus()
		//----------------------------------
		// this :: EditText
		{
			if( this.text != this.properties.invite ) return;
			this.text = '';
		},

		ED_CHANGING: function onChanging(/*?Event*/ev,  t,lb,a,FLT,i)
		//----------------------------------
		// this :: EditText ; ev.type :: 'changing'
		{
			t = this.text.toLowerCase();     // Input text (lower case.)
			lb = this.window.List;           // ListBox.

			a = lb.properties.items;         // Original strings.
			
			if( FLT=+(1 < t.length) )        // Exec filter?
			{
				a=String.levenFilter(a,t);     // Filtered strings.
			}
			else
			{
				if( !lb.properties.filtered ) return;
			}
			
			lb.hide();
			lb.removeAll();
			for( i=-1 ; ++i < a.length ; lb.add('item',a[i]) );
			lb.properties.filtered = FLT;
			lb.show();
		},

		LB_CHANGE: function onChange(/*Event*/ev,  s,t)
		//----------------------------------
		// this :: Listbox ; ev.type :: 'change'
		{
			if( callee.RUNNING || !(s=this.selection) ) return;
			
			callee.RUNNING = 1;
			(t=this.window.Edit).text = s.text;
			t.dispatchEvent(new UIEvent('changing',true,true));
			this.selection = 0;
			delete callee.RUNNING;
		},

	});
}


$$.load();
try{ run(500) } catch(e){ $$.receiveError(e) }
$$.unload();