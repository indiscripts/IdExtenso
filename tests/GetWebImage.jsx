// IdExtenso wants to run in INDD.
// ---
#target 'indesign'

// Path to IdExtenso entry point.
// ---
#include '../$$.jsxinc'

// Web module.
// ---
#include '../etc/$$.Web.jsxlib'

// Load the framework in TRACE mode (you may use -1 instead.)
// -1 == trace-level ; 0 == mute ; +1 == warn-level
// ---
$$.load('TRACE');

// =============================================================================
// GetWebImage [170408]
// Download a remote PNG (through http) and load it in a ScriptUI dialog.
// ---
// Demonstrates:
// - `$$.Web(url)`, shortcut of `$$.Web.get(url)`
// - Using toSource() with binary strings is more compact with IdExtenso
// - Tracing script steps thru `$$.trace()`
// - Details on log levels and associated behaviors
// =============================================================================
try
{
	const url = 'http://pbs.twimg.com/profile_images/1480257582/indiscripts_bigger.png';
	
	// GET url (via HTTP/1.0 transaction.)
	// ---
	var img = $$.Web(url);
	
	if( img.error )
	{
		$$.error(img.error);
	}
	
	// Show what the stringified PNG looks like (-> log trace.)
	// ---
	// [REM] String.prototype.toSource is improved by IdExtenso :-)
	// ---
	// [REM] $$.trace is a shortcut of $$.Log.trace. It only operates if
	// the current log level implies tracing, which is the case for both
	// TRACE and WARN mode --while trace() does nothing in MUTE mode.
	// ---
	$$.trace(__(
		"PNG data: %1",
		img.data.toSource()
		));

	// Push the downloaded PNG in a ScriptUI dialog
	// (just because we can!)
	// ---
	var dlg = new Window('dialog');
	dlg.add('panel')
		.add('statictext', void 0, "Here is my Twitter logo:").parent
		.add('image', void 0, img.data).parent
		.add('button',void 0, "OK", {name:'OK'});
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