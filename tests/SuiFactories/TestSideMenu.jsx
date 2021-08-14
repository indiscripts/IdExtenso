#include '../../$$.jsxinc'

#include '../../etc/$$.ScriptUI.jsxinc'
#include '../../etc/ScriptUI/factories/$$.Popup.jsxinc'
#include '../../etc/ScriptUI/factories/$$.SideMenu.jsxinc'

$$.load(0);

// =============================================================================
// TestSideMenu [210814]
// SideMenuFactory tester. (Also using a Popup.)
// =============================================================================
try
{
	ScriptUI.builder
	({
		properties:                     { type:'dialog', text:"Test SideMenuFactory" },
		margins:                        0,
		spacing:                        0,
		orientation:                    'stack',
		
		Group$0:
		{
			margins:                    20,
			spacing:                    20,
			orientation:                'column',

			Group$0:
			{
				orientation:            'row',
				alignChildren:          ScriptUI.LT,
				margins:                0,
				spacing:                20,

				SideMenuFactory$MyMenu:
				[{
					// Note that the below keys start with `$` and match the panel keys
					// declared outside the SideMenu. See Group$Features components.
					$Feat1:            [__("My feature 1"), __("This amazing feature allows you to blablabla.")],
					$Feat2:            [__("My feature 2"), __("Here is another great tool powered by this script.")],
					$Feat3:            [__("My feature 3"), __("Finally, you can now experience the best feature ever.")],
					// --- Other options
					value:             1,
					autoFocus:         true,
					optWidth:          100,
					barWidth:          2,
					onClickChange:     function onClickChange()
					{
						this.popup( __("You are now entering Feature #%1 area.",1+this.value), 1, 1.5 );
					},
				}],

				Group$Features:
				{
					orientation:        'stack',
					alignChildren:      ScriptUI.LT,
					margins:            0,
					spacing:            0,
					
					Panel$Feat1:
					{
						optimalSize:    [300,250],
						alignChildren:  ScriptUI.LT,
						background:     0x336699,
						StaticText$0:   { properties: {text:__("Feature 1:")} },
						EditText$1:     { properties: {text:__("Enter some text")} },
					},

					Panel$Feat2:
					{
						optimalSize:    [300,250],
						alignChildren:  ScriptUI.LT,
						background:     0x662200,
						StaticText$0:   { properties: {text:__("Feature 2:")} },
						Checkbox$1:     { properties: {text:__("That's my first option")} },
						Checkbox$2:     { properties: {text:__("Then my second choice")} },
					},

					Panel$Feat3:
					{
						optimalSize:    [300,250],
						alignChildren:  ScriptUI.LT,
						background:     0x009922,
						StaticText$0:   { properties: {text:__("Feature 3:")} },
						Listbox$1:
						{
							properties: { items:["item1","item2","item3","item4"] },
							optimalSize: [120,100],
						},
					},
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
			auto:                       1,
			margins:                    25,
			xOffset:                    20,
		}],
	})
	.show();
}
catch(e)
{
	$$.receiveError(e);
}

$$.unload();