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

##### [`AppToJson.jsx`](AppToJson.jsx)

Stringify the entire contents of `app.properties`.   
_Demonstrates:_
   
* `$$.JSON.lave()` routine (just calling `$$.JSON()`, as this is the `auto` method.)
* Some nice options behind it (verbose vs. compact format…)
* `$$.File.temp()` to output the result in a temp file (and open it.)

##### [`BasicScriptDemo.jsx`](BasicScriptDemo.jsx)

![BasicScriptDemo screenshot](BasicScriptDemo.png)

Manage a complete InDesign script (*PathNodes*) that creates custom circles at each path point of target item(s).   
_Demonstrates:_
   
* Usage of **BasicScript** module (settings, localization, UI).
* Providing a **Yalt** package in four languages (`EN` + `FR` `DE` `ES`.)
* **Settings** keys with various lifespans (`RESET`, `SESSION`, `APP`.)

##### [`CheckIEEE754.jsx`](CheckIEEE754.jsx)

![CheckIEEE754 results](CheckIEEE754.png)

Perform tests on `Number.fromIEEE754()` and `Number.prototype.toIEEE754()` functions. This script generates 10,000 random numbers in IEEE754 64bit format and check whether the dedicated routines properly handle them. We used it to benchmark and validate the implementation of `fromIEEE754()` and `toIEEE754()`. The cool thing is, the script double-check each conversion throughout the `TransformationMatrix` object, which provides a hidden way to encode a Number instance into IEEE754 form. See the code for details.

_Demonstrates:_
   
* Using `Number.fromIEEE754(hex)` and `Number.prototype.toIEEE754()`
* Getting IEEE754 representation from `TransformationMatrix`'s name property (personal hack.)
* Using the `Random` class to generate random numbers.

##### [`EnvSummary.jsx`](EnvSummary.jsx) vs. [`EnvSummary.bin.jsx`](EnvSummary.bin.jsx)

Report scripting context from the Env module.   
_Demonstrates:_
   
* Usage of `$$.Env.domVersion()`, alias: `$$.domVersion()`
* Usage of `$$.Env.summary()`, alias: `$$.Env()`
* Main script and Running code status (JSX vs. JSXBIN), see `EnvSummary.bin.jsx` for additional information.
* Log in TRACE mode.

##### [`GetWebImage.jsx`](GetWebImage.jsx)

Download a PNG through `http` and load it in a ScriptUI dialog (see [animation](GetWebImage.gif)).   
_Demonstrates:_
   
* `$$.Web(url)`, shortcut of `$$.Web.get(url)`.
* Using `toSource()` with binary strings is more compact w/ IdExtenso.
* Tracing steps thru `$$.trace()`, and more details on Log levels.

##### [`InstantDialog.jsx`](InstantDialog.jsx)

![InstantDialog screenshot](InstantDialog.png)

InDesign DOM dialog fast, easy, and with automatic localization.   
_Demonstrates:_
   
* Usage of `$$.Dom.Dialog.fromXML()`.
* Displaying the dialog and having strings localized through **Yalt**.
* Access to UI values using `Dialog.setValueKey()` and `Dialog.getValueKey()` (augmented prototype.)
* Using `$$.isBooting()` to prepend persistent data (makes sense when a `#targetengine` directive is in use.)

##### [`MarkovShuffle.jsx`](MarkovShuffle.jsx)

Text scrambler based on Markov chains.   
_Demonstrates:_
   
* Using the **Markov** module for the purpose of scrambling texts in InDesign.
* Including the **Random** module (to improve random functions.)

Cf. [Full article and demo](http://www.indiscripts.com/post/2018/01/how-to-shuffle-characters-the-right-way)

##### [`PlaceWebImage.jsx`](PlaceWebImage.jsx)

Download an image through `http` and place it in the active spread. (This is a variant of GetWebImage.)   
_Demonstrates:_
   
* `$$.Web(url)`, shortcut of `$$.Web.get(url)`.
* Using `$$.Web.parseURI` to identify the parts of an URL.
* Using `$$.File.temp` to create a temporary file.

##### [`PlayWithBigInt.jsx`](PlayWithBigInt.jsx)

Computing arbitrary-precision big integers using **BigInt** module.   
_Demonstrates:_
   
* Including an optional module (from `/etc`.)
* Various ways of declaring `BigInt` instances.
* Using operators: `==`, `<`, `<=`, `+`, `-`, `*`, `/`, `%`, `<<`, `>>`, `~`, `&`, `|`, `^`.
* Divide-and-Remainder method, primality.
* Finding a huge prime number.

##### [`PlayWithUnit.jsx`](PlayWithUnit.jsx)

![PlayWithUnit dialog](PlayWithUnit.png)

Using a consistent facade for handling metrical units.   
_Demonstrates:_
   
* Optional module inclusion.
* Usage of `$$.Dom.Dialog()`.
* Basic internationalization (decimal point, etc.)
* Experimenting the Unit API: `info()`, `parse()`, `convertNumber()`, `format()`.

##### [`ScriptUIBuilder.jsx`](ScriptUIBuilder.jsx)

![ScriptUIBuilder demo](ScriptUIBuilder.png)

Building a powerful ScriptUI interface with no effort.   
_Demonstrates:_
   
* Using the static `ScriptUI.builder()` function.
* Example of a 'resource object' with various widgets.
* Implementing a custom component thru a 'factory.'

##### [`ShowHelp.jsx`](ShowHelp.jsx)

Get help on core and included modules.   
_Demonstrates:_
   
* `$$.help()`; this method scans all present modules and displays the resulting API in a modal dialog (see [screenshot](ShowHelp.png)).

##### [`YaltIsGreat.jsx`](YaltIsGreat.jsx)

Basic features of the localization module (**Yalt**.)   
_Demonstrates:_
   
* Including an optional module (from `/etc`.)
* Adding a localization package of your own.
* Using the `__()` function with a Yalt string.
* Activating another locale.
* Inserting a placeholder in a translation string.
