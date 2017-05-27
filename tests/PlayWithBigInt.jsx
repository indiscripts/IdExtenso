// IdExtenso wants to run in INDD.
// ---
#target 'indesign'

// Path to IdExtenso entry point.
// ---
#include '../$$.jsxinc'

// Include BigInt (the BigInteger class)
// from the /etc directory.
// ---
#include '../etc/$$.BigInt.jsxlib'

// Load the framework in MUTE log mode.
// ---
$$.load(0);

// =============================================================================
// PlayWithBigInt [170527]
// -----------------
// Manipulating and computing arbitrary-precision big integers (BigInt.)
// Demonstrates:
// - Including an optional module (see above.)
// - Various ways of declaring BigInt instances.
// - Using operators (== < <= + - * / % << >> ~ & | ^)
// - Divide-and-Remainder method, primality.
// - Finding a huge prime number.
// =============================================================================
try
{
	var X, Y, Z;

	// The `new` operator is optional. (Note that $$.BigInt is
	// available in the global scope so `$$.` is optional.)
	// ---
	X = BigInt("1234567890123456789");
	
	// BigInt recognizes hexa strings (radix=16) prefixed `0x`, or
	// even any explicit radix in 2..36 using BigInt(str,radix).
	// ---
	Y = BigInt("0xABCDEF0123456");
	
	// You can also load a regular JS integer.
	// ---
	Z = BigInt( Math.pow(2,50) );
	
	// By default BigInt.toString() outputs digits in radix 10.
	// ---
	alert(
	[
		"Big integers (radix=10):\r",
		X, Y, Z
	].join('\r') );

	// But any output radix is available too.
	// ---
	alert(
	[
		"Bits of Z (should be 1 followed by many zeroes):\r",
		Z.toString(2)
	].join('\r') );
	
	// All arithmetic operators are overloaded so you can
	// easily calculate complex expressions, including comparisons,
	// assignment, logical and bitwise operators!
	// ---
	alert(
	[
		__( "X + Y = %1",            X+Y ),
		__( "X / Y - Z = %1",        X/Y - Z ),
		__( "X % Z = %1",            X%Z ),

		"\rCombined with regular numbers:\r---------",
		__( "X/2 - 5*Y = %1",        X/2 - 5*Y ),
		__( "Z/1e6 - 1 = %1b",       (Z/1e6-1).toString(2) ),
		__( "Y * (X % 100) = 0x%1",  (Y*(X%100)).toString(16) ),

		"\rAssignments, comparisons, bitwise ops:\r---------",
		__( "X*X == X.pow(2)  =%1",  X*X == X.pow(2) ),
		__( "0x%1 > 0x%2  =%3",      X.toString(16), Y.toString(16), X > Y ),
		__( "Z -= 1  =0x%1",         (Z-=1).toString(16) ),
		__( "Z >>= 40  =0x%1",       (Z>>=40).toString(16) ),
		__( "((X^~Y)>>8)&Z  =%1b",   (((X^~Y)>>8)&Z).toString(2) )
	].join('\r'));
	
	// Divide and remainder, GCD, prime numbers.
	// ---
	X = BigInt("1234567890123456789321654987");
	Y = BigInt("456789123");
	var QR = X.divideAndRemainder(Y); // Array of BigInts [X/Y, X%Y].
	alert([
		__("X = %1",                 X ),
		__("Y = %1",                 Y ),
		"\rQuotient, remainder:\r---------",
		__("X / Y = %1  (Q)",        QR[0] ),
		__("X % Y = %1  (R)",        QR[1] ),
		"\rCheck it:\r---",
		__("Y*Q + R = %1",           Z=Y*QR[0]+QR[1] ),
		__("Is that X?  %1",         Z==X ),
		"\rPrimality, GCD:\r---------",
		__("Is X a prime?  %1",      X.isProbablePrime() ),
		__("GCD of (X,Y) :  %1",     X.gcd(Y) ),
		__("Next probable prime > X : %1", Z=X.nextProbablePrime() )
	].join('\r'));
	
	// ---
	// You can check whether the output, 1234567890123456789321655217,
	// is a prime number thru <numberempire.com/primenumbers.php>.
	// By default BigInt offers a probability > 0.999 (certainty=10) but
	// greater certainty can be specified, e.g `X.nextProbablePrime(15)`.
	// ---
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