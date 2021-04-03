// Remove the targetengine directive to test
// Env summary in a non-persistent engine.
// ---
#targetengine 'myScript'

// Path to IdExtenso entry point.
// ---
#include '../$$.jsxinc'

// Load the framework.
// ---
$$.load();

// =============================================================================
// ShowEnvironment [210403]
// Simply display the `Env.summary()` string.
// ---
// Demonstrates:
// - $$.Env.summary()  -- shortcut: $$.Env()
// =============================================================================
try
{
	$$.edit($$.Env().replace(/  +/g,' '));
}
catch(e)
{
	// In case something goes wrong.
	// ---
	$$.receiveError(e);
}
// =============================================================================


// Unload the framework.
// ---
$$.unload();