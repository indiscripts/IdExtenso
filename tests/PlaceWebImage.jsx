// IdExtenso wants to run in INDD.
// ---
#target 'indesign'

// Path to IdExtenso entry point.
// ---
#include '../$$.jsxinc'

// Web module.
// ---
#include '../etc/$$.Web.jsxlib'

// Load the framework.
// ---
$$.load(-1);

// =============================================================================
// PlaceWebImage [180314]
// Download a remote image (through http) and place it in the active document.
// ---
// Demonstrates:
// - `$$.Web(url)`, shortcut of `$$.Web.get(url)`
// - Using toSource() with binary strings.
// =============================================================================

try
{
	(function(  spd,url,o,sfx,ff)
	{
		const RE_PLACEABLE = RegExp('\\.('+app.placeableFileExtensions.join('|')+')$','i');
		
		// Need a active spread.
		// ---
		spd = (spd=app.properties.activeWindow) && spd.properties.activeSpread;
		if( !spd )
		{
			$$.success(__("No active spread available for placing."));
			return;
		}
		
		// URL of the object to place.
		// ---
		url = prompt(
			__("Enter the URL of the image to place:"),
			"http://indiscripts.com/blog/public/IndiscriptsLogo.png",
			"PlaceWebImage"
			);
		if( !(url=url.trim()) ) return;
		
		// Check the suffix.
		// ---
		o = $$.Web.parseURI(url,1);
		if( !(o=o.file) || !(o=o.match(RE_PLACEABLE)) )
		{
			sfx = confirm(
				__("The url %1 does not seem to refer to a placeable file. Do you want to continue anyway?",url),
				true,
				"PlaceWebImage"
				);
			if( !sfx ) return;
			sfx = 'tmp';
		}
		else
		{
			sfx = o[1];
		}

		// Download the data through HTTP.
		// ---
		o = $$.Web(url);
		o.error && $$.error(o.error);

		// May need to trace this step.
		// ---
		(+$$.trace) && $$.trace(__("Downloaded data: %1",o.data.toSource()));

		// Create a temp file.
		// ---
		ff = $$.File.temp(o.data, /*suffix=*/sfx, /*show=*/0, /*encoding=*/'Binary');
		ff || $$.error(__("Unable to create a temporary file."));

		// Place and embed.
		// ---
		(o=spd.place(ff)) && (o instanceof Array) && (o=o[0]);
		o && o.hasOwnProperty('itemLink') && (o=o.itemLink||0).isValid && o.unlink();

	})();
}
catch(e)
{
	// Should something go wrong.
	// ---
	$$.receiveError(e);
}
// =============================================================================


// Unload the framework to cleanup memory.
// ---
$$.unload();