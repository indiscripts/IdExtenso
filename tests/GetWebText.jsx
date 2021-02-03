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
// GetWebText [190323] [210203]
// Download a remote text resource.
// ---
// Demonstrates:
// - `$$.Web(url,1)`, with `wantText` option.
// =============================================================================

try
{
	// URL of the resource.
	// ---
	var url = prompt(
		__("Enter the URL of the resource:"),
		"http://indiscripts.com/pages/help",
		"GetWebText"
		);
	if( !url || !(url=url.trim()) )
	{
		exit(0);
	}
	
	// Check the URL.
	// ---
	url = $$.Web.parseURI(url);
	if( !url.protocol )
	{
		$$.error(__("Invalid protocol in %1.", url.source) );
	}

	// GET the resource.
	// ---
	var res = $$.Web(url.source,/*wantText*/1);
	
	if( res.error )
	{
		$$.error(res.error);
	}
	
	// Show what it looks like.
	// ---
	var sel = app.properties.selection;
	var txt = res.data;

	if( sel && (sel=sel[0]) && ('texts' in sel) )
	{
		var t = txt.replace(/^\s*\<!DOCTYPE [^\>]+\>/,'').trim();

		try{ txt=XML(t).toString(); }
		catch(_){ $$.trace( __("ExtendScript cannot interprete data as XML: %1.",_) ); }

		sel.texts[0].contents = txt;
	}
	else
	{
		const MAX_LEN = 10000;
		if( txt.length > MAX_LEN )
			$$.trace( __("Data (sample): %1", txt.slice(0,MAX_LEN).toSource()) );
		else
			$$.trace( __("Data: %1", txt.toSource()) );
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
// Also, this auto-opens the log file (if active.)
// ---
$$.unload();