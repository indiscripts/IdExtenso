// Path to IdExtenso entry point.
// ---
#include '../$$.jsxinc'

// Include lib
// ---
#include '../etc/$$.ByteStream.jsxlib'

// Load the framework.
// ---
$$.load();

// =============================================================================
// ByteStreamDemo [250227]
// Test the ByteStream class in IStream and OStream flavors.
// ---
// Demonstrates:
// - ByteStream constructor (both modes.)
// - I/O methods and various tests with number and string tags.
// =============================================================================
try
{
	const PI_HEXA = Math.PI.toIEEE754(); // '400921FB54442D18'
	
	// Use 'HEX*8' scheme to extract bytes from PI_HEXA.
	const PI_BYTES = $$.ByteStream().write("HEX*8",PI_HEXA).slice();
	
	// Assume we have the following string-encoded data bytes:
	//           16.16 Fixed Pt     str3     uint8        float64
	var data = '\x01\xFF\x3F\xFF' + 'abc' + '\x10' + String.fromBytes(PI_BYTES);

	// Create an IStream with `data` attached as a source.
	var iStream = $$.ByteStream(data);
	
	// Show the bytes from the source.
	// => 1,255,63,255,97,98,99,16,64,9,33,251,84,68,45,24
	alert( "Bytes in the IStream source:\r" + iStream.getBytes() );
	
	// Preset the out structure as an Object.
	var out = {};

	// Peek a 16.16 Fixed Point (as 'value'),
	//      a 3-char string (as 'name')
	//      an unsigned byte (as 'count')
	//  and a float64 (IEEE754)
	iStream.peek( "FXP:value STR*3:name U08:count F64:pi", out );
	
	// Display the output.
	// => {"value":511.249984741211,"name":"abc","count":16,"pi":3.14159265358979}
	alert( "Output object:\r" + $$.JSON(out,1) );

	// +iStream is a shortcut of iStream.getValueOf()
	// ---
	alert( "Last accessed value: " + (+iStream) );
	
	// Current iStream index is still 0
	// (since *peek* didn't move the pointer.)
	alert( "Current index [should be zero]: " + iStream.getIndex() );
	
	// Read 4 bytes and 3 chars in the default stream array.
	// Note `U32` will now translate \x01\xFF\x3F\xFF into 33505279
	var shm = "U32 STR*3";
	iStream.read( shm );

	alert
	([
		"IStream after READ with scheme " + shm.toSource(),
		"- Internal array: " + iStream.slice(),   // iStream is also an array :)
		"- Last accessed val: " + iStream,        // Implicit call to valueOf().toString()
		"- Current index: " + iStream.getIndex()  // Should be 6 now.
	].join('\r'));

	// Create an OStream (no argument.)
	var oStream = $$.ByteStream();
	
	// Write a scalar number as float64.
	oStream.write( "F64", Math.PI );
	
	// Show the written bytes.
	// => 64,9,33,251,84,68,45,24
	alert( "Bytes in the OStream:\r" + oStream.getBytes() );
	
	// Write the name and the Fixed Point from out.
	// Note that `STR:name` auto-adjusts the string length
	oStream.write( "STR:name FXP:value", out );
	
	// Append two uint32 numbers in Little-Endian (<).
	// Items are extracted by-index from the array.
	oStream.write( "U32<*2", [0x336699CC, 0xFF] );

	// Show the current OStream as a literal string
	// "@\t!\xFBTD-\x18abc\x01\xFF?\xFF\xCC\x99f3\xFF\0\0\0"
	//  \____ F64 ____/   \_01FF3FFF__/\____ LE Part _____/
	alert
	([
		"Final state of the OStream:\r" + oStream.toSource(),
		"Index (aka length): " + oStream.getIndex()
	].join('\r'));
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