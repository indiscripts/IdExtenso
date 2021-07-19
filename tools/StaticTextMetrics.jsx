/*******************************************************************************

		Name:           StaticTextMetrics
		Desc:           Test and refine measureWidth metrics for StaticText.
		Path:           /tools/StaticTextMetrics.jsx
		Require:        IdExtenso
		Encoding:       ÛȚF8
		Core:           NO
		Kind:           Script for InDesign CC Windows.
		API:            ---
		DOM-access:     NO
		Todo:           ---
		Created:        210624 (YYMMDD)
		Modified:       210719 (YYMMDD)

*******************************************************************************/

//==========================================================================
// NOTICE
//==========================================================================

/*

	This tool allows you to visually refine the data used in the special
	routine `ScriptUI.measureWidth()`, intended to correct wrong measurements
	returned from `ScriptUIGraphics.measureString()` in CC+Win environments.

*/

#include '../../$$/$$.jsxinc'
#include '../../$$/etc/ScriptUI/$$.colors.jsxinc'

;$$.StaticTextMetrics = function StaticTextMetrics(  w,r)
{
	if( $$.inCS || $$.inMac ){ $$.failure("Need InDesign CC Windows!"); return; }

	w = ScriptUI.builder.call(callee,callee.DIAL());
	if( 1===w.show() )
	{
		$$.trace(true);
		$$.success("The new FIX structure will show up in the log.");
		$$.trace(__("%1 > You can rewrite ScriptUI.measureWidth.FIX into:", "StaticTextMetrics"));
		$$.trace( $$.JSON(ScriptUI.measureWidth.FIX) );
	}
}
.setup
({
	LIST: function(  q,a,k)
	//----------------------------------
	// => str[]
	{
		q = ScriptUI.measureWidth.FIX;
		a = [];
		for( k in q ) q.hasOwnProperty(k) && (a[a.length]=k+' : '+q[k]);
		return a;
	},
	
	LCHG: function onListChange(w,cv,c,v,ed)
	//----------------------------------
	{
		const NB = 40;
		
		w = this.window;

		cv = (this.selection||0).text;
		if( !cv ){ w.Buttons.enabled = false; return; }
		
		cv = cv.split(' : ');
		c = cv[0];
		ed = w.Edit;
		ed.text = Array(1+NB).join(c);
		ed.onChanging();
		
		w.Buttons.enabled = true;
	},
	
	BTNS: function onButtonClick(/*MouseEvent*/ev,  w,q,tg,lb,sel,tx,cv,dv)
	//----------------------------------
	{
		q = ScriptUI.measureWidth.FIX;
		
		w = this.window;

		tg = ev.target;
		if( 'button' != tg.type ) return;

		lb = w.List;
		if( !(sel=lb.selection) ) return;

		switch( tg.text )
		{
			case '+': dv=1; break;
			case '–': dv=-1; break;
			default: dv=0;
		}
		if( !dv ) return;

		w.Changes.enabled = true;

		tx = sel.text;
		cv = tx.split(' : ');
		cv[1] = dv + parseInt(cv[1],10);
		q[cv[0]] = cv[1];
		sel.text = cv.join(' : ');
		lb.hide();
		lb.show();

		w.Edit.onChanging();
		w.Buttons.enabled = true;
	},
	
	ECHG: function onEditChanging(w,tx,x,fx,pc,t,tt)
	//----------------------------------
	{
		w = this.window;
		tx = this.text;

		w.Buttons.enabled = tx.charAt(0)===((w.List.selection||0).text||'').charAt(0);

		w.Static.text = tx;

		x = w.Static.graphics.measureString(tx)[0];
		fx = ScriptUI.measureWidth(tx,w.Static);

		w.Bar.size[0] = x;
		w.BarFix.size[0] = fx;
		pc = x && Math.round(100*(fx-x)/x);
		0 < pc && (pc='+'+pc);
		
		w.Info.text = x ?
		[
			"Native Width (orange): " + x,
			"Fixed Width (green): " + fx + "  (" + pc + "%)",
			'',
			"If the green bar doesn't match the text, you can adjust the width of a particular character using the +/– buttons below the list."
		].join('\r') : '';

		t = w.LiveTest;
		if( !tx ) return;
		
		
		// [ADD210719] Decouple text size and container size,
		// showing that the visible width of the text (fx)
		// diverges from the width assigned to the StaticText (x).
		// In practice, max(fx,x) sounds like a safe value.
		// ---
		try{
		tt = t.children[0];
		t.size[0] = fx;
		tt.size[0] = Math.max(fx,x);
		tt.text = tx;
		w.LiveInfo.text = "Tested width (Blue):  Group=" + t.size[0] + "  ;  Text=" + tt.size[0];
		}catch(e){alert(e)}
	},
	
	DIAL: function()
	//----------------------------------
	// `this` :: $$.StaticTextMetrics
	{
		return {
			properties:                     { type:'dialog', text:"Static Text Metrics", },
			margins:                        20,
			spacing:                        20,
			orientation:                    'row',
			alignChildren:                  ScriptUI.LT,
			
			Group$Side:
			{
				margins:                    0,
				spacing:                    10,
				orientation:                'column',
				alignChildren:              ScriptUI.CT,
				Listbox$List:
				{
					properties:             { items: this.LIST() },
					preferredSize:          [100,300],
					onChange:               this.LCHG,
				},
				Group$Buttons:
				{
					margins:                0,
					spacing:                10,
					orientation:            'row',
					Button$0:
					{
						properties:         { text:"+" },
						preferredSize:      { width:40 },
					},
					Button$1:
					{
						properties:         { text:"–" },
						preferredSize:      { width:40 },
					},
					_click:                 this.BTNS,
					enabled:                false,
				}
			},
			
			Group$Main:
			{
				margins:                    0,
				spacing:                    10,
				orientation:                'column',
				alignChildren:              ScriptUI.LT,
				
				StaticText$:
				{
					properties:             { text:"Enter some long text (or click in the list)" },
					minimumSize:            { width:500 },
				},
				
				EditText$Edit:
				{
					minimumSize:            { width:500 },
					onChanging:             this.ECHG,
				},
				
				Group$Sub:
				{
					margins:                0,
					spacing:                0,
					orientation:            'stack',
					alignChildren:          ScriptUI.LT,
					
					Group$BarFix:
					{
						margins:            0,
						preferredSize:      { height:8 },
						background:         0x669933,
					},

					Group$Bar:
					{
						margins:            0,
						preferredSize:      { height:3 },
						background:         0xCC4411,
					},
					
					StaticText$Static:
					{
						properties:         { text:'' },
						minimumSize:        { width:500 },
					},
				},
				
				Group$LiveTest:             // [ADD210719]
				{
					margins:                0,
					spacing:                0,
					orientation:            'stack',
					alignChildren:          ScriptUI.FC,
					background:             0x336699,
					staticText$:
					{
						properties:         {text:' '},
					}
				},
				
				Group$:
				{
					margins:                20,
					spacing:                20,
					orientation:            'column',
					alignChildren:          ScriptUI.LT,
					
					StaticText$LiveInfo:    { properties:{multiline:false}, minimumSize:{width:400} }, // [ADD210719]
					StaticText$Info:        { properties:{multiline:true}, minimumSize:[400,150] },
				},
				
				Group$Stop:
				{
					margins:                20,
					spacing:                20,
					orientation:            'row',
					alignChildren:          ScriptUI.LT,
					Button$Changes:
					{
						properties:         { text:"See Changes", name: 'ok' },
						enabled:            false,
					},
					Button$Quit:
					{
						properties:         { text:"Quit", name:'cancel' },
					},
				},
			},
		};
	},
});


$$.load();
$$.StaticTextMetrics();
$$.unload();
