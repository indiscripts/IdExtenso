#include '../../$$.jsxinc'

#include '../../etc/$$.ScriptUI.jsxinc'
#include '../../etc/ScriptUI/factories/$$.Check.jsxinc'
#include '../../etc/ScriptUI/factories/$$.CheckGroup.jsxinc'

$$.load(0);

// =============================================================================
// TestCheckGroup [210810]
// CheckGroupFactory tester.
// =============================================================================
try
{
	ScriptUI.builder
	({
		properties:                     { type:'dialog', text:"Test CheckGroupFactory" },
		margins:                        20,
		spacing:                        5,
		orientation:                    'column',
		
		Group$0:
		{
			optimalSize:                [320,80],
			orientation:                'column',
			alignChildren:              ScriptUI.CC,
			StaticText$Info:
			{
				properties:             { text:__("Here is a CheckGroup component:") },
				optimalSize:            { width:200 },
			},
		},

		Group$1:
		{
			optimalSize:                [320,80],
			orientation:                'column',
			alignChildren:              ScriptUI.LC,
			margins:                    20,
			background:                 $$.isDark ? 0x334455 : 0xBBCCDD,

			CheckGroupFactory$MyCheckGp:
			[{
				columns:                [3,2,3],
				margins:                20,
				spacing:                10,
				checkWidth:             100,
				help:                   __("Select the style options."),
				onRightClick:           function onRightClick(ev)
				{
					this.window.Info.text = "Right-clicked: " + ev.target.name;
				},
				onClickChange:          function onClickChange(ev,  tg,w,v)
				{
					tg = ev.target;
					(w=this.window).Info.text = (tg.name || tg) + ": " + tg.value;
					switch( tg.name )
					{
						case 'ckBold':
						case 'ckItal':
							v = w.ckBold.value;
							w.ckBoldItal.value = (v ^ w.ckItal.value) ? -1 : v;
							break;
						
						case 'ckBoldItal':
							w.ckBold.value = 0 > (v = tg.value)
							? ( 1 - w.ckBold.value )
							: ( w.ckItal.value = v );
							break;

						case 'ckLower':
							tg.value && w.ckUpper.value && (w.ckUpper.value=0);
							break;

						case 'ckUpper':
							tg.value && w.ckLower.value && (w.ckLower.value=0);
							break;

						default:;
					}
					
				},
				
				//----------------------------------
				// COL #1
				//----------------------------------
				$ckBold:
				{
					text:               __("Bold"),
					value:              1,
				},
				$ckItal:
				{
					text:               __("Italic"),
					value:              0,
				},
				$ckBoldItal:
				{
					text:               __("Bold Ital"),
					value:              -1,
					ternary:            true,
				},

				//----------------------------------
				// COL #2
				//----------------------------------
				$ckLower:               __("Lowercase"),
				$ckUpper:               __("Uppercase"),

				//----------------------------------
				// COL #3
				//----------------------------------
				$ckRed:                 __("Red"),
				$ckGreen:               __("Green"),
				$ckBlue:                __("Blue"),
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