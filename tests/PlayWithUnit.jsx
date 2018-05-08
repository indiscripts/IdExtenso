// IdExtenso wants to run in INDD.
// ---
#target 'indesign'

// Path to IdExtenso entry point.
// ---
#include '../$$.jsxinc'

// Include the Unit lib, and Dom.Dialog for the UI.
// ---
#include '../etc/$$.Unit.jsxlib'
#include '../etc/$$.Dom.Dialog.jsxlib'

// Load the framework in MUTE log mode.
// ---
$$.load(0);

// =============================================================================
// PlayWithUnit [180508]
// -----------------
// Using a consistent facade for handling metrical units.
// Demonstrates:
// - Optional module inclusion (see above.)
// - Basic internationalization (decimal point, etc)
// - Experimenting the Unit API: `info()`, `parse()`, `convertNumber()`, `format()`
// =============================================================================
try
{
	// Basic i18n (based on $.decimalPoint.)
	// ---
	$$.Unit.DecimalChar = $.decimalPoint || '.';
	$$.Unit.ThousandsChar = '.' == $$.Unit.DecimalChar ? ',' : ' ';

	// Simple dialog.
	// ---
	var dlg = $$.Dom.Dialog
	(
		<Dialog name="Play With Unit">
		<DCOL>
			<TEBX key="input"  caption="Enter a measurement string" edit="50 cm" />
			<STAT caption="(If not specified, defaut unit is point.)"/>
			<STAT />
			<DROP key="unit"   caption="Select a destination unit" selected="1" list="{$$.Unit.getUnitList(1,1)}" />
		</DCOL>
		</Dialog>
	);

	if( dlg.show() )
	{
		var x = dlg.getStringKey('input');
		var u = dlg.getStringKey('unit');
		
		// Parsed input :: { value:num , type:str }
		// ---
		var oParsed = $$.Unit.parse(x,void 0,1);

		// Unit info ::    { name, uv, plural, muid, reg, alias... }
		// ---
		var destUnit = $$.Unit.info(u);
		
		// Result.
		// ---
		var msg = __("Parsed: %1.\r\rInput unit: %2.\r\rDest. unit: %3."
			, $$.JSON(oParsed)
			, oParsed ? $$.JSON($$.Unit.info(oParsed.type)) : '<unavailable>'
			, $$.JSON(destUnit)
			);
		
		if( oParsed )
		{
			var r = $$.Unit.convertNumber(oParsed.value,oParsed.type,destUnit);
			msg += __("\r\rConversion:\r  Raw result: %1 (number).\r  Formatted result: \"%2\" (automatic precision.)"
				, r
				, $$.Unit.format(r,destUnit)
				);
		}
		
		alert( msg );
	}
	
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