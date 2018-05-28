// IdExtenso wants to run in INDD.
// ---
#target 'indesign'

// Path to IdExtenso entry point.
// ---
#include '../$$.jsxinc'

// Load the framework.
// ---
$$.load();

// =============================================================================
// ScriptUIBuilder [180528]
// Easily create a ScriptUI interface.
// ---
// Demonstrates:
// - Using the `ScriptUI.builder()` function.
// - Example of 'resource object' with various widgets.
// - Implementing a custom component thru a 'factory.'
// =============================================================================

try
{
	const UI = function UI(/*str[]*/evs,  i,w)
	//----------------------------------
	{
		w = ScriptUI.builder.call(callee,callee.RES);
		if( evs instanceof Array )
		{
			for(
				i=evs.length ;
				i-- ;
				w.addEventListener(evs[i],callee.onEvent)
			);
		}
		w.show();
	};
	
	// Some static settings.
	// ---
	UI.TITLE = "Hello World";
	UI.WIDTH = 600;
	UI.MARGINS = 15;
	UI.PNG_EYE = "\x89PNG\r\n\x1A\n\0\0\0\rIHDR\0\0\0\"\0\0\0\x10\b\x06\0\0\0s\xF5\xADd\0\0\0\tpHYs\0\0\v\x12\0\0\v\x12\x01\xD2\xDD~\xFC\0\0\0\xDAIDATH\xC7c\xF8\xFF\xFF?\x03)\xF8\rC\x8F\x02\x10O\0\xE2\v@\xFC\x1F\r_\x80\xCA)\x90j.\xA9\x8Eh\xC0b9.\xDC@u\x87\0\r\x15@\x0F\x81\xDB\fM\xFF;\x18\x02\xFF\x1B2\xC8\x02Ma\0c\x10\x1B$\x06\x92C\n!\x01j:d\x01\xB2#.1\xD4\xA28\0\x1D\x83\xE4@j\xA0\xEA\x17P\xC5!@\x83\x1C\xD0C\x02\x9F#\x90\x1D\x83\x142\x0E\xD4p\xC8\x06d\x87\x80\x82\x1E\x9B\xC5\xEB\xD6\xAD\xFB\x0F\x03 6H\f\xA4\x16\xAAo\x035\x1C\x82\x92\b\xB1\x85\x86\xB9\xB9\xF9\x7Ft\0\v\x15\x98>\x8A\x1C\x02M\xA4(\x0E\xC1\x16\x1A\xB8\x1C\x02\xC2tu\b\xAE\xA8\xA1\x9AC\x88\x8D\x1A|\t\x96\x9A\x0E!*\xB1b\xC3\xD4N\xAC\x83#\xFB\x0E\x9A\x02mP\x15\xF1H\x0E\x1A\xD8J\x0F\xCD14i\x06\0\0\xA3\xE2H8\x16T\xD5^\0\0\0\0IEND\xAEB`\x82";
	
	// Generic event handler.
	// ---
	UI.onEvent = function onEvent(/*Event*/ev,  tg,s)
	//----------------------------------
	{
		tg = ev.target;
		s = (tg.properties && tg.properties.name) || '<no name>';
		tg.window['info'].text = __("Event type: %1.\r\rTarget: %2.\r\rInternal Name: %3.\r\rTime stamp: %4 -- Phase: %5."
			, ev.type
			, tg.__class__
			, s
			, ev.timeStamp.toLocaleTimeString()
			, ev.eventPhase
			);
	};
	
	UI.squares = function squares(/*Widget*/parent,/*0xRRGGBB[]*/a,  r,i,t,gx,rgb)
	//----------------------------------
	// Factory.
	{
		r = parent.add('group');
		r.orientation = 'row';
		r.margins = r.spacing = 5;
		
		for( i=-1 ; ++i < a.length ; )
		{
			rgb = a[i];
			t = r.add('group', void 0, {name:'#'+('000000'+rgb.toString(16)).substr(-6)});
			t.minimumSize = [50,50];
			gx = t.graphics;
			gx.backgroundColor = gx.newBrush(
				gx.BrushType.SOLID_COLOR,
				[ (0xFF&(rgb>>>16))/255, (0xFF&(rgb>>>8))/255, (0xFF&(rgb>>>0))/255, 1 ]
				);
		}
		return r;
	};
	
	// UI resource object.
	// ---
	UI.RES =
	{
		properties:                     { type:'dialog', text:UI.TITLE, },
		margins:                        UI.MARGINS,
		spacing:                        UI.MARGINS,
		orientation:                    'column',
		alignChildren:                  ScriptUI.LT,

		Panel$eventsPanel:
		{
			properties:                 { text:__("Events"), },
			minimumSize:                { width: UI.WIDTH-2*UI.MARGINS },
			margins:                    UI.MARGINS,

			StaticText$info:
			{
				properties:             { multiline:true },
				minimumSize:            { width: UI.WIDTH-5*UI.MARGINS },
				preferredSize:          { height: 150 },
			},
		},

		Panel$widgetsPanel:
		{
			properties:                 { text:__("Widgets"), },
			minimumSize:                { width: UI.WIDTH-2*UI.MARGINS },
			margins:                    UI.MARGINS,
			orientation:                'row',
			spacing:                    30,
			alignChildren:              ScriptUI.LT,

			DropDownList$lb:
			{
				properties:             { items:['aaa','bbb','ccc','ddd'] },
				minimumSize:            { width:120 },
				selection:              'aaa',
			},
			
			Group$0:
			{
				margins:                0,
				orientation:            'column',
				spacing:                UI.MARGINS,
				alignChildren:          ScriptUI.LT,
				
				EditText$edit:
				{
					properties:         { text:__("<Enter some text>"), enterKeySignalsOnChange:true, },
					minimumSize:        { width: 150 },
				},
				
				Checkbox$cb:
				{
					properties:         { text:__("Check me"), },
					minimumSize:        { width: 150 },
				},

				RadioButton$rb:
				{
					properties:         { text:__("This is an option"), },
					minimumSize:        { width: 150 },
				},

				IconButton$ib:
				{
					properties:         { image:UI.PNG_EYE, style:'button', toggle:true },
					alignment:          ScriptUI.CT,
				},
			},

			Group$1:
			{
				margins:                0,
				orientation:            'column',
				spacing:                UI.MARGINS,
				alignChildren:          ScriptUI.RB,
				
				Custom$squares:         [ 'squares', [0x336699,0x333333,0x660000,0x006600] ],

				Button$btn1:
				{
					properties:         { text:__("Some Button") },
					minimumSize:        { width: 150 },
				},
				
				Button$btnQuit:
				{
					properties:         { text:__("Quit"), name:'OK' },
					minimumSize:        { width: 150 },
				},
			},
		}
	};
	
	// Send events to be listened to and show.
	// ---
	UI(['focus', 'changing', 'change', 'mouseenter', 'mousedown']);
}
catch(e)
{
	// Should something go wrong.
	// ---
	$$.receiveError(e);
}
// =============================================================================


// Unload the framework to cleanup memory.
// ---
$$.unload();