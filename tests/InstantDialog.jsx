#target 'indesign'

// Path to IdExtenso entry point.
// ---
#include '../$$.jsxinc'

// Include Yalt and Dom.Dialog.
// ---
#include '../etc/$$.Yalt.jsxlib'
#include '../etc/$$.Dom.Dialog.jsxlib'

// =============================================================================
// InstantDialog [180313]
// -----------------
// DOM dialog fast and easy.
// Demonstrates:
// - Usage of `$$.Dom.Dialog.fromXML()`
// - Displaying the dialog and having strings Yalt-localized :-)
// - Access to control values using `setValueKey()` and `getValueKey()`
// - Using $$.isBooting to prepend persistent data
//   (makes sense when #targetengine is used.)
// =============================================================================

if( $$.isBooting() )
{
	// XML descriptor (declared once.)
	// ---
	const myDialogXML =
		<Dialog name="InstantDialog" canCancel="true">
			<DialogColumn>
				<Dropdown        key="scope"  caption="Scope" list="Selection|Spread|Document" />
				<PercentEditbox  key="factor" caption="Factor" value="150" min="100" max="300" small="5" large="10" />
				<CheckboxControl key="check1" caption="Some checkbox"  checked="true" />
				<CheckboxControl key="check2" caption="Another one" checked="false" />
				<StaticText rem="empty-line" />
				<EnablingGroup  key="checkGrp" caption="Extra options" checked="false">
					<DialogColumn>
						<StaticText caption="Just to show how this works." />
						<CheckboxControl key="great" caption="Great feature" />
					</DialogColumn>
				</EnablingGroup>
			</DialogColumn>
		</Dialog>;


	// Yalt package (EN+FR) for this UI.
	// ---
	$$.Yalt(
		'''
		/*<YALT> # FRENCH
		------------------------------------
		Scope # Portée
		Factor # Facteur
		Some checkbox # Une option
		Another one # Et une autre
		Extra options # Options additionnelles
		Just to show how this works. # Juste pour illustrer le fonctionnement.
		Great feature # Fonction géniale
		------------------------------------
		Selection # Sélection
		Spread # Planche
		Document # Document
		------------------------------------
		Scope: [%1], factor: %2, and %3 to the great feature! # Portée : [%1], facteur : %2, et %3 pour la fonction géniale !
		YES # OUI
		NO # NON
		</YALT>*/
		'''
	);
	
}

// Load the framework.
// ---
$$.load();

try
{
	// Create the dialog.
	// ---
	var dlg = $$.Dom.Dialog(myDialogXML);
	
	// Preset (before showing the dialog.)
	// ---
	dlg.setValueKey("scope",1);     // Select index 1 in the list -> "Spread"
	dlg.setValueKey("great",true);  // In fact, we want that chekbox ON.
	
	// Show me now.
	// ---
	if( dlg.show() )
	{
		var msg = __(
			"Scope: [%1], factor: %2, and %3 to the great feature!"
			, __(['Selection','Spread','Document'][dlg.getValueKey('scope')])
			, dlg.getValueKey('factor')
			, __(dlg.getValueKey('checkGrp') && dlg.getValueKey('great') ? 'YES' : 'NO')
			);

		$$.success(msg, dlg.name);
	}
	
	// In case you don't need to re-use it.
	// ---
	dlg.destroy();
}
catch(e)
{
	// Should anything go wrong...
	// ---
	$$.receiveError(e);
}
// =============================================================================


// Unload the framework.
// ---
$$.unload();