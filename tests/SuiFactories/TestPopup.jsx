#include '../../$$.jsxinc'

#include '../../etc/$$.ScriptUI.jsxinc'
#include '../../etc/ScriptUI/factories/$$.Popup.jsxinc'

$$.load(0);

// =============================================================================
// TestPopup [210810]
// PopupFactory tester.
// =============================================================================
try
{
	ScriptUI.builder
	({
		properties:                     { type:'dialog', text:"Test PopupFactory" },
		margins:                        0,
		spacing:                        0,
		orientation:                    'stack',
		
		Group$0:
		{
			margins:                    20,
			spacing:                    20,
			orientation:                'column',
			_mouseover:                 function onMouseOver(ev,  pup,tg,s,msg,c,t)
			{
				pup = this.window.MyPopup;
				
				s = (tg=ev.target).name||'';
				if( !s ){ pup.update(); return; }
				if( s===callee.NAME ) return;
				
				callee.NAME = s;
				msg = .4 < Math.random()
				? __( "Random string: %1", String.random(~~(25*Math.random())).replace(RegExp.DIGIs,' ') )
				: __( "Target: %1\rType: %2", s, tg.type );
				if( 'button' == tg.type )
				{
					c = 0;
					t = 3;
					msg += '\r' + __("Closing in %1 sec...", t);
				}
				else
				{
					c = 1;
					t = 0;
					msg += '\r' + __("Click to close the popup.");
				}
				
				pup.update(tg, msg, c, t);
			},

			Group$0:
			{
				orientation:            'column',
				alignChildren:          ScriptUI.LC,
				margins:                20,
				spacing:                20,
				background:             $$.isDark ? 0x223344 : 0xCCDDEE,

				StaticText$MyStatic:
				{
					properties:         { text: __("This is a static text") },
					minimumSize:        { width: 200 },
					color:              0x009988,
				},

				EditText$MyEdit:
				{
					properties:         { text: __("This is an edit text") },
					minimumSize:        { width: 200 },
				},

				Checkbox$MyCheckbox:
				{
					properties:         { text: __("This is a checkbox") },
					minimumSize:        { width: 200 },
					value:              true,
				},

			},

			Group$1:
			{
				optimalSize:            [320,40],
				margins:                20,
				orientation:            'row',
				alignChildren:          ScriptUI.CC,

				Button$OK:              { properties: { text: __("OK"), name: 'ok'} },
				Button$KO:              { properties: { text: __("Cancel"), name: 'cancel'} },
			},
		},
		
		PopupFactory$MyPopup:
		[{
			auto:                       0, // Non-automatic popup so we'll use win.MyPopup.update(...)
			margins:                    8,
		}],
	})
	.show();
}
catch(e)
{
	$$.receiveError(e);
}

$$.unload();