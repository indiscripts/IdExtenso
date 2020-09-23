// IdExtenso wants to run in INDD.
// ---
#target 'indesign'

// Path to IdExtenso entry point.
// ---
#include '../$$.jsxinc'

// Load the framework in MUTE mode.
// ---
$$.load(0);

// =============================================================================
// RegexFromCodeRanges [200923]
// -----------------
// Take advantage of `RegExp.fromCodeRanges`.
// Demonstrates:
// - Converting a set of code ranges into a RegExp pattern.
// - Limitations (surrogate pairs must be consistent, i.e share the same base.)
// - Producing a regex that captures misc. symbols and pictographs (1F300-1F5FF)
// =============================================================================
try
{
	var tests =
	{
		'Basic range supplied as string':     "41..7F",
		'Array using various formats':        [ 0x9, '0041..005A', [0xC0,0xD6], ['D8','DE'], '0100', 0x102 ],
		'Including surrogate pairs (> FFFF)': [ '1F5F', '1F68..1F6F', ['FF21','FF3A'], '10400..10427' ],
		'Surrogate pairs, various forms':     [ 0x1D4BB,[0x1D4C5,'1D4CF'],'1D7AA..1D7C2',['1E922',0x1E943] ],
		'Including huge range (> 100000)':    [ '1D4D0..1D4FF', [0x10FF00, 0x10FFFF] ],
		'Error with inconsistent range':      "3134B..E0000", // These don't share the same base
	};

	var k,input,output,msg;
	for( k in tests )
	{
		if( !tests.hasOwnProperty(k) ) continue;
		
		input = tests[k];
		try{ output=RegExp.fromCodeRanges(input) } catch(err){ output='[ERROR] '+err }
		
		alert( __("%1:\r_______________\r\rInput:\r%2\r\rOutput:\r%3"
			, k
			, input.toSource()
			, output
		));

		// => [\u0041-\u007F]
		// => [\u0009\u0041-\u005A\u00C0-\u00D6\u00D8-\u00DE\u0100\u0102]
		// => [\u1F5F\u1F68-\u1F6F\uFF21-\uFF3A]|\uD801[\uDC00-\uDC27]
		// => \uD835\uDCBB|\uD835[\uDCC5-\uDCCF]|\uD835[\uDFAA-\uDFC2]|\uD83A[\uDD22-\uDD43]
		// => \uD835[\uDCD0-\uDCFF]|\uDBFF[\uDF00-\uDFFF]
		// => Error: Code point [U+E0000 =\uDB40\uDC00] is out of range
	}
	

	// We cannot send the range `1F300..1F5FF` in one piece but the
	// below code is OK. The regex will capture symbols and pictos.
	// ---
	const RE_PICTOS = RegExp.fromCodeRanges( ['1F300..1F3FF', '1F400..1F4FF','1F500..1F5FF'], true);

	// Note: in case your string would come from UTF8 encoding, use `String.fromUTF8()` instead.
	// ---
	var myString = String.fromCodePoint([0x61,0x28FF0,0x1F5FD,0x62,0x1F571,0x63,0x1F4B0]);
	var matches = myString.match(RE_PICTOS);
	if( matches )
	{
		alert( __("Symbols and pictographs found in\r%1:\r\r%2", myString.toSource(), matches.join(' ; ')) );
	}
	else
	{
		alert( __("No symbols/pictos found in\r%1.", myString.toSource()) );
	}

}
catch(e)
{
	// Just in case something goes wrong.
	// ---
	$$.receiveError(e);
}
// =============================================================================


// Unload the framework.
// ---
$$.unload();