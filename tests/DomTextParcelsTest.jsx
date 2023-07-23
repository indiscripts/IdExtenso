#target 'indesign'
#include '../$$.jsxinc'

#include '../etc/$$.Progress.jsxlib'
#include '../etc/$$.Dom.TextParcels.jsxlib'

// Load the framework in TRACE mode, so you will see every step
// processed by TextParcels. Remove the '-1' to speed up the script!
// ---
$$.load(-1);

// =============================================================================
// DomTextParcelsTest [230723]
// Getting started with the TextParcels class :-)
// ---
// Demonstrates:
// - Calling the error() function.
// - Using a simple progress bar (via $$.Progress).
// - Creating a TextParcels (TP) instance w/ default options.
// - Running TP.consolidate(), then TP.getSamples() with a custom handler.
// - Using the Log to collect data (Log.push).
// =============================================================================
try
{
	const doc = app.properties.activeDocument;
	if( !doc ) error("No document available!");

	const pgs = doc.pages;
	const TP = $$.Dom.TextParcels;

	const mySampleHandler = function(/*str|str[]*/input,/*pageID*/_pid)
	//----------------------------------
	// 1. This handler can receive either a simple string or an array.
	// 2. Whenever it 'accepts' one (or more) strings, it should
	//    increase its SIZE property in accordance. This hidden counter
	//    allows the caller (TP.getSamples) to take good decisions.
	// Rem: `_pid` is the page ID prefixed by a `_`.
	{
		var pg = pgs.itemByID(+_pid.slice(1)).name;

		var sample = input && input instanceof Array
		? input[~~(input.length*Math.random())] // Pick up a string at random
		: input;

		// Change line breaks into U+21A9, truncate to 100 chars.
		sample = sample.replace(RegExp.LINEs,'\u21A9').trunc(100);
		++callee.SIZE;

		// Rem: `Log.push()` is unconditional, it works even if IdExtenso
		// is NOT loaded in trace/warn mode.
		$$.Log.push(__("Page %1, found: %2", pg, sample));
	};

	$$.Progress.title("Testing TextParcels");
	
	// Consolidation may take some time depending on your document;
	// better is to load a simple progress bar (without % though)
	$$.Progress.message( "Scanning the document..." );
	var myTP = new TP(doc);
	myTP.consolidate();

	// Step 2 is extracting samples. Here we just take a few strings
	// (at most 100). Adjust those params to your wish!
	$$.Progress.message( "Getting random samples..." );
	var options =
	{
		maxSampleSize:500, // No need to load 10K strings!
		maxCount:100,      // Max number of accepted strings (cf mySampleHandler.SIZE)
	};
	myTP.getSamples(options, mySampleHandler);

	// Close the pb.
	$$.Progress(false);
}
catch(e)
{
	$$.receiveError(e);
}
// =============================================================================


// Unload the framework.
// ---
$$.unload();