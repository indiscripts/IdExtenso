// Path to IdExtenso entry point.
// ---
#include '../$$.jsxinc'

// RectPack module.
// ---
#include '../etc/$$.RectPack.jsxlib'

// Load the framework in trace mode.
// ---
$$.load();

// =============================================================================
// RectPackTest [220728]
// Simple rectangle packing (without rotation) on the active spread. (Undoable.)
// ---
// Demonstrates:
// - Using the `RectPack` module (`etc` branch.)
// - Invoking the `error()` function.
// =============================================================================

try
{
	// PARAMETERS
	// ---
	const SPACING = 1;                            // Packing spacing >=0 (in pt.)
	const END_MSG = 0;                            // Whether to show end message.
	
	// Get the active spread, if any.
	// ---
	var win=app.properties.activeWindow;
	if( !win || 'LayoutWindow'!=win.constructor.name ) error("No active window!");
	
	var spd = win.properties.activeSpread;
	if( !spd ) error("No active spread!")
	
	// We'll work in points to use integers.
	// ---
	app.scriptPreferences.measurementUnit = MeasurementUnits.POINTS;

	// Get the spread items.
	// ---
	const K = spd.pageItems;
	var t = K.everyItem();
	var a = t.id;                       // a :: id[]
	var count = a.length;
	if( count <= 1 ) error("At least two page items are expected!");
	var b = t.visibleBounds;            // b :: [T,L,B,R][]

	// Store IDs and coords.
	// ---
	var i,t,x,y;
	var boxes = Array();
	for
	(
		i=count ; i-- ;
		t = b[i],                       // t :: [T,L,B,R]
		boxes[i] =
		{
			id:   a[i],
			posn: [ x=t[1], y=t[0] ],   // Keep track of original position to allow *shift* move.
			x:    x,                    // Set x,y keys (float) for
			y:    y,                    // determining xMin,yMin.
			w:    SPACING+Math.ceil(t[3]-x), // Better is to work with
			h:    SPACING+Math.ceil(t[2]-y), // integral dims (perf.)
		}
	);

	// Call the packing algo on `boxes`.
	// ---
	var info = $$.RectPack(boxes);
	if( !info ) error("Unable to pack the components!");

	// Now reposition the page items accordingly.
	// ---
	var u = void 0;
	app.doScript
	(
		"""
		var ox = info.xMin;             // Use (xMin,yMin) as origin of the
		var oy = info.yMin;             // canvas. Can be freely changed.
		var box, dx, dy, p;
		while( box=boxes.pop() )
		{
			p = box.posn;
			t = K.itemByID(box.id);
			if( !t.isValid ) continue;  // Shouldn't happen, but who knows!
			dx = ox+box.x-p[0];
			dy = oy+box.y-p[1];
			try{t.move(u,[dx,dy])}catch(_){} // Bypass locked items!
		}
		"""
		, u, u, +UndoModes.ENTIRE_SCRIPT, "Rect Pack"
	);
	
	// End message?
	// ---
	if( END_MSG )
	{
		var msg = __("Packing processed on %1 elements, with fill ratio: %2%%."
			, count
			, Math.round(100*info.fill)
			);
		$$.success(msg);
	}
}
catch(e)
{
	// Should something go wrong.
	// ---
	$$.receiveError(e);
}
// =============================================================================


// Unload the framework to cleanup memory.
// ---
$$.unload();