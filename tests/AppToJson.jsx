// IdExtenso wants to run in INDD.
// ---
#target 'indesign'

// Path to IdExtenso entry point.
// ---
#include '../$$.jsxinc'

// Load the framework in MUTE log mode.
// ---
$$.load(0);

// =============================================================================
// AppToJson [170408][CHG180307]
// Stringify the entire contents of app.properties.
// ---
// Demonstrates:
// - $$.JSON.lave() routine (just call `$$.JSON(...)`, since it's the auto method.)
// - Some nice options behind it.
// - $$.File.temp() to create an instant temp file and open it in some editor.
// =============================================================================
try
{
	// Stringify app.properties (and be verbose.)
	// [REM] Can take some time!
	// ---
	var jsonLarge = $$.JSON(app.properties,/*pretty_spaces=*/1);

	// Do it again without pretty spaces.
	// ---
	var jsonCompact = $$.JSON(app.properties,/*pretty_spaces=*/0);

	// Give a look at the difference.
	// [REM] The __() shortcut is brought to you by IdExtenso :-)
	// ---
	alert(__(
		"Large string (multiline):%3%1...%3==========%3Compact string (single line):%3%2...",
		jsonLarge.substr(0,500),
		jsonCompact.substr(0,500),
		$$.newLine+$$.newLine
		));

	// Now, can we recreate a pure object from that json?
	// ---
	var obj = $$.JSON.eval(jsonLarge);
	if( obj !== Object(obj) )
	{
		$$.error(__("Unable to clone the object!"));
	}

	var msg = __(
		"The object has been cloned and contains %1 main properties!",
		obj.__count__,
		);

	// Let the user choose to see it in a temp file.
	// ---
	msg += $$.newLine + $$.newLine + "Do you want to see the whole thing?";
	if( confirm(msg, false, "AppToJson") )
	{
		var prolog = [
			"This file shows the entire app.properties structure",
			"once passed in to $$.JSON(). Note that DOM specifiers are",
			"rendered into simple strings that reflect their path.",
			"That's the default behavior of JSON(). Set the 3rd argument",
			"to 1 if you need to keep DOM specifiers as objects.",
			"---------------------------------------------------------"
			].join($$.newLine)+$$.newLine;

		$$.File.temp(prolog+jsonLarge,/*suffix*/'txt',/*show=*/1);
	}
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