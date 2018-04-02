/*******************************************************************************

		Name:           GetMD5
		Desc:           Get the MD5 hash of the input string.
		Path:           /tools/GetMD5.jsx
		Require:        IdExtenso
		Encoding:       ÛȚF8
		Core:           ---
		Kind:           Script for InDesign CS4/CS5/CS6/CC.
		API:            ---
		DOM-access:     ---
		Todo:           ---
		Created:        180402 (YYMMDD)
		Modified:       180402 (YYMMDD)

*******************************************************************************/

// IdExtenso entry point + MD5 module.
// ---
#include '../$$.jsxinc'
#include '../etc/$$.MD5.jsxlib'

// Load the framework.
// ---
$$.load();

function run(  s)
//----------------------------------
{
	s = prompt("Enter the string to hash:", "", "GetMD5");
	
	if( !s ) return;
	
	prompt("MD5 hash of\r" + s.toSource(), $$.MD5(s), "GetMD5");
}

try{ run() }catch(e){ $$.receiveError(e) }

$$.unload();