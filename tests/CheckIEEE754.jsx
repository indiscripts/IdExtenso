#target 'indesign'

// Path to IdExtenso entry point.
// ---
#include '../$$.jsxinc'

// Random class.
// ---
#include '../etc/$$.Random.jsxlib'

// Load the framework in TRACE mode.
// ---
$$.load(-1);

// =============================================================================
// CheckIEEE754 [180704]
// Perform tests on Number.fromIEEE754() & .toIEEE754() functions.
// ---
// Demonstrates:
// - Using `Number.fromIEEE754(hex)` and `Number.prototype.toIEEE754()`
// - Getting IEEE754 representation from TransformationMatrix's name property.
// - Using the `Random` class to generate random numbers.
// =============================================================================
try
{
	const COUNT = 10000;             // Number of tests to perform.
	const SCPT = File($$.Env.runningScript).nudeName();
	const S25 = Array(26).join(' ');

	$$.trace(__("%1 > Testing %2 random numbers...",SCPT,COUNT));

	// A fixed seed could be used for deterministic tests.
	// var RNG = new $$.Random(123456);
	var RNG = new $$.Random();

	for( var err=0, f=Number.fromIEEE754, i=-1 ; ++i < COUNT ; )
	{
		var hi = (RNG.next()>>>0).toString(16).toUpperCase();
		var lo = (RNG.next()>>>0).toString(16).toUpperCase();

		// Random 64bit representation (16 hex digits.)
		// ---
		var hex = ('00000000'+hi).substr(-8) + ('00000000'+lo).substr(-8);
		
		// Get the Number represented by hex using fromIEEE754.
		// ---
		var x = f(hex);
		var flag = f.STATUS;
		
		// [REM] Since multiple IEEE754 representations leads to NaN
		// (e.g `7FF38CC71C9330DF`) while the usual representation of
		// NaN is `FFF8000000000000`, we must exclude isNaN(x) cases to
		// avoid false negative when comparing hex with matrix component.
		// ---
		if( isNaN(x) ){ i--; continue; }

		// Extract the IEEE754 representation of x using `toIEEE754()`.
		// ---
		var h1 = x.toIEEE754();

		// Create a transformation matrix based on tx=x, get its name.
		// [REM] Matrix name has the form ` HEX16 HEX16 HEX16 HEX16 HEX16 HEX16`
		//       (Note the leading space.)
		// ---
		var s = app.transformationMatrices.add({matrixValues:[1,0,0,1,x,0]}).name;
		
		// Extract the IEEE754 representation of x from the 5th component.
		// ---
		var h2 = s.split(' ')[5];

		$$.trace(__("    [%1][%2] %3 > Number: %4%5 ; Check1=%6 - MxCheck=%7"
			, h1==hex ? 'OK' : (++err,'KO')
			, h2==hex ? 'OK' : (++err,'KO')
			, hex
			, flag ? ( 0 < flag ? "           " : "[DENORMZD] " ) : "[INFINITE] "
			, (x=((0<=x)?'+':'')+String(x)) + S25.substr(x.length-25)
			, h1.toSource()
			, h2.toSource()
			));
	}
	
	// Results.
	// ---
	var msg = err ? __("Errors: %1.",err) : "No error found.";
	msg = __("%1 random numbers tested. %2", COUNT, msg);
	$$.trace(__("%1 > %2", SCPT, msg));
	$$[err?'failure':'success'](msg,SCPT);
}
catch(e)
{
	$$.receiveError(e);
}
// =============================================================================


// Unload the framework to cleanup memory.
// ---
$$.unload(-1);