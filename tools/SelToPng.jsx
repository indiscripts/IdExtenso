/*******************************************************************************

		Name:           SelToPng
		Desc:           Convert the current selection into a PNG string.
		Path:           /tools/SelToPng.jsx
		Require:        IdExtenso
		Encoding:       ÛȚF8
		Core:           ---
		Kind:           Script for InDesign CS4/CS5/CS6/CC.
		API:            ---
		DOM-access:     app
		Todo:           ---
		Created:        171105 (YYMMDD)
		Modified:       181117 (YYMMDD)

*******************************************************************************/

// Path to IdExtenso entry point.
// ---
#include '../$$.jsxinc'

// Load the framework.
// ---
$$.load();

const showPng = function(/*str*/png,/*str*/title,  res,w,o,wh,k,f)
//----------------------------------
// Display the png (binary string) as both a ScriptUIImage and a JS source.
{
    const MAX_IMG_SIZE = [150,150];

    res = """dialog
    {
        text:                   %1,
        orientation:            'column',
        alignChildren:          ['center','top'],
        margins:                30,
        spacing:                30,
        _:Group
        {
            orientation:        'row',
            alignChildren:      ['left','center'],
            margins:            0,
            spacing:            30,
            properties:         { name:'G0' },
            _:Panel
            {
                margins:        20,
                properties:     { name:'P0' },
                _:Image
                {
                    maximumSize:[%2,%3],
                    properties: { name:'I0' },
                },
            }
            _:EditText
            {
                preferredSize:  [400,300],
                text:           %4,
                active:         true,
                properties:     { name:'E0', multiline:true, },
            },
        },
        _:Button
        {
            text:           "OK",
            properties:     { name: 'OK' },
        },
    }""";

    w = new Window(__(res,
        (title||'').toSource(),
        MAX_IMG_SIZE[0],
        MAX_IMG_SIZE[1],
        png.toSource().toSource()
        ));

    // Manage image preview.
    // ---
    (o=w.G0.P0.I0).image = png;
    wh = [].concat.call(o.image.size);
    k = Math.min(1, MAX_IMG_SIZE[0]/wh[0], MAX_IMG_SIZE[1]/wh[1]);
    if( k < 1 )
    {
        f = callee.DRAW_HANDLER;
        f.W = ~~(k*wh[0]);
        f.H = ~~(k*wh[1]);
        f.X = (MAX_IMG_SIZE[0]-f.W)>>>1;
        f.Y = (MAX_IMG_SIZE[1]-f.H)>>>1;
        o.onDraw = f;
    }
    
    // Panel info.
    // ---
    w.G0.P0.text = __("%1 (%2%%)", wh.join(' \xD7 '), ~~(100*k));
    w.show();
};

showPng.DRAW_HANDLER = function ondraw()
//----------------------------------
// `onDraw` utility (used in case the image is too large.)
{
    this.graphics.drawImage(this.image,callee.X,callee.Y,callee.W,callee.H);
};

function run(  o,ff,z,b,s,KEEP)
//----------------------------------
// Main program.
{
    if( !app.properties.selection || !app.selection.length )
    {
    	ff = File.openDialog(__("Select a PNG file"),'*.png');
    	if( !ff ) return;
    	KEEP = 1;
    }
    else
    {
        o = app.selection[0];
        if( !o.hasOwnProperty('exportFile') ) $$.error(__("Cannot export from a %1.",o));
        
        // Export the selection into a temp file.
        // ---
        app.hasOwnProperty('pngExportPreferences')
        &&
        app.pngExportPreferences.properties = {
            antiAlias:             true,
            exportResolution:      72.0,
            pngColorSpace:        +PNGColorSpaceEnum.RGB,
            pngQuality:           +PNGQualityEnum.HIGH,
            transparentBackground: true,
        };

        ff = File(String(Folder.temp) + '/selToPng.png');

        o.exportFile(
            +ExportFormat.PNG_FORMAT,
            ff,
            false,
            void 0,
            void 0,
            true
        );

        for( z=100 ; (b=!ff.exists)&&z-- ; )
        {
            $.sleep(10);
            ff = File(ff);
        }
        
        if( b ) $$.error(__("Cannot create the export file."));
    }

    // Serialize the contents and show it.
    // ---
    z = ff.length;
    s = $$.File.readBinary(ff);
    KEEP || ff.remove();

    if( 'string' != typeof s ) $$.error(__("Cannot read the PNG file."));
    
    showPng(s, __("Serialized PNG (%1 bytes)",z));
}

try{ run() }catch(e){ $$.receiveError(e) }

$$.unload();