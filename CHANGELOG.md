## 1.80515
  - The **Dom.Dialog** module now provides a public property `SmartMeasurementBoxes` (0 or 1) that affects the behavior of getters and setters attached to measurement controls (`MeasurementEditbox` and `MeasurementCombobox` instances.) In summary, `SmartMeasurementBoxes==1` guarantees that numeric values managed through the module interface are understood relative to the control unit (`editUnits`). This is useful when you need to set, get, and compute magnitudes straight into a particular unit (instead of points.) More details in the [NOTICE](etc/%24%24.Dom.Dialog.jsxlib#L207).
  - Small addition: **Dom.Dialog** also installs the accessor `Dialog.prototype.getWidgetKey()` which returns the widget associated to some key. Usually you don't need this, since the existing getters and setters do a great job while hiding access to the DOM widget. Just in case you'd need more _tweaking_ capabilities...

##### [180514]
  - Added `$$.Env.toPoints(myValue,myMeasurementUnits)`, a basic tool that converts a value, given in some `MeasurementUnits` enum, into POINTS. Promoted in `$$` (`$$.Env.toPoints===$$.toPoints`). Example: `$$.toPoints(10, MeasurementUnits.AGATES) => 51.4285714285714`.
  - Thanks to [http://sysys.blog.shinobi.jp/Entry/20/](http://sysys.blog.shinobi.jp/Entry/20/) the **Unit** module now supports conversions involving `MeasurementUnits.BAI` (6.336pt) and `MeasurementUnits.U` (0.792pt). See the private method `~.FEED()` for more detail on how `UnitData` instances are loaded.
  - `$$.Env.isUnit()` now supports _numeral_ inputs, that is, strings having the form `"2054187384"` or `"0x7A696E63"`. (Useful in XML context.)

##### [180513]
  - **Yalt** : The `YALT` routine now automatically handles terminators `:` `.` and `!`. For example, if `"Hello"` has a translation while `"Hello!"` is not registered, then `__("Hello!")` is interpreted as `__( "%1!" , __("Hello") )`.
  - A temporary global `__jsxinc__` is declared in `$$.jsxinc` to keep track of the entry point location.
  - **Env** : Added the `userName()` method. Added the `idexEntryPath` property. Added the `scriptsPanel()` method (returns the path of the Scripts Panel folder in either app or user branch.)
  - **Dom.Dialog** : Added the global attributes `captionWidth` (resp. `editWidth`) for declaring default `minWidth` for labeled (resp. editable) widgets. Example: `<Dialog name="My Dialog Title" canCancel="true" captionWidth="100" editWidth="150">...`.

##### [180508]
  - Added the **Unit** module, a consistent facade for handling metrical units. Test script: [PlayWithUnit](https://github.com/indiscripts/IdExtenso/tree/master/tests#playwithunitjsx).
  - Corrected a few typos in **Dom.Dialog** comments. Added the alias `selected` for either Dropdown or RadiobuttonGroup widgets: it is interpreted `selectedButton` in case of radio group, and `selectedIndex` in case of dropdown.
  - **Dom.Dialog** now installs a method named `Dialog.prototype.getStringKey(k)` which, unlike `getValueKey(k)`, returns the string associated to the accessed widget. Useful for dropdowns and similar widgets that basically would return an index.
  - Added a pattern for the vertical line `|` (i.e `U+007C`) in `core/Ext/$$.patterns.jsxinc`. It defines `String.OR`, `RegExp.OR` etc.

##### [180415]
  - Introducing the **Dom.Style** module (`/etc/Dom.Style`) for handling and browsing InDesign DOM styles (character/paragraph/object styles.) The automatic method is `flatList()`, a very flexible routine whose options are detailed in the code.

##### [180413]
  - **JSON** : In ExtendScript the test `x===null` is not reliable when `x` refers to a `UnitValue` instance whose value is in the range )-1,1(. Indeed, due to an implementation error regarding the `===` operator, `UnitValue(0.5,'pt')===null` is true! The `LAVE` routine has been updated to work around this bug. `$$.JSON(UnitValue(<any>))` now works fine  whatever the magnitude of the `UnitValue`.

##### [180412]
  - `core/Ext/number`: static routines `Number.parse()` and `Number.format()` added, with basic localized delimiters `Number.DecimalChar` and `Number.ThousandsChar`.

##### [180411]
  - `core/Ext/number`: Added `Number.prototype.toDecimal()`, a variant of `toFixed` that fixes rounding issues and provides more control over the decimal notation.

##### [180409]
  - `core/Ext/number`: Added `Number.flatten()` (static) for coercing the exponential representation of a Number into its decimal form. E.g: `Number.flatten(1.234e-8) -> "0.00000001234"`. Also supports string-to-string conversions, e.g: `Number.flatten("12.345678e-15") -> "0.000000000000012345678"`.

## 1.80406
  - `$$.unload()` (**Root** module) now supports an argument named `KEEP_DORMANT`, falsy by default. The client code can use it to prevent **IdExtenso** from waking up InDesign when the framework is unloading. The main usage of this flag is to keep active an external process launched by your script at the very end of its own procedure, for example `myFile.execute()`, etc.
  - The **BasicScript** module (`etc/$$.BasicScript.jsxlib`) takes into account the previous point. It now conveys the returned value from `Context.onQuit` (hook) to `$$.unload()`.

##### [180403]
  - `core/Ext/patterns`: added `RegExp.SPCE` for capturing controls and InDesign specific space caracters.
  - `core/Ext/string`: added `String.prototype.stripSpaces()` for removing outer and inner spaces from a string. Also, `U+205F` (MEDIUM MATHEMATICAL SPACE) is now seen by the `trim` methods.

##### [180402]
  - **Env** now includes `Env/$$.screen.jsxinc`, a snippet that collects data relative to the current display config (`$.screens`, ScriptUI workspace, active window bounds (if available) and additional information from `app.generalPreferences` (`mainMonitorPpi` etc.) The main goal here is to get more control over issues that involve screen coordinates and HiDpi (4K, Retina.) `$$.Env.summary()` now returns these extra infos.

##### [180325]
  - **BasicScript** module. Added `changeLocaleTo()` in the public API. Allows to reactivate **Yalt** to a different locale, making sure the UI is accordingly rebuilt.

##### [180323]
  - Added `Dialog.prototype.changeUnitKey()` from **Dom.Dialog**. Useful to dynamically update the `editUnits` property of a measurementUnits box, for example, if you want your dialog units to match those in `document.viewPreferences`.
  - Added `$$.Env.isUnit(<any>)`, a little method that checks whether the passed argument refers to a `MeasurementUnits` number, key, or Enumerator, in whatever InDesign version. BTW, I made `isUnit` available straight in `$$` using `<fct>.copy('..')`.

##### [180322]
  - Introducing **BasicScript** and its child  modules **Context**, **UserInterface**, and **Server**. Read the [notice](https://github.com/indiscripts/IdExtenso/blob/master/etc/%24%24.BasicScript.jsxlib) first! (Concrete examples coming soon.)

##### [180319]
  - Added `Dialog.prototype.changeListKey()` from **Dom.Dialog**. Useful to dynamically update the `stringList` property of a widget. The routine tries to maintain a consistent item index if possible (that is, if the new list still contains the current string.)

##### [180318]
  - **Settings** module. Added the `hasKey(str)` method so one can check whether some key is actually declared (before activation.) Added a BACKGROUND text that should make this (great) module more intelligible ;-)
  - Created a private `ELOG()` routine in `Root/errors` to make error logs more modular.

##### [180312]
  - Added the **Dom.Dialog** module in the `etc/` branch. Provides a simple API for creating and managing DOM dialogs using XML descriptors.

##### [180309]
  - **Yalt** module. Various fixes and improvements.
  - **Settings** module. Added the `hasScope` method to quickly answers questions like, _is there a SESSION-scoped parameter among my settings?_, etc.
  - **MD5** module. Slight enhancement of the trace: it now shows the input string if it has less than 50 characters.

##### [180307]
  - **File** module. Changed the default temp file suffix into `txt` (since `tmp` may cause the OS to simply ignore the `execute` method.) Also, `File.temp()` now provides a fallback mechanism in case `execute()` returns `false`.

##### [180302]
  - Added the **Complex** class for making easy to deal with complex numbers. Many operators and methods are available.

##### [180226]
  - **BigInt**. Better implementation of the `+` operator when a `BigInt` is mixed with a string. Now interpreted as a `concat` operation. So `"Result: " + BigInt(1000)` will prompt `Result: 1000` as (likely) expected. Idem with `BigInt + str`.

## 1.80225
  - `Ext/number` now performs a polyfill for `Number`'s static members specified in ECMAScript 2015. Namely: `EPSILON`, `MAX_SAFE_INTEGER`, `MIN_SAFE_INTEGER`; and the methods `isInteger()` and `isSafeInteger()`. From now you can use code like `if(Number.isInteger(x)){...}` in your project.
  - Important fix in the **BigInt** module. In `prototype['<']` and `prototype['<=']` the _reversed_ argument wasn't listened to, so the scheme `number < this` was improperly parsed as `this['<'](number)`, leading to serious problems! For example, `999 < BigInt(1000)` was said false. ([Detail](https://github.com/indiscripts/IdExtenso/blob/master/etc/%24%24.BigInt.jsxlib#L2720).)

##### [180221]
  - `Settings` updated. Various bugs fixed. Now supports session-persistent keys :-)

##### [171205]
  - `Ext/regexp` now provides the static method `RegExp.escape()`, inspired by [Benjamin Gruenbaum](https://github.com/benjamingr/RegExp.escape). Basically, you can inject the result of `RegExp.escape(myString)` into a regex with no edge effect. This implementation offers a 2nd parameter, `intent`, in order to fine-tune the process in special contexts, in particular those that may involve *literal* regexes.
  - `Ext/patterns`: added regexes intended to deal with escape issues: `RegExp.RESC` (canonical escaping class), `RegExp.RSAF` (stronger security), `RegExp.RLIT` (literal intent.)
  - `Ext/strings`: our great `String.prototype.toSource` method now allows the `quotes` param to be `false` (strictly), so that the result is not nested within quotes and does not *backslash* inner quotes. Handy in special cases (playing with literal regexes, etc.)

##### [171203]
  - `Ext/file` added, intended to extend `File.prototype`. So far it only introduces the method `nudeName()` which just returns the file name without its extension. (REM: Do not confuse `Ext/file` with the **File** module.)
  - Exposed the `stamp()` utility in the API of the **File** module. It basically invokes the private `~.STMP` function, which builds a unique name for temporary files. Call `$$.File.stamp()` to use this feature from anywhere.

##### [171202]
  - Updated the **File** module to keep it in sync with local changes, but still working on making it cleaner...

##### [171130]
  - Added the **Markov** module (`/etc`), a simple (and fast) implementation of Markov chain.

##### [171125]
  - Various unnotified changes in **JSON**. The `lave` function now supports a third param `FORCE_OBJ` that allows to browse special objects (such that `ScriptUI`, `BridgeTalk`…) which otherwise wouldn't expand. Also, the `DOM_ACCESS` param can be set to `-1`.
  - `Ext/number`: Implementation notes and small fixes.

##### [171122]
  - `Ext/enum`: the `revSource` method had no name. Fixed.
  - `Ext/regexp`: the `==` operator had no name. Fixed.
  - `Ext/string`: the `charSet` method had no name. Fixed.

## 1.71112
  - Added the `$$.help()` utility. See `core/Root/$$.help.jsxinc`. Display all API infos available from the included modules.
  - Added the `Function.prototype.send` utility, available at including stage. Provides to any public or private method being declared the ability to invoke `<context>[<meth>](this,x,y)` then return itself.
  - Enhancement of function signatures (_casting_) in various `etc/` modules (**Random**, **SHA**, **BigInt**).

##### [171110]
  - `Ext/patterns`: Added a regex for capturing ExtendScript operators (`RegExp.EXOP`).

##### [171109]
  - Added the `__core__` property in `MODULE` and `CLASS` macros (`$$.jsxinc`).

##### [171105]
  - Added the `/tools` subdir (intended for extra dev tools.) Not part of the framework.

##### [171103]
  - The entry point (`$$.jsxinc`) now calculates the engine state before `$$.load()`.
  - Typo fixed in `$$.Env.engineState`.
  - `$$.load` updated (**Root**). In case IdExtenso's name is not `"$$"`, remove the key `$$` from `[[global]]`. This cleanup step was previously done from `~.ISCL()`, but it is better to keep `$$` available up to this point. 

## 1.71024
  - **Env** now exposes the `runningScript` property (URI pathname to the running script file.)
  - **Log**: Added an explicit `typeof logLevel` test, since ExtendScript wrongly regards `undefined < 0` as true!
  - Added `$$.isModule()` in **Root**. Tells whether a path, or a function, refers to a module.
  - `$$.error()` entirely rewritten.
  - **Web module**: Added an error case in `get()`.
  - Various unnotified changes.

##### [170609]
  - `Web.get()` now supports https on Win platforms (through VBS, non-modal state assumed.) See `~.ALTG` in `/etc/$$.Web.jsxlib`.

##### [170608]
  - 'JSON Hook' mechanism introduced to allow any ***IdExtenso***-compliant module or class to inject its own method for 	generating a source string. Details in `/core/$$.JSON.jsxlib`.
  - Added `toSource()` in **BigInt** prototype (`/etc/$$.BigInt.jsxlib`), and implemented its own JSON hook (see the private `JSON` method) in compliance with **JSON** module. As a result, `$$.JSON(BigInt(123456),0)` outputs the compact string `'BigInt("123456")'`, while `$$.JSON(BigInt(123456),1)` returns the expanded object source with no `BigInt` reference, that is, `'{ "neg" : 0, "size" : 1, "0" : 123456 }'`.

##### [170607]
  - Added a few comments to the **JSON** module (core), pending to address a design issue, namely, *how is JSON supposed to deal with IdExtenso-based entities, such as modules or BigInt instances?…* Ongoing reflection.

##### [170606]
  - Introducing the **SHA** class (`/etc/$$.SHA.jsxlib`), the complete family of Secure Hash Algorithms as defined in FIPS PUB 180-4, FIPS PUB 202, and FIPS PUB 198a (HMAC). Implements: SHA-1, SHA-224, SHA-256, SHA-384, SHA-512, SHA-3-224, SHA-3-256, SHA-3-384, SHA-3-512, SHAKE128, and SHAKE256. The subclass **Int64** (`/etc/SHA/$$.Int64.jsxlib`) encapsulates 64-bit integer structure for bitwise calculations (taking advantage of ExtendScript's operator overloading.)

##### [170603]
  - Cosmetic addition: background & notice of the **MD5** module (`/etc/$$.MD5.jsxlib`).

##### [170601]
  - Added the **Random** class (`/etc/Random.jsxlib`) and its dependencies, cf. `/etc/Random/` directory.

## 1.70527
  - Major additions in both the entry point `/$$.jsxinc`, the root module `/core/$$.Root.jsxlib`, and the function extension `/core/Ext/$$.function.jsxinc`. A new macro is introduced, `CLASS`, which allows to declare the underlying module as a constructor (i.e, it can instantiate things) while preserving the overall paradigm of the framework (`[PUBLIC]` vs. `[PRIVATE]` zones.) Unlike regular MODULE entities, a CLASS module supports the keys `[STATIC]` (equiv. to `[PUBLIC]`) and a specific one, `[PROTO]`. The latter is used for prototyped members. A class builds instances through a `create()` method which, if available, is automatically invoked by the constructor (that's something of a factory.)
  - Added a (single) call to `$.hiresTimer` in `$$.load()` for the purpose of storing a load timestamp in microseconds. Made public via `$$.getLoadStamp()`. To be used by entropy collectors.
  - Introducing the extra module `/etc/BigInt.jsxlib`, aka **BigInt**, a huge piece of code which implements in pure ExtendScript the famous BigInteger interface. Once included, just use `$$.BigInt("123456789123456")` to handle an immutable arbitrary-precision integer. **BigInt** operators are overloaded so that you can compute expressions such as `(X*9999)%Y-(Z+1234)`, where `X,Y,Z` are **BigInt**.

##### [170521]
  - Fixed integer code (`U53 -> I53`) in `$$.casting.jsxres`.

##### [170512]
  - Major update of the **Env** module now including a Windows version checker based on `File.batchToString("VER > %1")`. Allows to fix OS signature in ExtendScript versions that return a wrong `$.os` string.
  - Updated `File.batchToString()` in the **File** module. Now requires a `%1` placeholder for the temporary output.
  - Added `readUTF16()`, `writeUTF16()`, and `appendUTF16()`.

##### [170511]
  - Added `File.batchToString(/*str*/myCommand)` in the **File** module. For the time being this method is only available to Windows platforms. It allows to quickly send a batch command that supports `> file` output, and returns the result as a string. For example, `$$.File.batchToString("VER")` returns the result of the command `> VER`. Handy and transparent!

##### [170510]
  - Added the byte type (i.e `int8`) in `$$.casting.jsxres`.

##### [170508]
  - Better type checking in `$$.success()`—making sure it treats the relevant params as strings.

##### [170504]
  - Added the _Window.update()_ trick in `~.SLMG()` (sleep message), thanks to https://forums.adobe.com/message/9484275#9484275.

##### [170501]
  - Slight improvement of `JSON` module: safer `NaN` string no longer relying on `[[global]].NaN` (which is writable.)

## 1.70428
  - Included the messaging API (quick prompts etc.) in the Root module. Method: `$$.success(message)`.
  - Added `$$.Web.browse(url)` (in `etc/Web` module), which allows to open an url in the client-side browser.

##### [170427]
  - Added `File.macLineFeed()`, `File.winLineFeed()`, and `File.unixLineFeed()` to control newline character(s) during file creation.

##### [170426]
  - Bug fixed in `Web.get()` when `isText` option was turned ON. (No data were returned.)

##### [170424]
  - Added `Yalt.hasKey()` (check whether a translation key is present.)
  - Fixed `Yalt.onLoad()` signature.

##### [170423]
  - Added `prefix` and `zeroPad` params to `Number.prototype.toHexa` [*`core/Ext/$$.number.jsxinc`*]

##### [170422]
  - Various unnotified changes (*JSON*, *Env*, etc.)

## 1.70407
  - IdExtenso alpha release.
