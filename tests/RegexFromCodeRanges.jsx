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
// RegexFromCodeRanges [200923] [201005]
// -----------------
// Take advantage of `RegExp.fromCodeRanges`.
// Demonstrates:
// - Converting a set of code ranges into a RegExp pattern.
// - Producing a regex that captures misc. symbols and pictographs (1F300-1F5FF)
// =============================================================================
try
{
	alert( RegExp.fromCodeRanges('17000..187FF') );
	
	
	var tests =
	{
		'1. Basic range supplied as string':        "41..7F",
		'2. Array using various formats':           [ 0x9, '0041..005A', [0xC0,0xD6], ['D8','DE'], '0100', 0x102 ],
		'3. Including surrogate pairs (> FFFF)':    [ '1F5F', '1F68..1F6F', ['FF21','FF3A'], '10400..10427' ],
		'4. Surrogate pairs, various forms':        [ 0x1D4BB,[0x1D4C5,'1D4CF'],'1D7AA..1D7C2',['1E922',0x1E943] ],
		'5. Including huge codepoints (> 100000)':  [ '1D4D0..1D4FF', [0x10FF00, 0x10FFFF] ],
		'6. Smart support of large ranges (NEW!)':  "1F5F4..20AD2", // [CHG200924]
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

		// 1 => [\u0041-\u007F]
		// 2 => [\u0009\u0041-\u005A\u00C0-\u00D6\u00D8-\u00DE\u0100\u0102]
		// 3 => [\u1F5F\u1F68-\u1F6F\uFF21-\uFF3A]|\uD801[\uDC00-\uDC27]
		// 4 => \uD835\uDCBB|\uD835[\uDCC5-\uDCCF]|\uD835[\uDFAA-\uDFC2]|\uD83A[\uDD22-\uDD43]
		// 5 => \uD835[\uDCD0-\uDCFF]|\uDBFF[\uDF00-\uDFFF]
		// 6 => \uD83D[\uDDF4-\uDFFF]|[\uD83E-\uD841][\uDC00-\uDFFF]|\uD842[\uDC00-\uDED2]
	}
	

	// [CHG200924] We now can send the range `1F300..1F5FF` in one piece and the
	// resulting regex is compact: /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF]/
	// ---
	const RE_PICTOS = RegExp.fromCodeRanges( '1F300..1F5FF', true);

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