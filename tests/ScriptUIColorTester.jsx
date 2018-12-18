// Path to IdExtenso entry point.
// ---
#include '../$$.jsxinc'

#include '../etc/ScriptUI/$$.colors.jsxinc'

// Load the framework.
// ---
$$.load();

// =============================================================================
// ScriptUIColorTester [181218]
// Test the ScriptUI/colors snippet.
// ---
// Demonstrates:
// - Creation of random background colors.
// - Color assignment via `0xRRGGBB` (hex) or `X|Y` descriptors
//   (normal AND disabled state.)
// - Getting a descriptor from `ScriptUI.colorGetter`.
// - Usage of ScriptUI.builder(), based on color keys.
// =============================================================================
try
{
	var w = ScriptUI.builder
	({
		properties:                     { type:'dialog', text:"ScriptUI Color Tester", },
		margins:                        20,
		spacing:                        10,
		orientation:                    'column',

		Checkbox$toggle:
		{
			properties:                 { text:"Enabled  [Uncheck to disable the group]", },
			value:                      true,
			alignment:                  ScriptUI.LT,
			onClick:                    function onClick(  g)
			                            {
			                            	g = this.window.mainArea;
			                            	g.enabled=!g.enabled;
			                            },
		},

		Group$mainArea:
		{
			preferredSize:              { width: 300, height:150 },
			maximumSize:                { width: 300, height:150 },
			margins:                    10,
			orientation:                'column',
			helpTip:                    __("Click the area to parse its color descriptor."),
			background:                 0x8F8F8F,

			Group$enabSquare:
			{
				minimumSize:            { width: 50, height:30 },
				maximumSize:            { width: 50, height:30 },
				alignment:              ScriptUI.RT,
				background:             "808080|_",
			},
			Group$disaSquare:
			{
				minimumSize:            { width: 50, height:30 },
				maximumSize:            { width: 50, height:30 },
				alignment:              ScriptUI.RB,
				background:             "_|808080",
			},

			_mousedown:                 function onClick(ev)
			                            {
			                            	var t = ev.target;
			                            	var desc = ScriptUI.colorGetter(t);
			                            	var v0 = ScriptUI.colorGetter(t,0);
			                            	var v1 = ScriptUI.colorGetter(t,1);
			                            	var msg = [
			                            		__("Target: %1\r", t.name),
			                            		__("Full descriptor: %1", desc.toSource()),
			                            		__("Normal color:    %1", v0 && v0.toHexa()),
			                            		__("Disabled color:  %1", v1 && v1.toHexa())
			                            		].join('\r');
			                            	alert( msg );
			                            },
		},

		Group$info:
		{
			margins:                    10,
			spacing:                    5,
			orientation:                'row',
			StaticText$1:               { properties:{ text:"Background:" } },
			StaticText$enabInfo:        { properties:{ text:"0x8F8F8F" }, characters:8 },
			StaticText$3:               { properties:{ text:"Disabled BG:" } },
			StaticText$disaInfo:        { properties:{ text:"none" }, characters:8 },
		},
		
		Group$1:
		{
			margins:                20,
			orientation:            'row',
			spacing:                20,
			alignChildren:          ScriptUI.CC,
			
			Button$colorize:
			{
				properties:         { text:__("Colorize") },
				minimumSize:        { width: 150 },
				onClick:            function onClick(  w,c1,c2,t)
				                    {
				                    	w = this.window;
				                    	c1 = Math.round(0xFFFFFF*Math.random());
				                    	c1 = (c1%11) ? c1.toHexa('',6) : '_';
				                    	// ---
				                    	c2 = Math.round(0xFFFFFF*Math.random());
				                    	c2 = (c2%5) ? c2.toHexa('',6) : '_';
				                    	// ---
				                    	ScriptUI.colorSetter(w.mainArea, c1+'|'+c2);
				                    	// ---
				                    	ScriptUI.colorSetter(w.enabInfo, c1, 1);
				                    	w.enabInfo.text = '_'==c1 ? 'none' : ('#'+c1);
				                    	ScriptUI.colorSetter(w.disaInfo, c2, 1);
				                    	w.disaInfo.text = '_'==c2 ? 'none' : ('#'+c2);
				                    	// ---
				                    	if( (t=w.toggle).value ) return;
				                    	t.value = true;
				                    	w.mainArea.enabled = true;
				                    },
			},
			
			Button$ko:
			{
				properties:         { text:__("Quit"), name:'cancel' },
				minimumSize:        { width: 150 },
			},
		},
	});

	w.show();
}
catch(e)
{
	$$.receiveError(e);
}


$$.unload();