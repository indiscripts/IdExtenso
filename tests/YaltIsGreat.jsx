// IdExtenso wants to run in INDD.
// ---
#target 'indesign'

// Path to IdExtenso entry point.
// ---
#include '../$$.jsxinc'

// Include Yalt (the L10N module)
// from the /etc directory.
// ---
#include '../etc/$$.Yalt.jsxlib'

// Add a Yalt package (before $$.load -> that's faster)
// using ExtendScript's triple quotation syntax.
// Details on Yalt syntax in etc/Yalt/$$.yalt.jsxres
// ---
$$.Yalt.addPackage(
	"""
	<YALT> # ITALIAN
	Yes # Sì
	Hi %1! # Buongiorno %1!
	</YALT>
	"""
);

// Load the framework in MUTE log mode.
// ---
$$.load(0);

// =============================================================================
// YaltIsGreat [170416]
// -----------------
// Basic features of the localization module (Yalt.)
// Demonstrates:
// - Including an optional module (see above.)
// - Adding a localization package of your own (see above.)
// - Using the `__()` function with a Yalt string.
// - Activating another locale.
// - Inserting a placeholder in a translation string.
// =============================================================================
try
{
	// By default, Yalt activates translation strings with
	// respect to the current InDesign locale.
	// ---
	alert( __("Yes") );
	// => "Oui" (French) | "Ja" (German) | "Sí" (Spanish) | "Sì" (Italian)
	// If the string has no translation it remains unchanged (=> "Yes".)

	// But you can explicitly activate a specific locale:
	// ---
	$$.Yalt.activate(Locale.ITALIAN_LOCALE);
	alert( __("Yes") ); // => "Sì"

	// Translation strings support placeholders (%1 to %9.)
	// ---
	alert( __("Hi %1!", "Bob") );
	// => "Buongiorno Bob!"
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