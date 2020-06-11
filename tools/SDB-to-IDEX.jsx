/*******************************************************************************

		Name:           SDB-to-IDEX
		Desc:           Translates SDB bundle (JSON) into SUI.builder syntax.
		Path:           /tools/SDB-to-IDEX.jsx
		Require:        IdExtenso
		Encoding:       ÛȚF8
		Core:           ---
		Kind:           Script for InDesign CS4/CS5/CS6/CC.
		API:            ---
		DOM-access:     ---
		Todo:           Refine/adjust special SDB properties...
		Created:        200606 (YYMMDD)
		Modified:       200611 (YYMMDD)

*******************************************************************************/

#include '../$$.jsxinc'

;if( $$.isBooting() )
{
	run = function run(  sdb,i,z,Q,c,items,a,ss,o,r,pid,w,t,sty,k,v)
	//----------------------------------
	{
		const START = '{"activeId":0';
		sdb = callee.GETS("Paste the SDB bundle string:", START+', /*etc*/ }', "SDB-to-$$");
		if( !sdb ) return;

		// Simple parser.
		// ---
		i = sdb.indexOf(START);
		0 <= i || $$.error( __("Cannot find SDB start marker: `%1`.",START) );
		sdb = sdb.slice(i);
		for( z=1, Q=false, i=0 ; 0 < z && ++i < sdb.length ; )
		{
			c = sdb.charAt(i);
			Q
			? ( Q = '"'!=c )
			: ( ( Q = '"'==c ) || ( '{'==c && ++z ) || ( '}'==c && --z ) );
		}
		0===z || $$.error( __("Cannot find SDB end marker: `}`.") );
		sdb = sdb.slice(0,1+i);
		
		// sdb :: { activeId:0, items:{...}, order:uint[], settings:{...} }
		// ---
		sdb = $$.JSON.eval(sdb);
		// ---
		items = sdb.items;
		items===Object(items) || $$.error( __("Invalid `items` property. Should be an object.") );
		// ---
		a = sdb.order||0;
		( a instanceof Array ) || $$.error( __("Invalid `order` property. Should be an array of uint.") );
		// ---
		ss = sdb.settings;
		ss===Object(ss) || $$.error( __("Invalid `settings` property. Should be an object.") );

		// Loop.
		// ---
		const RE_WIN = /^Dialog|Window|Palette$/i;
		for( r=[], z='', pid=false, i=-1 ; ++i < a.length ; pid=o.id )
		{
			// o :: { id:uint, type:str, parentId:uint, style:{...}  }
			// ---
			(o=items['item-'+a[i]]) || $$.error( __("Item %1 unavailable.", a[i]) );
			
			'string' == typeof(t=o.type) || $$.error( __("No type associated to item-%1.", a[i]) );
			
			w = RE_WIN(t);
			
			z && w && $$.error( __("Redeclared window: item-%1 type is %2.", a[i], t) );
			z || w || $$.error( __("Missing window: item-%1 type is %2.", a[i], t) );
			
			// sty :: { ?varName, ?windowType, ?text, ?bounds, ?listItems, creationProps:{}, ?preferredSize, ?margins, ?orientation, ?spacing, ?alignChildren, etc }
			// ---
			sty = o.style;
			sty===Object(sty) || $$.error( __("Invalid `style` property in item-%1. Should be an object.", a[i]) );
			w && (!sty.windowType) && (sty.windowType=t);
			
			// Need to close some brackets?
			// ---
			v = o.parentId;
			while( pid !== v )
			{
				z = z.slice(1);
				r[r.length] = z + '},';
				pid = items['item-'+pid].parentId;
			}
			
			// Write.
			// ---
			z && (r[r.length] = z + __("%1$%2:", t, sty.varName||a[i]));
			r[r.length] = z + '{';
			
			// Increment z and set props/sty.
			// ---
			z += '\t';
			r[r.length] = callee.RPAD(z,'properties:') + callee.MKPP(sty) + ',';
			for( k in sty ) sty.hasOwnProperty(k) && null!==(v=sty[k]) && (v=callee.VSTR(v,k)).length && (r[r.length] = callee.RPAD(z, k+':') + v + ',');
		}
		// Need to close some brackets?
		// ---
		while( pid !== false )
		{
			z = z.slice(1);
			r[r.length] = z + '},';
			pid = items['item-'+pid].parentId;
		}
		
		$$.File.temp( r.join('\r'), 'jsxinc', 1, 'UTF8' );
	}
	.setup
	({
		GETS: function(/*str*/caption,/*str*/def,/*str*/title,  res,w,r)
		//----------------------------------
		// (Get-String.)
		// => str
		{
			res = callee.UI;
			res.properties.text = title;
			res.Group$0.StaticText$Caption.properties.text = caption;
			res.Group$0.EditText$Input.properties.text = def;
			res.Group$1.Button$OK.properties.text = __("OK");
			res.Group$1.Button$KO.properties.text = __("Cancel");
			
			w = ScriptUI.builder(res);
			r = w.show();
			return 1==r ? w.Input.text : '';
		}
		.setup
		({
			UI:
			{
				properties:             { type:'dialog', text:'', borderless:false },
				orientation:            'column',
				alignChildren:          ScriptUI.CT,
				margins:                20,
				spacing:                20,
				Group$0:
				{
					properties:         { },
					orientation:        'column',
					alignChildren:      ScriptUI.LT,
					margins:            0,
					spacing:            20,
					StaticText$Caption:
					{
						properties:     { text:'' },
					},
					EditText$Input:
					{
						properties:     { text:'', multiline:true },
						optimalSize:    [400,200],
						active:         true,
					},
				},
				Group$1:
				{
					properties:         { },
					orientation:        'row',
					alignChildren:      ScriptUI.LT,
					margins:            0,
					spacing:            20,
					Button$OK:
					{
						properties:     { text:'OK', name:'ok' },
					},
					Button$KO:
					{
						properties:     { text:'Cancel', name:'cancel' },
					},
				},
			},
		}),

		RPAD: function(/*str*/tabs,/*str*/pKey,  w)
		//----------------------------------
		// => str  ; tabs+pKey+<spaces>
		{
			w = tabs.length*callee.TB_MUL + pKey.length;
			return tabs + pKey + callee.SPA.slice(w);
		}
		.setup
		({
			TB_MUL: 4,
			SPA: Array(61).join(' '),
		}),
		
		MKPP: function(/*obj&*/sty,  pp,RE,k,b,t)
		//----------------------------------
		// (Make-Properties-Str.)
		// => "{ . . . }"
		{
			pp = {};

			RE = callee.RE_ARGS;
			LI_SPLIT = /, /g;
			for( k in sty )
			{
				if( !sty.hasOwnProperty(k) || 'creationProps'==k ) continue;
				t = sty[k];
				switch( k )
				{
					case 'varName' :    b=1; break;
					case 'windowType' : b=1; pp.type = t.toLowerCase(); break;
					case 'bounds':      b=1; pp.bounds = t instanceof Array ? t.slice() : $$.clone(t); break;
					case 'listItems':   b=1; pp.items = t instanceof Array ? t.slice() : t.split(LI_SPLIT); break;
					case 'scrollable':  b=1; pp.scrolling = t; break; // [FIX200611] SDB `scrollable` means EditText `scrolling`
					default:            (b=RE.test(k)) && (pp[k]=t);
				}
				b && delete sty[k];
			}

			if( t=sty.creationProps )
			{
				for( k in t ) t.hasOwnProperty(k) && (pp[k]=t[k]);
				delete sty.creationProps;
			}
			
			return $$.JSON(pp).replace(callee.RE_NOQUO,'$1');
		}
		.setup
		({
			RE_ARGS : /^text|image|icon|file|value|minvalue|maxvalue$/,
			RE_NOQUO: /"(name|type|bounds|items|text|image|icon|file|value|minvalue|maxvalue|su1PanelCoordinates|maximizeButton|minimizeButton|independent|closeButton|borderless|borderStyle|truncate|multiline|scrolling|scrollable)"(?=:)/g,
		}),
		
		VSTR: function(/*any*/v,/*key*/k,  r,t)
		//----------------------------------
		// (Value-String.)
		// => str [OK]  |  '' [KO]
		{
			switch( k )
			{
				case 'orientation':
					r = "'" + v.toLowerCase() + "'";
					break;
				
				case 'alignChildren':
				case 'alignment':
				case 'justify':
					if( 'string' == typeof v ){ r="'" + v.toLowerCase() + "'"; break; }
					if( !(v instanceof Array ) ){ r = $$.JSON(v); break; }
					t = String(v[0]||'').charAt(0).toUpperCase() + String(v[1]||'').charAt(0).toUpperCase();
					if( ScriptUI.hasOwnProperty(t) ){ r = 'ScriptUI.' + t; break; }
					r = $$.JSON(v);
					break;
				
				case 'preferredSize':
				case 'minimumSize':
				case 'maximumSize':
					// When a size is unspecified, SDB still sends a [0,0] array.
					r = '';
					if( !(v instanceof Array ) || 2 != v.length ) break;
					r = [ (0 < v[0] ? ('width:'+v[0]) : ''), (0 < v[1] ? ('height:'+v[1]) : '') ].join(',');
					1 < r.length ? (r='{'+r+'}') : (r='');
					break;
				
				case 'margins':
					// SDB provides margins in TRBL order; SUI expects LTRB.
					r = v instanceof Array
					? __("[%4,%1,%2,%3]",v[0]>>>0,v[1]>>>0,v[2]>>>0,v[3]>>>0)
					: ('' + ( v>>>0 ));
					break;
				
				case 'enabled':
					// [ADD200611] Only required if set to false.
					r = v ? '' : 'false';
					break;

				default:
					r = $$.JSON(v);
			}

			return r;
		},
	});
}

$$.load();
try{ run() }catch(e){ $$.receiveError(e) }
$$.unload();