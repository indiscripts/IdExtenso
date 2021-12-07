#include '../../$$.jsxinc'

#include '../../etc/$$.ScriptUI.jsxinc'
#include '../../etc/ScriptUI/factories/$$.Popup.jsxinc'
#include '../../etc/ScriptUI/factories/$$.CheckList.jsxinc'

$$.load();

// =============================================================================
// TestCheckList [210814] [211207]
// CheckListFactory tester, using a Popup component.
// [CHG211207] The 'InDesign' item is made LOCKED using `###` prefix
// =============================================================================
try
{
	ScriptUI.builder
	({
		properties:                     { type:'dialog', text:"Test CheckListFactory" },
		margins:                        0,
		spacing:                        0,
		orientation:                    'stack',
		
		Group$0:
		{
			margins:                    20,
			spacing:                    20,
			orientation:                'row',

			Group$0:
			{
				orientation:            'column',
				alignChildren:          ScriptUI.LT,
				margins:                20,
				spacing:                10,

				StaticText$0:           { properties:{text:__("List of products:")} },
				CheckListFactory$MyCheckList:
				[{
					data:              [
					                     "+ Adobe",
					                        "++ Design", "### InDesign", "+++ Illustrator", "--- Photoshop", "--- Acrobat",
					                        "-- Video",  "--- Premiere", "--- AfterEffects",
					                        "-- Audio",  "--- Audition",
					                     "+ Indiscripts", "++ IndexMatic", "++ IndyFont", "++ BookBarcode", "++ HurryCover", "++ Wordalizer", "++ Claquos",
					                     "- (Others)", "-- Product1", "-- Product2", "-- Product3", "-- Product4"
					                     ],
					maxLines:           16,
					onValueChange:      function onValueChange()
					{
						var n = this.countNodes();
						var N = this.countNodes('all');
						this.window.Info.text = __("%1/%2 nodes selected.", n, N) + '\r\r' + this.getString(1,'slashed').replace(RegExp.X1,'\r');
					},
					onRightClick:      function onRightClick()
					{
						this.popup( __("Click to check/uncheck items or branches. Use Ctrl A to select all nodes, Ctrl Alt A to deselect all nodes."), 2, 4 );
					},
				}],
			},

			Group$1:
			{
				orientation:            'column',
				alignment:              ScriptUI.LF,
				margins:                20,
				spacing:                10,
				
				Group$1:
				{
					alignment:          ScriptUI.LT,
					StaticText$Info:    { properties:{text:'',multiline:true}, minimumSize:[250,300] },
				},

				Group$2:
				{
					margins:            20,
					orientation:        'row',
					alignment:          ScriptUI.CB,
					alignChildren:      ScriptUI.CC,
					Button$OK:          { properties: { text: __("OK"), name: 'ok'} },
					Button$KO:          { properties: { text: __("Cancel"), name: 'cancel'} },
				}
			},
		},
		
		PopupFactory$MyPopup:           [{ auto:1, lineChars:50 }],
	})
	.show();
}
catch(e)
{
	$$.receiveError(e);
}

$$.unload();