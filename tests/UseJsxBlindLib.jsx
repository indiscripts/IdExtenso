// Include the JsxBlind Library.
// -> IdExtenso is then auto-loaded.
// ---
#include '../tools/JsxBlindLib.jsxinc'

// =============================================================================
// UseJsxBlindLib [181030]
// -----------------
// Scramble a jsxbin file choosen by the user.
// Demonstrates:
// - Including and invoking the library from any script project.
// =============================================================================
try
{
	var options =
	{
		// Show the progressbar.
		progress:     1,
		// Generate a report.
		report:       1,
		// Get the contained jsxbin code alone.
		noWrapper:    1,
		// Keep function names:
		hitFuncNames: 0,
		// Example of black list regex:
		// Make sure `$$` and `INNER` are immutable identifiers.
		blackList: /^\$\$|INNER$/,
		// Example of white list regex:
		// All below identifiers are made mutable whatever their status.
		whiteList: /^READ|INCR|INDX|DATA|ZERO|BYTE|NUMB|INTG|SIZE|BOOL|STRG|NMRL|LTRL|LBLS|SYMB|TAGS|SCAN$/,
	};

	var bin = $$.JsxBlindLib('', options); // Let the user select a file.

	if( bin )
	{
		var report = $$.JsxBlindLib.getReport();
		var examps = (report.changes||[]).slice(0,40).join(' ').match(/\"[^\"]+\"/g);
		var msg = __("JsxBlind did the job in %1 s! Result would look like:\r\r`%2`\r\rNumber of altered identifiers: %3.%4"
			, Number.format($$.JsxBlindLib.getTiming()/1e3,-2)
			, bin.rtrunc(100)
			, report.count
			, examps ? ('\rE.g: ' + examps.join(', ') + '...') : ''
			);

		var ff = confirm( __("%1\r\rSave the result?",msg), true, 'JsxBlindLib' )
			&& File($$.JsxBlindLib.getInputURI()).saveDlg("Save the jsx blind.");
		
		if( ff )
		{
			if( ff.open('w') && (ff.encoding='UTF8') )
			{
				ff.write($$.JsxBin.getProlog()+bin+$$.JsxBin.getEpilog());
				ff.close();
				ff.parent.execute();
			}
			else
			{
				$$.error( __("Cannot open %1 for writing.", ff) );
			}
		}
	}
	else
	{
		alert("No op.");
	}
}
catch(e)
{
	$$.failure(e);
}

$$.unload();