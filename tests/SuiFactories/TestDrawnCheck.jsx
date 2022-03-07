#include '../../$$.jsxinc'

#include '../../etc/$$.ScriptUI.jsxinc'
#include '../../etc/ScriptUI/factories/$$.DrawnCheck.jsxinc'

// Load your custom icon functions:
ScriptUI.DrawnCheckFactory.Icons.setup
({
	LAYER: function LAYER(/*ScriptUIGraphics*/gx,/*ScriptUIPen*/pen,/*ScriptUIBrush*/bh)
	//----------------------------------
	// this :: Group[[DrawnCheck]]
	{
		gx.newPath();
		gx.draw(9,3)(3,7)(9,11)(15,7)(9,3);
		gx.strokePath(pen);
		gx.fillPath(bh);

		gx.newPath();
		gx.draw(3,10)(9,14)(15,10);
		gx.strokePath(pen);
	},

	FLASH: function FLASH(/*ScriptUIGraphics*/gx,/*ScriptUIPen*/pen)
	//----------------------------------
	// this :: Group[[DrawnCheck]]
	{
		gx.newPath();
		gx.draw(13,4)(9,4)(5,10)(8,10)(7,14)(8,14)(13,8)(10,8)(13,4);
		this.enabled
		? gx.fillPath(gx.newBrush(0,[1,1,.2, 1]))
		: gx.strokePath(pen);
	},

	TABLE: function TABLE(/*ScriptUIGraphics*/gx,/*ScriptUIPen*/pen)
	//----------------------------------
	// this :: Group[[DrawnCheck]]
	{
		gx.newPath();
		gx.draw(5,5)(13,5)(13,13)(5,13)(5,5);
		gx.draw(9,5)(9,13);
		gx.draw(5,9)(13,9);
		gx.strokePath(pen);
	},
	
	// etc
});


$$.load();

// =============================================================================
// TestDrawnCheck [220307]
// DrawnCheckFactory tester.
// =============================================================================
try
{
	ScriptUI.builder
	({
		properties:                     { type:'dialog', text:"Test DrawnCheckFactory" },
		margins:                        20,
		spacing:                        5,
		orientation:                    'column',
		
		Group$0:
		{
			optimalSize:                [320,50],
			orientation:                'column',
			alignChildren:              ScriptUI.LC,
			margins:                    [50,8,2,8],
			StaticText$:
			{
				properties:             { text: __("Three styles of DrawnCheck elements:") },
			},
		},

		Group$1:
		{
			orientation:                'row',
			alignment:                  ScriptUI.CC,
			spacing:                    10,

			DrawnCheckFactory$1:
			[{
				icon:                   'LAYER',
				value:                  0,
				help:                   __("Layer (toggles.)"),
			}],

			DrawnCheckFactory$2:
			[{
				icon:                   'FLASH',
				value:                  0,
				locked:                 true,
				help:                   __("Click this button..."),
				onClickChange:          function()
				{
					alert("So you've clicked the flash. This will toggle the Table icon.");
					this.window.Table.value ^= 1;
				},
			}],

			DrawnCheckFactory$Table:
			[{
				icon:                   'TABLE',
				value:                  0,
				ignoreClick:            true,
				help:                   __("Table (state icon.)"),
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