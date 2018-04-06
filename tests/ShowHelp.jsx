// IdExtenso wants to run in INDD.
// ---
#target 'indesign'

// Path to IdExtenso entry point.
// ---
#include '../$$.jsxinc'

// Including some extra modules.
// ---
#include '../etc/$$.Web.jsxlib'
#include '../etc/$$.BigInt.jsxlib'
#include '../etc/$$.Random.jsxlib'
#include '../etc/$$.BasicScript.jsxlib'
#include '../etc/$$.Complex.jsxlib'
#include '../etc/$$.DateFormat.jsxlib'

// Load the framework.
// ---
$$.load();

// =============================================================================
// ShowHelp [171111] [180406]
// Get help on core and included modules.
// ---
// Demonstrates:
// - $$.help()
// =============================================================================
try
{
	// The `help` method scans all present modules
	// and displays the resulting API in a modal dialog.
	// ---
	$$.help();
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