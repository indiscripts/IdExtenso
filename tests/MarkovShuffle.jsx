// IdExtenso wants to run in INDD.
// ---
#target 'indesign'

// Path to IdExtenso entry point.
// ---
#include '../$$.jsxinc'

// The Random module is recommended to
// get a better random number generator.
// ---
#include '../etc/$$.Random.jsxlib'

// Markov chain module.
// ---
#include '../etc/$$.Markov.jsxlib'

// Load the framework
// ---
$$.load();

// =============================================================================
// MarkovShuffle [180114]
// Shuffle the selected characters.
// ---
// Demonstrates:
// - Using a Markov chain to shuffle some text.
// - Including the Random module.
// =============================================================================

try
{
		const DEPTH = 2;
		var t, sto, n;

		t = (t=app.properties.selection) && t.length && t[0];
		if( t && (t instanceof TextFrame) )
		{
			// Get the contents as a string.
			// ---
			t = (sto=t.parentStory).texts[0].contents;
	
			// Create a Markov chain based on the string t
			// and using depth=3.
			// ---
			if( DEPTH < (n=t.length) && $$.Markov(t,DEPTH) )
			{
				// Run the Markov chain using the default callback
				// function, which picks characters randomly.
				// ---
				t = $$.Markov.run();
	
				// Output the new string.
				// ---
				app.scriptPreferences.enableRedraw = false;
				sto.texts[0].contents = t;
				app.scriptPreferences.enableRedraw = true;
				
				// Success message.
				// ---
				$$.success(__("%1 characters have been shuffled.",n,DEPTH), "MarkovShuffle", 1);
			}
		}
		else
		{
			alert(__("Please, select a text frame."));
		}
}
catch(e)
{
	// In case something goes wrong.
	// ---
	$$.receiveError(e);
}
// =============================================================================


// Please, unload the framework to cleanup memory.
// ---
$$.unload();