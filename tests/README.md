## Samples, Snippets, and HowTos

### Notice

The `/tests` subdir is not part of ***IdExtenso***'s core distribution. It just provides basic examples and case studies for newcomers.

From this location, any `.jsx` script can include the core framework using `#include '../$$.jsxinc`, which is simple enough to get started. Also, extra modules—which always belong to `/etc`—are selectively added using `#include '../etc/<ModuleName>.jsxlib` (provided the core is included *before*.)

For example, here is a typical template for your project if you need localization facilities powered by **Yalt**.

    #target 'indesign'
    
    // Core (required.)
    #include '../$$.jsxinc'
    
    // Extra module(s)
    #include '../etc/Yalt.jsxlib'
    
    // Load IdExtenso now.
    $$.load();

    // Your script, with Yalt support :-)
    alert( __("Yes") );
    // ...

    // Please, unload me!
    $$.unload(); 

### List of Testable Scripts

##### `AppToJson.jsx`

Stringify the entire contents of `app.properties`.   
_Demonstrates:_
   
* `$$.JSON.lave()` routine (just calling `$$.JSON()`, as this is the `auto` method.)
* Some nice options behind it (verbose vs. compact format…)
* `$$.File.temp()` to output the result in a temp file (and open it.)
 
##### `GetWebImage.jsx`

Download a PNG through `http` and load it in a ScriptUI dialog.   
_Demonstrates:_
   
* `$$.Web(url)`, shortcut of `$$.Web.get(url)`.
* Using `toSource()` with binary strings is more compact w/ IdExtenso.
* Tracing steps thru `$$.trace()`, and more details on Log levels.
