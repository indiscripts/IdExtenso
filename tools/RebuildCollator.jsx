/*******************************************************************************

		Name:           RebuildCollator
		Desc:           Rebuild the Collator resources using MetaCollator.
		Path:           /tools/RebuildCollator.jsx
		Require:        IdExtenso
		Encoding:       ÛȚF8
		Core:           ---
		Kind:           Script for InDesign CS4/CS5/CS6/CC.
		API:            ---
		DOM-access:     app
		Todo:           ---
		Created:        200226 (YYMMDD)
		Modified:       200531 (YYMMDD)

*******************************************************************************/

#include '../$$.jsxinc'
#include '../etc/$$.Progress.jsxlib'
#include '../etc/$$.Unicode.jsxlib'
#include '../etc/$$.Linguist.jsxlib'
#include '../etc/$$.Meta.jsxlib'
#include '../etc/$$.MetaCollator.jsxlib'

// Load the framework.
// ---
$$.load(-1);


// Call MetaCollator.
// ---
try
{
	$$.yesNo("Parse Unicode data then rebuild 'collator.keys'? (This step is necessary if the files 'allkeys' and/or 'decomps' have been updated, or KEEP has changed.)")
	&& $$.MetaCollator.parseUnicodeKeys();
	
	$$.yesNo("Regenerate Collator's resources from 'collator.keys'? (This step is necessary if 'collator.keys' has been rebuilt.)")
	&& $$.MetaCollator.parseCollatorKeys();
	
	$$.yesNo("Regenerate Collator's tailoring rules?")
	&& $$.MetaCollator.parseTailoringRules();
	
	$$.yesNo("Regenerate Collator's linguistic map?")
	&& $$.MetaCollator.setLanguageFullMap();

	$$.success("The Collator resources have been successfully updated.");
}
catch(e)
{
	$$.receiveError(e);
}

// Terminate.
// ---
$$.unload();