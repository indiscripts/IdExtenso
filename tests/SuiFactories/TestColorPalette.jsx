#include '../../$$.jsxinc'

#include '../../etc/$$.ScriptUI.jsxinc'
#include '../../etc/ScriptUI/factories/$$.ColorPalette.jsxinc'

$$.load(0);

// =============================================================================
// TestColorPalette [240509]
// ColorPaletteFactory tester.
// =============================================================================
try
{
	const BTN_API =
	{
		setColor: function setColor(rgb){ this.text=this.__rgb__=rgb; ScriptUI.colorSetter(this.parent,rgb.slice(1)); },
		getColor: function getColor(){ return this.__rgb__ },
		onClick:  function onClick(){ this.window.MyPalette.showPalette(this) },
	};

	ScriptUI.builder
	({
		properties:                     { type:'dialog', text:"Test ColorPaletteFactory" },
		margins:                        0,
		spacing:                        0,
		orientation:                    'stack', // IMPORTANT
		
		Group$0:
		{
			margins:                    20,
			spacing:                    20,
			orientation:                'column',

			Group$0:
			{
				orientation:            'column',
				alignChildren:          ScriptUI.LC,
				margins:                5,
				spacing:                10,

				StaticText$1:
				{
					properties:         { text: "Click the buttons to change background colors:" },
				},

				Group$1:
				{
					orientation:       'row',
					alignChildren:     ScriptUI.LC,
					margins:           [5,5,100,5],
					spacing:           0,
					background:        'FF6600',
					Button$:
					{
						properties:    { text: "Click" },
						__rgb__:       '#FF6600',
						setColor:      BTN_API.setColor,
						getColor:      BTN_API.getColor,
						onClick:       BTN_API.onClick,
					},
				},

				Group$2:
				{
					orientation:       'row',
					alignChildren:     ScriptUI.LC,
					margins:           [5,5,100,5],
					spacing:           0,
					background:        'FF9999',
					Button$:
					{
						properties:    { text: "Click" },
						__rgb__:       '#FF9999',
						setColor:      BTN_API.setColor,
						getColor:      BTN_API.getColor,
						onClick:       BTN_API.onClick,
					},
				},

				Group$3:
				{
					orientation:       'row',
					alignChildren:     ScriptUI.LC,
					margins:           [5,5,100,5],
					spacing:           0,
					background:        '336699',
					Button$:
					{
						properties:    { text: "Click" },
						__rgb__:       '#336699',
						setColor:      BTN_API.setColor,
						getColor:      BTN_API.getColor,
						onClick:       BTN_API.onClick,
					},
				}
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
		
		ColorPaletteFactory$MyPalette:
		[{
			size:   20,
			layout: 'horizontal',
			addon:  ['336699','#9955cc'],
		}],
	})
	.show();
}
catch(e)
{
	$$.receiveError(e);
}

$$.unload();