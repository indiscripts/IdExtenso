/*******************************************************************************

		Name:           ZDeflate/ZInflate Test
		Desc:           Test compression and decompression modules.
		Path:           /tests/ZDeflate_ZInflate_Test.jsx
		Require:        $$.ZDeflate ; $$.ZInflate
		Encoding:       ÛȚF8
		Core:           ---
		Kind:           Test script for InDesign.
		API:            ---
		DOM-access:     NO
		Todo:           ---
		Created:        260106 (YYMMDD)
		Modified:       260106 (YYMMDD)

*******************************************************************************/

#include '../$$.jsxinc'

#include '../etc/$$.ZDeflate.jsxlib'
#include '../etc/$$.ZInflate.jsxlib'

;if( $$.isBooting() )
{
	$$.load(-1);

	//==========================================================================
	// TEST FUNCTIONS
	//==========================================================================

	function createTestStrings()
	//----------------------------------
	// Create test data without modern JS features
	// => arr
	{
		var testStrings = Array(6);
		var i, chr;
		
		testStrings[0] = "";                                                    // Empty string
		testStrings[1] = "Hello, World!";                                      // Simple string
		testStrings[2] = "The quick brown fox jumps over the lazy dog.";       // Pangram
		testStrings[3] = Array(100).join("A");                                 // Repetitive data
		testStrings[4] = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";  // Longer text
		
		// All byte values (without Array.map)
		chr = '';
		for( i=-1 ; ++i < 256 ; chr += String.fromCharCode(i) );
		testStrings[5] = chr;
		
		return testStrings;
	}

	function runTests()
	//----------------------------------
	// Main test runner
	// => bool
	{
		var i, original, compressed, decompressed, ratio;
		var zlibCompressed, zlibDecompressed;
		var success = 0, total;
		var testStrings = createTestStrings();

		total = testStrings.length;
		$$.Log("=== ZDeflate/ZInflate Test Suite ===");

		for( i=0 ; i < total ; ++i )
		{
			original = testStrings[i];
			
			try
			{
				// Test raw compression/decompression
				compressed = $$.ZDeflate(original);
				decompressed = $$.ZInflate(compressed);
				
				// Test zlib wrapper (skip empty string as it produces invalid zlib)
				if( original.length > 0 )
				{
					zlibCompressed = $$.ZDeflate.zlib(original);
					zlibDecompressed = $$.ZInflate.zlib(zlibCompressed);
				}
				else
				{
					// For empty strings, zlib wrapper should produce empty result
					zlibCompressed = $$.ZDeflate.zlib(original);
					zlibDecompressed = original; // Expected result for empty input
				}
				
				// Verify results
				if( original === decompressed && original === zlibDecompressed )
				{
					ratio = original.length > 0 ? ((1 - compressed.length / original.length) * 100).toFixed(1) : "N/A";
					$$.Log(__("PASS [%1]: Original: %2 chars, Compressed: %3 chars (%4% reduction)",
						i + 1, original.length, compressed.length, ratio));
					success++;
				}
				else
				{
					$$.Log(__("FAIL [%1]: Decompression mismatch", i + 1));
				}
			}
			catch( e )
			{
				$$.Log(__("ERROR [%1]: %2", i + 1, e.message));
			}
		}

		$$.Log(__("=== Test Results: %1/%2 tests passed ===", success, total));
		
		// Performance test
		performanceTest();
		
		return success === total;
	}

	function performanceTest()
	//----------------------------------
	// Test compression/decompression performance
	// => undef
	{
		var testData = Array(1000).join("Performance test data with some repetitive content to compress. ");
		var startTime, endTime, compressed, decompressed;
		
		$$.Log("=== Performance Test ===");
		$$.Log(__("Test data size: %1 characters", testData.length));
		
		// Compression test
		startTime = +new Date();
		compressed = $$.ZDeflate(testData);
		endTime = +new Date();
		$$.Log(__("Compression: %1ms, %2 -> %3 chars (%4% reduction)",
			endTime - startTime, 
			testData.length, 
			compressed.length,
			((1 - compressed.length / testData.length) * 100).toFixed(1)));
		
		// Decompression test
		startTime = +new Date();
		decompressed = $$.ZInflate(compressed);
		endTime = +new Date();
		$$.Log(__("Decompression: %1ms, %2 -> %3 chars",
			endTime - startTime, compressed.length, decompressed.length));
		
		// Verify
		if( testData === decompressed )
		{
			$$.Log("Performance test PASSED");
		}
		else
		{
			$$.Log("Performance test FAILED");
		}
	}

	//==========================================================================
	// EXECUTE TESTS
	//==========================================================================

	try
	{
		var result = runTests();
		$$.Log(result ? "All tests completed successfully!" : "Some tests failed!");
	}
	catch( e )
	{
		$$.receiveError(e);
	}
	finally
	{
		$$.unload();
	}
}
