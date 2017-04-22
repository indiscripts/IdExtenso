// IdExtenso wants to run in INDD.
// ---
#target 'indesign'

// Path to IdExtenso entry point.
// ---
#include '../$$.jsxinc'

// Load the framework in TRACE log mode.
// ---
$$.load(-1);

// =============================================================================
// EnvSummary [170422]
// -----------------
// Study the scripting context using the Env module.
// Demonstrates:
// - Usage of `$$.Env.domVersion()` -- shortcut: `$$.domVersion()`
// - Usage of `$$.Env.summary()` -- shortcut: `$$.Env()`
// - Main script and Running code status (JSX vs. JSXBIN),
//   see EnvSummary.bin.jsx for a complete description.
// - Log in TRACE mode.
// =============================================================================
try
{
	// ---
	// $$.domVersion(ver) tells whether the current
	// DOM version is greater-or-equal than ver.
	// ---

	if( $$.domVersion(9) )
	{
		// Downgrade to Scripting DOM 8.0 (=CS6).
		// ---
		app.scriptPreferences.version = '8.0';
	}

	if( $$.domVersion(7) )
	{
		// ScriptPreference.measurementUnit requires CS5 or higher.
		// ---
		app.scriptPreferences.measurementUnit = MeasurementUnits.PICAS;
	}

	// Trace the current environment of the script.
	// Note: $$.Env() is a shortcut of $$.Env.summary().
	// ---
	var separator = $$.newLine+$$.Log.spaces;
	$$.trace(__(
		"EnvSummary (after some changes) > %1",
		separator + $$.Env(separator)
	));
}
catch(e)
{
	// Just in case something goes wrong.
	// ---
	$$.receiveError(e);
}
// =============================================================================


// Please, unload the framework to cleanup memory.
// (Good practice in engine-persistent scripts!)
// ---
$$.unload();