#target 'indesign'

// Path to IdExtenso entry point.
// ---
#include '../$$.jsxinc'

// Dom.Menu module.
// ---
#include '../etc/$$.Dom.Menu.jsxlib'

// Load the framework
// ---
$$.load();

// =============================================================================
// MenuAccess [210328]
// Accessing existing menu components (menus, submenus, or menuitems.)
// ---
// Demonstrates:
// - Using `Dom.Menu.get()` routine.
// =============================================================================

try
{
	const LINE = "\r---------\r";
	var k,m,msg;
	
	// Testing various paths. All key strings provided below
	// SHOULD remain locale-independent ('$ID/...') unless
	// the InDesign locale is fixed (then your script won't
	// work in other UI languages.)
	// ---
	const PATHS = 
	{
		ContextualTextMnu: [ '$ID/RtMouseText' ],
		FindChangeCmd:     [ 0, '', '$ID/EditMenu_FindChange' ],
		ChangeCaseMnu:     [ '$ID/Main', '', '$ID/CCase Cmd' ],
		LastCaseCmd:       [ 0,'','$ID/CCase Cmd', -1],
		FileMnu:           [ 0, '$ID/&File' ],
		OpenDocCmd:        [ '$ID/Main', 0, '$ID/Open...' ],
		CrazyTest:         [ 0, '$ID/abcd', 123 ],
		ContentAwareCC:    [ '', '', '$ID/kContentAwareFit' ],
	}
	
	for( k in PATHS )
	{
		if( !PATHS.hasOwnProperty(k) ) continue;

		m = $$.Dom.Menu.get(PATHS[k]);

		if( m )
		{
			msg = __("%1.%2This %3 is available.%2Spec: %4\r.name: %5\r.title: %6"
				, k
				, LINE
				, m.constructor.name
				, m.toSpecifier()
				, m.name
				, m.title
				);
		}
		else
		{
			msg = __("%1.%2This component is NOT available:\r[%3]"
				, k
				, LINE
				, PATHS[k].join('] [')
				);
		}

		alert( msg );

		if( 'FindChangeCmd' == k && (m||0).enabled )
		{
			m = m.associatedMenuAction;
			m.enabled && $$.yesNo("Run the Find/Change command?") && m.invoke();
		}

	}
}
catch(e)
{
	// In case something goes wrong.
	// ---
	$$.receiveError(e);
}
// =============================================================================


// Please, unload the framework to cleanup memory.
// ---
$$.unload();