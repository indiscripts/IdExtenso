// Path to IdExtenso entry point.
// ---
#include '../$$.jsxinc'

// Load the framework in TRACE mode.
// ---
$$.load(-1);

// =============================================================================
// ParseIntFix [181117]
// Run some tests on `$.global.parseInt` as fixed by IdExtenso.
// ---
// Demonstrates:
// - Fixing a native ExtendScript bug in the [[global]] scope.
// - Using `$$.trace`.
// =============================================================================

try
{
	const tests =
	[
		{ input:'0xFF',               expected:255 },
		{ input:'F',      radix: 16,  expected:15 },
		{ input:'17',     radix: 8,   expected:15 },
		{ input:021,      radix: 8,   expected:15 }, // Note: input is 17 since 021==17 in JS.
		{ input:'021',    radix: 0,   expected:21 }, // Assumed radix=10 (not 8!)
		{ input:15.99,    radix: 10,  expected:15 },
		{ input:'15,123', radix: 10,  expected:15 },
		{ input:'FXX123', radix: 16,  expected:15 },
		{ input:'\t1111', radix: 2,   expected:15 }, // ltrim
		{ input:'15 * 3',             expected:15 },
		{ input:'15e2',               expected:15 },
		{ input:' \r 15',             expected:15 },
		{ input:'12',     radix: 13,  expected:15 },
		{ input:'xyz',    radix: 36,  expected:44027 }, // 33*36² + 34*36 + 35
		// ---
		{ input:'Hello',  radix: 8,   expected:NaN },
		{ input:'546',    radix: 2,   expected:NaN }, // Invalid digits for binary representation.
		{ input:'12345',  radix: 37,  expected:NaN }, // Invalid radix.
		{ input:'12345',  radix: -1,  expected:NaN }, // Invalid radix.
		{ input:'123',    radix:10.7, expected:123 }, // Radix coerced into uint 10.
		// ---
		{ input:'-F',     radix: 16,  expected:-15 },
		{ input:'-0F',    radix: 16,  expected:-15 },
		{ input:'-0XF',   radix: 0,   expected:-15 }, // 0X prefix -> radix=16.
		{ input:-15.1,    radix: 10,  expected:-15 },
		{ input:'-17',    radix: 8,   expected:-15 },
		{ input:'-15',    radix: 10,  expected:-15 },
		{ input:'-1111',  radix: 2,   expected:-15 },
		{ input:'-15e1',  radix: 10,  expected:-15 },
		{ input:'-12',    radix: 13,  expected:-15 },
		// ---
		{ input:4.7,                  expected:4 },   // radix undefined => 10
		{ input:4.7*1e22,             expected:4 },   // Large number
		{ input:0.00000000000434,     expected:4 },   // Small number
		// ---
		{ input:':',      radix:11,   expected:NaN }, // ExtendScript would natively return 10
		{ input:'=',      radix:16,   expected:NaN }, // ExtendScript would natively return 13
		{ input:'a?',     radix:16,   expected:10  }  // ExtendScript would natively return 175
	];
	
	var t, r, ok, msg;

	$$.trace( "Running tests on parseInt()..." );

	for each( t in tests )
	{
		r = parseInt(t.input, t.radix);
		ok = r===t.expected || (isNaN(r)&&isNaN(t.expected));
		msg = __("%1 parseInt(%2, %3) => %4%5"
			, ok ? '[OK]' : '!KO!'
			, t.input.toSource()
			, t.radix
			, r
			, ok ? '' : __(" (should be %1)",t.expected)
			);
		$$.trace( msg );
	}
}
catch(e)
{
	$$.receiveError(e);
}


$$.unload();