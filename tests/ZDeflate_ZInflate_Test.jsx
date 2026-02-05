/*******************************************************************************

		Name:           ZDeflate/ZInflate Test
		Desc:           Test compression and decompression modules.
		Path:           /tests/ZDeflate_ZInflate_Test.jsx
		Require:        $$.ZDeflate ; $$.ZInflate
		Encoding:       ÛȚF8
		Core:           ---
		Kind:           Test script for InDesign.
		API:            ---
		DOM-access:     NO
		Todo:           ---
		Created:        260106 (YYMMDD)
		Modified:       260205 (YYMMDD)

*******************************************************************************/

#include '../$$.jsxinc'

#include '../etc/$$.ZDeflate.jsxlib'
#include '../etc/$$.ZInflate.jsxlib'

$$.load();

try
{
	var fd = File($$.Env.runningScript).parent + '/ZDeflateInflate';
	var HUGE = $$.File.readBinary(fd+'/huge.txt')   || error( __("Huge File not found.") );
	var SHORT = $$.File.readBinary(fd+'/short.txt') || error( __("Short File not found.") );
	var INDD = new File(fd + '/test.indd');
	INDD.exists || error( __("Test File (indd) not found.") );

	const LOG = $$.Log.push;
	var dt,src,data,cmp,ucp;

	if( $$.dual("Select the zip/unzip Test:", "Huge String", "INDD File") )
	{
		src = HUGE;
		$$.ZDeflate.ForceInternal = 1;
		$$.ZInflate.ForceInternal = 1;
		LOG("ZIP/UNZIP HUGE STRING (using slow internal methods)");
		LOG("=====================");
	}
	else
	{
		src = INDD;
		$$.ZDeflate.ForceInternal = 0;
		$$.ZInflate.ForceInternal = 0;
		LOG("ZIP/UNZIP INDD FILE (using fast external methods)");
		LOG("===================");
	}

	data = 'string' == typeof src ? src : $$.File.readBinary(src);

	LOG( __("  Original (%1 bytes):", data.length) );
	LOG( data.trunc(120, ' (...) ').toSource() );
	LOG();

	dt = -new Date;
	cmp = $$.ZDeflate.zip(src);
	dt += +new Date;
	LOG( __("  Compr  (%2 ms): %1 bytes",cmp.length, dt) );

	alert( "Compressed." );
	
	dt = -new Date;
	ucp = $$.ZInflate(cmp); // 'agnostic' decompressor
	dt += +new Date;
	LOG( __("  Uncomp (%2 ms): %1 bytes",ucp.length, dt) );

	LOG();
	'string' == typeof ucp || (ucp=$$.File.readBinary(ucp));
	LOG( __("  Orig === uncomp: %1", data===ucp) );
	LOG();

	alert( "Done." );
}
catch(e)
{
	$$.receiveError(e);
}

$$.unload();
