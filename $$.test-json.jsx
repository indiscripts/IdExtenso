#target 'indesign'

// Path to IdExtenso entry point.
// ---
#include '$$.jsxinc'

// ---
// Additional includes are possible here.
// ---

// Don't forget to load the framework.
// ---
$$.load('TRACE');


// Your script goes here.
// =============================================================================
try
{
	$$.Log.chrono().trace("Processing some huge JSON on app.properties...");

	var json = $$.JSON(app.properties,1,0);

	$$.Log.trace(__("JSON done in %1 ms.",+$$.Log.chrono));
	
	alert( "The result should show up in a temporary file..." );

	$$.File.temp(json,'tmp',1/*SHOW*/);

	alert( "Next is coming the log file..." );
}
catch(e)
{
	$$.receiveError(e);
}
// =============================================================================


// Finally, unload the framework.
// ---
$$.unload();