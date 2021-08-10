#include '../../$$.jsxinc'

#include '../../etc/$$.ScriptUI.jsxinc'
#include '../../etc/ScriptUI/factories/$$.Check.jsxinc'

$$.load();

// =============================================================================
// TestCheck [210810]
// CheckFactory tester.
// =============================================================================
try
{
	ScriptUI.builder
	({
		properties:                     { type:'dialog', text:"Test CheckFactory" },
		margins:                        20,
		spacing:                        5,
		orientation:                    'column',
		
		Group$0:
		{
			optimalSize:                [320,50],
			orientation:                'column',
			alignChildren:              ScriptUI.LC,
			margins:                    [50,8,2,8],
			background:                 $$.isDark ? 0x223344 : 0xCCDDEE,
			Checkbox$MyCheckbox:
			{
				properties:             { text: __("Native ScriptUI Checkbox"), },
				value:                  false,
			},
		},

		Group$1:
		{
			optimalSize:                [320,80],
			orientation:                'column',
			alignChildren:              ScriptUI.LC,
			margins:                    [50,8,2,8],
			background:                 $$.isDark ? 0x334455 : 0xBBCCDD,

			CheckFactory$MyCheck1:
			[{
				text:                   __("Binary Check (with custom box)"),
				value:                  0,
				ternary:                false,
				help:                   __("Right-click the control to change its label..."),
				onRightClick:           function onRightClick(){ this.text=String.random(30); },
			}],

			CheckFactory$MyCheck2:
			[{
				text:                   __("Ternary Check"),
				value:                  0,
				ternary:                true,
				help:                   __("This help message will update on click."),
				onClickChange:          function onClickChange(){ this.helpTip=__("Current value: %1.",this.value); },
			}],

			CheckFactory$MyCheck3:
			[{
				text:                   __("Native Binary Widget"),
				value:                  0,
				customBox:              false,
				help:                   __("This Check component is drawn using a native checkbox widget."),
			}],

			CheckFactory$MyCheck4:      [__("Minimal declaration")],

			CheckFactory$MyCheck5:
			[{
				text:                   __("Emulates a radio button"),
				value:                  0,
				radio:                  true,
				help:                   __("This Check component is drawn like a radio button."),
			}],
		},

		Group$2:
		{
			margins:                    [20,20,20,0],
			orientation:                'row',
			alignChildren:              ScriptUI.CC,
			Button$OK:                  { properties: { text: __("OK"), name: 'ok'} },
			Button$KO:                  { properties: { text: __("Cancel"), name: 'cancel'} },
		},
	})
	.show();
}
catch(e)
{
	$$.receiveError(e);
}

$$.unload();