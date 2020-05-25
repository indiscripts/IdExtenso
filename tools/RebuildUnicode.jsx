/*******************************************************************************

		Name:           RebuildUnicode
		Desc:           Rebuild the Unicode resources using MetaUnicode.
		Path:           /tools/RebuildUnicode.jsx
		Require:        IdExtenso
		Encoding:       ÛȚF8
		Core:           ---
		Kind:           Script for InDesign CS4/CS5/CS6/CC.
		API:            ---
		DOM-access:     app
		Todo:           ---
		Created:        200228 (YYMMDD)
		Modified:       200525 (YYMMDD)

*******************************************************************************/

#include '../$$.jsxinc'
#include '../etc/$$.Web.jsxlib'
#include '../etc/$$.Progress.jsxlib'
#include '../etc/$$.Meta.jsxlib'
#include '../etc/$$.MetaUnicode.jsxlib'

// Load the framework.
// ---
$$.load();

// Call MetaUnicode.
// ---
try
{
	$$.yesNo("Update Unicode blocks?") && $$.MetaUnicode.updateBlocks();
	$$.yesNo("Update Adobe Glyph List?") && $$.MetaUnicode.updateAGL();

	$$.success("The Unicode resources have been successfully updated.");
}
catch(e)
{
	$$.receiveError(e);
}

// Terminate.
// ---
$$.unload();