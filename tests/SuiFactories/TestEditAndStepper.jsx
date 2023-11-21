#include '../../$$.jsxinc'

#include '../../etc/$$.ScriptUI.jsxinc'
#include '../../etc/ScriptUI/factories/$$.Popup.jsxinc'
#include '../../etc/ScriptUI/factories/$$.Edit.jsxinc'
#include '../../etc/ScriptUI/factories/$$.EditInteger.jsxinc'
#include '../../etc/ScriptUI/factories/$$.Stepper.jsxinc'

$$.load();

// =============================================================================
// TestEditAndStepper [231121]
// Testing EditFactory and related components, using a Popup.
// Various Edit boxes ; EditInteger with min/max ; EditInteger + Stepper.
// =============================================================================
try
{
	ScriptUI.builder
	({
		properties:                     { type:'dialog', text:"Test Edit and Stepper" },
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
				orientation:            'column',
				alignChildren:          ScriptUI.LC,
				margins:                20,
				spacing:                10,

				StaticText$0:           { properties:{text:__("Native EditText control:")} },
				EditText$0:             { properties:{text:'abc'}, optimalSize:{width:200} },
				
				StaticText$1:           { properties:{text:__("Enter some letters:")} },
				EditFactory$MyEditAscii:
				[{
					value:              "Hello World", // The space will be filtered out at construction!
					helpTip:            __("Product Name."),
					textFilter:         /[a-z]+/gi,
					onFilter:           function onFilter()
					{
						this.popup( __("Only ASCII letters are allowed here."), 2, 1 );
					},
					onTextChange:       function onTextChange()
					{
						this.helpTip = __("Product Name:\r%1", this.textToValue(this.text).toSource());
					},
				}],

				StaticText$2:           { properties:{text:__("Enter some digits:")} },
				EditFactory$MyEditDigits:
				[{
					value:              0,
					helpTip:            __("Data are automatically formatted using the ##### pattern."),
					textFilter:         /\d{1,5}/gi,
					onFilter:           function onFilter(/*filtered*/ev)
					{
						var msg = 5 < ev.junk.length
						? "At most five characters are allowed here."
						: "Only digits are allowed here.";

						this.popup( __(msg), 2, 1 );
					},
					onValueChange:       function onValueChange(ev)
					{
						this.popup( __("Value successfully changed from %1 to %2.",ev.previous,this.value), 1, 2 );
					},
					textToValue:        function textToValue(tx)
					{
						return parseInt(tx,10)||0;
					},
					valueToText:        function valueToText(v,/*bool*/inline)
					{
						v >>>= 0;
						return inline ? String(v) : ('0000'+v).slice(-5);
					},
				}],

				StaticText$3:           { properties:{text:__("Multiple lines:")} },
				EditFactory$MyEditMulti:
				[{
					value:              0,
					helpTip:            __("Simple multiline editor."),
					textFilter:         /[ \w\r\n]+/gi,
					minLines:           5,
					scrolling:          true,
					onFilter:           function onFilter(/*filtered*/ev)
					{
						this.popup( __("Filtered content."), 2, 1 );
					},
					textToValue:        function textToValue(tx)
					{
						return tx;
					},
					valueToText:        function valueToText(v,/*bool*/inline)
					{
						return String(v||'');
					},
				}],

				Group$:
				{
					orientation:        'row',
					margin:             0,
					spacing:            10,
					StaticText$4:       { properties:{text:__("Enter an integer:")} },
					EditIntegerFactory$MyEditInteger:
					[{
						value:         2,
						helpTip:       __("Min value: -50 ; Max value: 100.") + '\r' + __("[Use Up/Down keys to increase/reduce the number. Shift also supported.]"),
						optWidth:      60,
						minValue:      -50,
						maxValue:      100,
						jump:          5, // +5|-5 offset when the user use Shift (Up|Down)
					}],
				},

				StaticText$5:           { properties:{text:__("Enter your age:")} },
				Group$MyStepperGroup: ScriptUI.EditIntegerFactory.Group
				({
					__key__:            'MyEditIntegerWithStepper',
					stepper:            'before',
					spacing:            1,
					// ---
					value:              30,
					helpTip:            __("This EditInteger is linked to a Stepper. Click (or Shift-Click) the stepper to increase/reduce the value."),
					minValue:           1,
					maxValue:           120,
					jump:               10, // +10|-10 offset when the user use Shift (Up|Down)
					onValueChange:       function onValueChange(ev)
					{
						this.popup( __("Your age (%1) has been saved.", this.value) );
					},
				}),
			},

			Group$1:
			{
				optimalSize:            [300,30],
				margins:                10,
				orientation:            'row',
				alignChildren:          ScriptUI.CC,
				Button$OK:              { properties: { text: __("OK"), name: 'ok'} },
				Button$KO:              { properties: { text: __("Cancel"), name: 'cancel'} },
			},
		},
		
		PopupFactory$MyPopup:           [{ auto: 1 }],
	})
	.show();
}
catch(e)
{
	$$.receiveError(e);
}

$$.unload();