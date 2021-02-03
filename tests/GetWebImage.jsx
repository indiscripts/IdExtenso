// IdExtenso wants to run in INDD.
// ---
#target 'indesign'

// Path to IdExtenso entry point.
// ---
#include '../$$.jsxinc'

// Web module.
// ---
#include '../etc/$$.Web.jsxlib'

// Load the framework in TRACE mode
// ---
$$.load(-1);

// =============================================================================
// GetWebImage [171024] [190322] [210203]
// Download a remote PNG through http or https and load it in a ScriptUI dialog.
// The user can now click the image to open the URL in a navigator.
// ---
// Demonstrates:
// - `$$.Web(url)`, shortcut of `$$.Web.get(url)`
// - Using toSource() with binary strings is more compact with IdExtenso
// - Tracing script steps thru `$$.trace()`
// - Details on log levels and associated behaviors
// - Using ScriptUI.builder :-)
// =============================================================================

try
{
	const url = "http://indiscripts.com/blog/public/IndiscriptsLogo.png";
	
	// GET url.
	// ---
	var img = $$.Web(url, 0);
	
	if( img.error )
	{
		$$.error(img.error);
	}
	
	// [ADD210203] Check PNG signature.
	// ---
	if( 0 != img.data.indexOf('\x89\x50\x4E\x47\x0D\x0A\x1A\x0A') )
	{
		$$.trace( __("Downloaded data: %1", img.data.toSource()) );
		$$.error( __("Invalid PNG string: %1", img.data.rtrunc(50).toSource() ) );
	}
	
	
	// Show how the stringified PNG looks like (-> log trace.)
	// ---
	// [REM] String.prototype.toSource is improved by IdExtenso :-)
	// ---
	// [REM] $$.trace is a shortcut of $$.Log.trace. It only operates if
	// the current log level implies tracing, which is the case for both
	// TRACE and WARN mode --while trace() does nothing in MUTE mode.
	// ---
	$$.trace( __("PNG data: %1", img.data.toSource()) );


	// Push the downloaded PNG in a ScriptUI dialog :-)
	// ---
	$$.trace( __("Call ScriptUI.builder and run the dialog.") );

	var dlg = ScriptUI.builder
	({
		properties:           { type:'dialog' },
		Panel$:
		{
			helpTip:          "Click the image to open the original link in your navigator.",
			StaticText$:
			{
				properties:   { text:"Here is my great logo:" },
			},
			Image$:
			{
				properties:   { image: img.data, link:url },
				maximumSize:  [500,500],
				_mousedown:   function(ev){ $$.Web.browse(this.properties.link) },
			},
			Button$:
			{
				properties:   { text: 'OK' },
				helpTip:      "Close the dialog.",
			},
		}
	});
	
	dlg.show();
}

catch(e)
{
	// Just in case something goes wrong.
	// ---
	$$.receiveError(e);
}
// =============================================================================


// Please, unload the framework to cleanup memory.
// Also, this auto-opens the log file (if active.)
// ---
$$.unload();