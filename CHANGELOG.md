## 1.90303
  - Stabilized version (March 3, 2019) including latest fixes and additions.
  - In `[Root](/core/$$.Root.jsxinc).unload`, added a `try..catch` block for nesting `app.activate()`. This bypasses a runtime error that sometimes occurs when multiple InDesign CC versions are running in parallel!

##### [190222]
  - [`ScriptUI.builder`](/core/SUI/$$.builder.jsxinc): Assigning falsy or invalid dimensions to `size` (resp. `preferredSize`, `minimumSize`, `maximumSize`) could cause runtime errors. Fixed and made safer. See [NOTICE, Section 8](/core/SUI/$$.builder.jsxinc#L398).

##### [190221]
  - [**Env/screen**](/core/Env/$$.screen.jsxinc): In ExtendScript, accessing `$.screens` from within a function scope create an inexplicable `(workspace)` instance which then alters actual function (workspace) count. A workaround is to access `$.screens` only from the `[[global]]` scope and create a new reference. Functions can then safely read data from that reference. Fixed [here](/core/Env/$$.screen.jsxinc#L144).
  
##### [190220]
  - [**Ext/patterns**](/core/Ext/$$.patterns.jsxinc): added `RegExp.JSID`, a regex for testing basic JavaScript identifiers of the form `^[\$_A-Za-z][\$_A-Za-z0-9]*$`. Keep in mind that this pattern is for simple checking only, it does not detect reserved tokens.
  
##### [190218]
  - [`ScriptUI.builder()`](/core/SUI/$$.builder.jsxinc) now supports a special type, `"list"`, for declaring either a `ListBox` or a `DropDownList`, depending on the flag `...properties.dropdown`.
  
##### [190217]
  - Slight change in `ScriptUI.forceRedraw()` (cf [**SUI/mini**](/core/SUI/$$.mini.jsxinc)) using specialized routines for list controls (`ListBox` and `DropDownList`).
  
##### [190215]
  - Enhanced [**Root/help**](/core/Root/$$.help.jsxinc), based on my recent study of multi-column `ListBox` control in ScriptUI. Improves the refresh mechanism of `$$.help`'s listbox.

##### [190206]
  - [**Settings**](/etc/$$.Settings.jsxlib): made the `backup` method [JsxBlind](/tools/JsxBlindLib.jsxinc)-safe, using the `callee.ARG` trick. Discussion here: [“The Case of Nested Variable Names”](http://www.indiscripts.com/post/2019/02/jsxblind-the-case-of-nested-variable-names#hd0sb1).

## 1.90204
  - Stabilized version (Feb. 04, 2019) including latest fixes and additions.

##### [190203]
  - [Root/$$.messaging.jsxinc](/core/Root/$$.messaging.jsxinc): bug fixes.
  - Added the `Event` entry in [Root/casting](/core/Root/$$.casting.jsxres).
  - Added `globalEvent()` in [Env/script](/core/Env/$$.script.jsxinc). Returns the global DOM event in case your script is triggered from the app as an event handler (e.g from a `MenuAction` listener.)
  - Fixed non-declared `q` argument in [Env/screen](/core/Env/$$.screen.jsxinc).

##### [190202]
  - Splitted the [**Env**](/core/$$.Env.jsxlib) module into subparts throughout the `Env/` directory :

		#include 'Env/$$.system.jsxinc'
		#include 'Env/$$.script.jsxinc'
		#include 'Env/$$.application.jsxinc'
		#include 'Env/$$.locale.jsxinc'
		#include 'Env/$$.screen.jsxinc'
		#include 'Env/$$.unit.jsxinc'
		#include 'Env/$$.user.jsxinc'

  - Fixed problems with active screen detection -- [Env/$$.screen.jsxinc](/core/Env/$$.screen.jsxinc) -- now delayed to `Env.onLoad()` for addressing cases where the active monitor changes within a session.
  - Added `$$.Env.system()` -- cf [Env/$$.system.jsxinc](/core/Env/$$.system.jsxinc)

##### [190201]
  - [Env/$$.screen.jsxinc](/core/Env/$$.screen.jsxinc): the new method `$$.Env.screenIndex()` returns the index of the monitor that contains a point `[x,y]` specified in screen coordinates. Useful to identify the screen in which a window is shown.
  - The new method `$$.Env.setActiveScreen(index)` allows to register, from any point of your code, the index of the active screen as soon as it can be determined, e.g. when `app.activeWindow` exists. Registering the active screen improves messaging functions and may help you position UI stuff with respect to the application area.
  - Added `$$.Env.getActiveScreen()` too.

##### [190125]
  - [ScriptUI/$$.layout.jsxinc](/etc/ScriptUI/$$.layout.jsxinc) added. This small extension allows to register a _layout handler_, that is, a special function that automatically executes when the attached UI component (a ScriptUI container) is subject to the layout manager. As explained in the NOTICE, “this technique makes it possible to update some attributes (including those of dependent widgets) when the component is laid out, despite the fact that no native event is associated to this particular process. Typically, the layout mechanism takes place just *before* the `show` event of the Window (unless the code explicitly invokes the `layout()` function at some point.) Hence, an interesting use of handling our fake `_layout` event is to perform last-minute adjustments on particular containers before the window shows up.”

##### [190124]
  - [ScriptUI/$$.colors.jsxinc](/etc/ScriptUI/$$.colors.jsxinc) required the precondition `if( $$.isBooting() ){ ... }` in order to work fine in persistent engines. As a general rule, any extra snippet should make sure that it loads stuff at include stage under `$$.isBooting()` condition.
  - [ScriptUI.setFocus()](/core/SUI/$$.mini.jsxinc) added in **SUI/mini**. Forcibly set the focus on a control, as `myControl.active=true` doesn't do the job right.

## 1.90120

This update (Jan. 20, 2019) applies an important change in the directory structure: the minimal ScriptUI stuff is no longer part of the **Ext** dir (reserved to _“external”_ features). The code has been moved into a dedicated **SUI** folder. As a result, `core/Ext/$$.scriptui.jsxinc` is no longer available; and the entry point `$$.jsxinc` reflects new locations and structure:

	#include 'core/$$.Ext.jsxinc'
	// ---
	#include 'core/$$.Root.jsxlib'
	#include 'core/$$.Env.jsxlib'
	#include 'core/$$.JSON.jsxlib'
	#include 'core/$$.File.jsxlib'
	#include 'core/$$.Log.jsxlib'
	#include 'core/$$.Dom.jsxlib'
	// --- [190120]
	#include 'core/$$.SUI.jsxinc'

  - [`SUI/$$.mini.jsxinc`](/core/SUI/$$.mini.jsxinc) contains basic extensions of the `ScriptUI` object: alignment shortcuts, `ScriptUI.isWidget()`, `ScriptUI.forceRedraw()`, etc.
  - [`SUI/$$.builder.jsxinc`](/core/SUI/$$.builder.jsxinc) specifically provides the `ScriptUI.builder()` function, fully documented. It now deals consistently with `{ orientation:"stack" }` in whatever platform, fixing the well-known incompatibility between *Windows CS* and other environments.
  - **SUI** needed a special treatment because of those environment issues. The snippet is included _after_ other core modules so that it can invoke `$$.Env` features such that `$$.inCC`, `$$.inWin`, etc.
  - Other small fixes are included in version 1.90120.

##### [181218]
  - [ScriptUI/$$.colors.jsxinc](/etc/ScriptUI/$$.colors.jsxinc) added. This snippet loads various color-related methods in `ScriptUI` to make background/foreground management easier and safer in cross-version scripts. NOTE: This is an optional snippet (`etc` branch) so you have to explictly include it in your project for using those features: `#include './etc/ScriptUI/$$.colors.jsxinc'`
  - [ScriptUI.forceRedraw()](/core/SUI/$$.mini.jsxinc) added. A short function that forces a given widget to invoke its `onDraw` handler (if available.) Useful when a special refresh/repaint mechanism is required on a custom UI component.
  
##### [181201]
  - [ScriptUI.builder()](/core/SUI/$$.builder.jsxinc) deeply redesigned. Added `addKeyHandler()` and `removeKeyHandler()` utilities.

## 1.81128
  - Stabilized version (Nov. 28, 2018) mostly including cosmetic adjustments.
  - [`Ext/$$.function.jsxinc`](/core/Ext/$$.function.jsxinc) and [`Ext/$$.object.jsxinc`](/core/Ext/$$.object.jsxinc) now use a special function flag, `$TMP$`, that tells the root cleaner (cf `~.ISCL`) which keys must be deleted from the `[[global]]` space at load-time.
  - [`$$.estk.jsxinc`]($$.estk.jsxinc) takes advantage of the change mentioned above.
  - [`$$.Root.jsxlib`](/core/$$.Root.jsxlib) declares `$$.resolve()` and `$$.isModule()` a bit sooner to make those features available when including inner snippets like `errors` or `messaging`.
  - The method [`$$.error()`](/core/Root/$$.errors.jsxinc) is now available in the `[[global]]` scope as well, due to a frequent usage in so many modules and snippets. Instead of `$$.error()`, just call `error()`.

##### [181126]
  - [**ZInflate**](/etc/$$.ZInflate.jsxlib) and [**ZDeflate**](/etc/$$.ZDeflate.jsxlib) modules now available. Port the inflate/deflate algorithms into ExtendScript. Useful for decompressing and/or compressing strings of reasonable size, e.g PNG `IDAT` chunks...

##### [181123]
  - [**ByteStream**](/etc/$$.ByteStream.jsxlib): added the optional param `last` (integer) in the `toString()` method. Allows to get only the specified number of trailing characters—i.e, from the end of the stream—rather than the entire string. Also added the method `getSource()` that simply returns the source of an input stream; for output stream result is `false`.

## 1.81117
  - Stabilized version (Nov. 17, 2018) that integrates various additions from the previous weeks.
  - [`Ext/$$.global.jsxinc`](/core/Ext/$$.global.jsxinc) is a new snippet included from `$$.Ext.jsxinc`. It provides an important fix to `$.global.parseInt()` after the discovery of a critical, native bug in ExtendScript.
  - [`Ext/$$.scriptui.jsxinc`](/core/SUI/$$.builder.jsxinc): now `ScriptUI.builder()` autosets the `name` property of the output widget, provided a name is available and wouldn't override an existing `name` property. This improvement is useful in event handlers that require simple name checking rather than deeper identification steps.

##### [181106]
  - [`Ext/$$.string.jsxinc`](/core/Ext/$$.string.jsxinc): added `String.random()`, a simple method for randomly generating lowercase, alphanumeric IDs of a determined length. By default, `String.random()` returns a string of 4 characters (e.g `"i1x4"`). Pass in the desired length if needed. The result is guaranteed to match the pattern `/^[a-z][0-9a-z]*$/` (that is, the first character is always alphabetic.)

##### [181030]
  - [**Meta**](/etc/$$.Meta.jsxlib), added the `parseHeader()`method, which somehow reverses the `header()` function. It recovers (key,value) elements from a header string. (Useful when parsing ***IdExtenso*** files.)

##### [181026]
  - [**Progress**](/etc/$$.Progress.jsxlib), porting the logics of [ProgressBar.jsx](https://github.com/indiscripts/extendscript/blob/master/scriptui/ProgressBar.jsx) in *IdExtenso*.

##### [181012]
  - [**ByteStream**](/etc/$$.ByteStream.jsxlib), a class to easily handle binary data stored in files. Deals with strings, characters, hex format, signed and unsigned integers (byte, short, int24, long), float (32bit) and double (64bit) numbers. Supports BE and LE ordering. Goto the [NOTICE](/etc/$$.ByteStream.jsxlib#L29) for details.

##### [181007]
  - [`Ext/$$.string.jsxinc`](/core/Ext/$$.string.jsxinc): added `String.fromUTF8()` and `String.prototype.toUTF8()`.
  
##### [180909]
  - [**ModalScript**](/etc/$$.ModalScript.jsxlib): still improving default getter/setter mechanisms.

##### [180825]
  - [`Ext/$$.scriptui.jsxinc`](/core/SUI/$$.builder.jsxinc): If unassigned, the `helpTip` property inherits from parent's help tip (in `ScriptUI.builder`.) Useful to spread a tip throughout a container.

##### [180824]
  - [**ModalScript**](/etc/$$.ModalScript.jsxlib): small fix in `~._SV_` (the `items` property of a list wasn't properly parsed thru the autosetter algorithm.) Added the method `Window.prototype.getWidgetKey` (cf. `~._GW_`) to mirror [**BasicScript**](/etc/$$.BasicScript.jsxlib)'s API.

##### [180721]
  - [`Ext/$$.number.jsxinc`](/core/Ext/$$.number.jsxinc): changed the `toSource()` method so it supports a `mode` argument for _compact_ vs. _short_ vs. _native_ output string. By default (mode=0) the function removes leading zero from floating-point number in )-1,1(. For instance, `(-0.75).toSource() -> "-.75"`.

##### [180715]
  - [`Ext/$$.number.jsxinc`](/core/Ext/$$.number.jsxinc): added `Number.fromIEEE754_32(hexStr)` and `Number.prototype.toIEEE754_32()` for decoding from (resp. encoding to) IEEE754 32bit format (single-precision floating-point representation.) Keep in mind that JS numbers are still double (i.e float64), so you cannot assert, in general, that `x === Number.fromIEEE754_32(x.toIEEE754_32())` for any JS number `x`. However, the _hex-to-number_ conversion is safe: `hex8 === (Number.fromIEEE754_32(hex8)).toIEEE754_32()` (OK.)

##### [180710]
  - [`Ext/$$.string.jsxinc`](/core/Ext/$$.string.jsxinc): Patched `String.prototype.split()` for CS4.

##### [180705]
  - [`Ext/$$.string.jsxinc`](/core/Ext/$$.string.jsxinc) now implements `String.prototype.codePointAt()` as specified in [ECMA-262 9.0](https://www.ecma-international.org/ecma-262/9.0/index.html#sec-string.prototype.codepointat).

##### [180704]
  - [`Ext/$$.number.jsxinc`](/core/Ext/$$.number.jsxinc): added `Number.fromIEEE754(hexStr)` and `Number.prototype.toIEEE754()` for decoding from (resp. encoding to) IEEE754 64bit format (double-precision floating-point representation.)

##### [180703]
  - [`Ext/$$.string.jsxinc`](/core/Ext/$$.string.jsxinc) now implements `String.fromCodePoint()` as specified in [ECMA-262 9.0](https://www.ecma-international.org/ecma-262/9.0/index.html#sec-string.fromcodepoint), including the ability to supply an `Array` of code points rather than an arg list. The purpose of this function is to allow to build a JS string (sequence of UTF-16 units) from code points that may be greater than 0xFFFF, that is, in the range U+10000-U+10FFFF. This then involves _surrogate pairs_ as defined by the Unicode standard.

##### [180626]
  - Introducing the [**MatrixArray**](/etc/$$.MatrixArray.jsxlib) module, a tool for dealing with transformation matrices throughout `Array.prototype`, without involving DOM objects :-)

##### [180615]
  - [`$$.estk.jsxinc`]($$.estk.jsxinc) added. An alternate _entry point_ for using ***IdExtenso*** from ExtendScript ToolKit--without InDesign. Experimental feature.

##### [180609]
  - [**Dom.Space**](/etc/$$.Dom.Space.jsxlib):  Added a patch `MasterSpread.prototype.resolve()` for InDesign CS4. (For some reason this method is not available in the CS4 DOM while `Spread.prototype.resolve` is OK. Thanks to `Page`'s API we can implement a fully functional `resolve` method for master spreads. See detail in the COMPATIBILITY PATCHES section.)

##### [180608]
  - [**Dom.Space**](/etc/$$.Dom.Space.jsxlib): a new DOM oriented module aimed to simplify management and conversions throughout InDesign coordinate systems.
  
##### [180605]
  - [**BasicScript**](/etc/$$.BasicScript.jsxlib) and [**ModalScript**](/etc/$$.ModalScript.jsxlib) now provide the user with the option to reset the preferences ([**Settings**](/etc/$$.Settings.jsxlib)) to factory values when an error occurs. (Of course this is just a workaround in case your script, being in debug phase, does not properly address weird or out-of-range settings. This event is not supposed to occur in the final release of the script! Also, keep in mind that an error is not necessarily caused by wrong settings...)
  - [**Settings**](/etc/$$.Settings.jsxlib): the `backup()` method now calls the internal `~.BCKP` routine from within `app.doScript(..., UndoMode.autoUndo)`, which prevents this step from being undone. Usually, when a user runs a script and validates the UI, s/he expects *Undo* to reverse the process but wants the settings to reflect the validated choices.

##### [180604]
  - Introducing [**ModalScript**](/etc/$$.ModalScript.jsxlib) (`/etc/ModalScript`), a variant of the [**BasicScript**](/etc/$$.BasicScript.jsxlib) module that supports ScriptUI dialogs instead of DOM dialogs. While **BasicScript** relies on the [**Dom.Dialog**](/etc/$$.Dom.Dialog.jsxlib) module, **ModalScript** only involves the `ScriptUI.builder()` routine available in the core branch. Aside from that, **ModalScript** provides the same functionalities based on [**Settings**](/etc/$$.Settings.jsxlib) and [**Yalt**](/etc/$$.Yalt.jsxlib).

##### [180531]
  - Added `$$.yesNo()`. And the whole _messaging_ toolbox - [`Root/$$.messaging.jsxinc`](/core/Root/$$.messaging.jsxinc) - has been re-factored, now using `ScriptUI.builder`'s API--much more secure than the old ScriptUI resource strings!
  - Fixed a bug in `Dom.Dialog['~'].XDLG` (XML dialog builder): needed to change `wx.name()` into `String(wx.name())` to prevent the code from handling a QName object. (This bug had undesirable side effects on [InstantDialog.jsx](/tests/InstantDialog.jsx) sample script.)

##### [180530]
  - `core/Root/$$.help.jsxinc`: Improved the implementation of the dialog -- it now uses `ScriptUI.builder()` :-)
  - `ScriptUI.builder()` now parses event types preceded by an underscore (e.g `_mousedown`) and declares the corresponding event listener if the associated value is a function.

##### [180528]
  - [`Ext/$$.scriptui.jsxinc`](/core/SUI/$$.builder.jsxinc): Added the static `ScriptUI.builder()` method. Provides a compact and generic tool for building resource-based user intarfaces (full `Window` or custom components.) Unlike the native 'resource string' mechanism which involves literal strings and therefore leads to issue when dynamic data are to be treated, `ScriptUI.builder()` deals with actual objects whose internal data may still be browsed and refined just before being sent to the builder.
  - `ScriptUI.isWidget()` is a companion tool of `ScriptUI.builder`; its internal map might be used in more advanced modules.
  - Also, we have fixed the combined alignment shortcuts (`ScriptUI.LT`, `ScriptUI.RT`, etc) as the numeric values caused problems in recent ScriptUI versions.

##### [180524]
  - Added string truncation methods `trunc()`, `rtrunc()`, and `ltrunc()` to `String.prototype` ; cf polyfill in [`Ext/$$.string.jsxinc`](/core/Ext/$$.string.jsxinc).

##### [180521]
  - Introducing the [**Meta**](/etc/$$.Meta.jsxlib) module. Will provide tools for building IdExtenso components (file templates, etc.)

##### [180517]
  - Added `String.prototype.relativePath()` and much more detail on all these POSIX-path-oriented routines: `asPath()`, `toPath()`, and `relativePath()`. These methods are internally used by the framework to manage module relationships, but they can do a great job outside too. In particular, `myFolder1.fullName.relativePath(myFolder2.fullName)` returns the relative path from `myFolder1` to `myFolder2` in `"../../path/to"` form. The code works with generic strings as well, subject you use the universal `/` separator.

##### [180516]
  - **Entry Point** (`$$.jsxinc`) now allows up to 9 formal arguments in _automatic_ methods and contructors. Indeed, there are cases where the `__auto__` property of a module may refer to a function that expects many parameters. The previous implementation was using a general `(x,y,z,t)` argument list limited to four parameters. Same thing with constructors built from the `CLASS` macro. (REM. - For technical and performance reasons, ***IdExtenso*** does not invoke the `arguments` property of `Function` instances. This would pollute ExtendScript memory with additional `[Workspace]` objects that puzzle garbage collection.)
  - Added the method `$$.failure()` in [`Root/$$.messaging.jsxinc`](/core/Root/$$.messaging.jsxinc).

## 1.80515
  - The [**Dom.Dialog**](/etc/$$.Dom.Dialog.jsxlib) module now provides a public property `SmartMeasurementBoxes` (0 or 1) that affects the behavior of getters and setters attached to measurement controls (`MeasurementEditbox` and `MeasurementCombobox` instances.) In summary, `SmartMeasurementBoxes==1` guarantees that numeric values managed through the module interface are understood relative to the control unit (`editUnits`). This is useful when you need to set, get, and compute magnitudes straight into a particular unit (instead of points.) More details in the [NOTICE](/etc/$$.Dom.Dialog.jsxlib#L207).
  - Small addition: [**Dom.Dialog**](/etc/$$.Dom.Dialog.jsxlib) also installs the accessor `Dialog.prototype.getWidgetKey()` which returns the widget associated to some key. Usually you don't need this, since the existing getters and setters do a great job while hiding access to the DOM widget. Just in case you'd need more _tweaking_ capabilities...
  - The **UserInterface** submodule of [**BasicScript**](/etc/$$.BasicScript.jsxlib) now has a public flag `SmartListItemGetter` (default=0) which improves the *getter* mechanism of key-based dropdowns. By default, the current item is returned *by index* (its index in the `stringList`.) But if `SmartListItemGetter` is set to 1, then any [**Settings**](/etc/$$.Settings.jsxlib) key that has been declared as a *string* will be returned as the corresponding string in the list. This option is useful when you don't want to manage dropdown's list from the outside of the XML UI resource (the string list is fixed and you don't care about item indices, what you want is only the selected item, as a string.)

##### [180514]
  - Added `$$.Env.toPoints(myValue,myMeasurementUnits)`, a basic tool that converts a value, given in some `MeasurementUnits` enum, into POINTS. Promoted in `$$` (`$$.Env.toPoints===$$.toPoints`). Example: `$$.toPoints(10, MeasurementUnits.AGATES) => 51.4285714285714`.
  - Thanks to [sysys.blog.shinobi.jp/Entry/20/](http://sysys.blog.shinobi.jp/Entry/20/) the [**Unit**](/etc/$$.Unit.jsxlib) module now supports conversions involving `MeasurementUnits.BAI` (6.336pt) and `MeasurementUnits.U` (0.792pt). See the private method `~.FEED()` for more detail on how `UnitData` instances are loaded.
  - `$$.Env.isUnit()` now supports _numeral_ inputs, that is, strings having the form `"2054187384"` or `"0x7A696E63"`. (Useful in XML context.)

##### [180513]
  - [**Yalt**](/etc/$$.Yalt.jsxlib) : The `YALT` routine now automatically handles terminators `:` `.` and `!`. For example, if `"Hello"` has a translation while `"Hello!"` is not registered, then `__("Hello!")` is interpreted as `__( "%1!" , __("Hello") )`.
  - A temporary global `__jsxinc__` is declared in `$$.jsxinc` to keep track of the entry point location.
  - [**Env**](/core/$$.Env.jsxlib) : Added the `userName()` method. Added the `idexEntryPath` property. Added the `scriptsPanel()` method (returns the path of the Scripts Panel folder in either app or user branch.)
  - [**Dom.Dialog**](/etc/$$.Dom.Dialog.jsxlib) : Added the global attributes `captionWidth` (resp. `editWidth`) for declaring default `minWidth` for labeled (resp. editable) widgets. Example: `<Dialog name="My Dialog Title" canCancel="true" captionWidth="100" editWidth="150">...`.

##### [180508]
  - Added the [**Unit**](/etc/$$.Unit.jsxlib) module, a consistent facade for handling metrical units. Test script: [PlayWithUnit](/tests#playwithunitjsx).
  - Corrected a few typos in [**Dom.Dialog**](/etc/$$.Dom.Dialog.jsxlib) comments. Added the alias `selected` for either Dropdown or RadiobuttonGroup widgets: it is interpreted `selectedButton` in case of radio group, and `selectedIndex` in case of dropdown.
  - [**Dom.Dialog**](/etc/$$.Dom.Dialog.jsxlib) now installs a method named `Dialog.prototype.getStringKey(k)` which, unlike `getValueKey(k)`, returns the string associated to the accessed widget. Useful for dropdowns and similar widgets that basically would return an index.
  - Added a pattern for the vertical line `|` (i.e `U+007C`) in `core/Ext/$$.patterns.jsxinc`. It defines `String.OR`, `RegExp.OR` etc.

##### [180415]
  - Introducing the [**Dom.Style**](/etc/$$.Dom.Style.jsxlib) module (`/etc/Dom.Style`) for handling and browsing InDesign DOM styles (character/paragraph/object styles.) The automatic method is `flatList()`, a very flexible routine whose options are detailed in the code.

##### [180413]
  - [**JSON**](/core/$$.JSON.jsxlib) : In ExtendScript the test `x===null` is not reliable when `x` refers to a `UnitValue` instance whose value is in the range )-1,1(. Indeed, due to an implementation error regarding the `===` operator, `UnitValue(0.5,'pt')===null` is true! The `LAVE` routine has been updated to work around this bug. `$$.JSON(UnitValue(<any>))` now works fine  whatever the magnitude of the `UnitValue`.

##### [180412]
  - [`Ext/$$.number.jsxinc`](/core/Ext/$$.number.jsxinc): static routines `Number.parse()` and `Number.format()` added, with basic localized delimiters `Number.DecimalChar` and `Number.ThousandsChar`.

##### [180411]
  - [`Ext/$$.number.jsxinc`](/core/Ext/$$.number.jsxinc): Added `Number.prototype.toDecimal()`, a variant of `toFixed` that fixes rounding issues and provides more control over the decimal notation.

##### [180409]
  - [`Ext/$$.number.jsxinc`](/core/Ext/$$.number.jsxinc): Added `Number.flatten()` (static) for coercing the exponential representation of a Number into its decimal form. E.g: `Number.flatten(1.234e-8) -> "0.00000001234"`. Also supports string-to-string conversions, e.g: `Number.flatten("12.345678e-15") -> "0.000000000000012345678"`.

## 1.80406
  - `$$.unload()` ([**Root**](/core/$$.Root.jsxlib) module) now supports an argument named `KEEP_DORMANT`, falsy by default. The client code can use it to prevent ***IdExtenso*** from waking up InDesign when the framework is unloading. The main usage of this flag is to keep active an external process launched by your script at the very end of its own procedure, for example `myFile.execute()`, etc.
  - The [**BasicScript**](/etc/$$.BasicScript.jsxlib) module (`etc/$$.BasicScript.jsxlib`) takes into account the previous point. It now conveys the returned value from `Context.onQuit` (hook) to `$$.unload()`.

##### [180403]
  - [`Ext/$$.patterns.jsxinc`](/core/Ext/$$.patterns.jsxinc): added `RegExp.SPCE` for capturing controls and InDesign specific space caracters.
  - [`Ext/$$.string.jsxinc`](/core/Ext/$$.string.jsxinc): added `String.prototype.stripSpaces()` for removing outer and inner spaces from a string. Also, `U+205F` (MEDIUM MATHEMATICAL SPACE) is now seen by the `trim` methods.

##### [180402]
  - [**Env**](/core/$$.Env.jsxlib) now includes `Env/$$.screen.jsxinc`, a snippet that collects data relative to the current display config (`$.screens`, ScriptUI workspace, active window bounds (if available) and additional information from `app.generalPreferences` (`mainMonitorPpi` etc.) The main goal here is to get more control over issues that involve screen coordinates and HiDpi (4K, Retina.) `$$.Env.summary()` now returns these extra infos.

##### [180325]
  - [**BasicScript**](/etc/$$.BasicScript.jsxlib) module. Added `changeLocaleTo()` in the public API. Allows to reactivate [**Yalt**](/etc/$$.Yalt.jsxlib) to a different locale, making sure the UI is accordingly rebuilt.

##### [180323]
  - Added `Dialog.prototype.changeUnitKey()` from [**Dom.Dialog**](/etc/$$.Dom.Dialog.jsxlib). Useful to dynamically update the `editUnits` property of a measurementUnits box, for example, if you want your dialog units to match those in `document.viewPreferences`.
  - Added `$$.Env.isUnit(<any>)`, a little method that checks whether the passed argument refers to a `MeasurementUnits` number, key, or Enumerator, in whatever InDesign version. BTW, I made `isUnit` available straight in `$$` using `<fct>.copy('..')`.

##### [180322]
  - Introducing [**BasicScript**](/etc/$$.BasicScript.jsxlib) and its child  modules **Context**, **UserInterface**, and **Server**. Read the [notice](/etc/$$.BasicScript.jsxlib) first! (Concrete examples coming soon.)

##### [180319]
  - Added `Dialog.prototype.changeListKey()` from [**Dom.Dialog**](/etc/$$.Dom.Dialog.jsxlib). Useful to dynamically update the `stringList` property of a widget. The routine tries to maintain a consistent item index if possible (that is, if the new list still contains the current string.)

##### [180318]
  - [**Settings**](/etc/$$.Settings.jsxlib) module. Added the `hasKey(str)` method so one can check whether some key is actually declared (before activation.) Added a BACKGROUND text that should make this (great) module more intelligible ;-)
  - Created a private `ELOG()` routine in `Root/errors` to make error logs more modular.

##### [180312]
  - Added the [**Dom.Dialog**](/etc/$$.Dom.Dialog.jsxlib) module in the `etc/` branch. Provides a simple API for creating and managing DOM dialogs using XML descriptors.

##### [180309]
  - [**Yalt**](/etc/$$.Yalt.jsxlib) module. Various fixes and improvements.
  - [**Settings**](/etc/$$.Settings.jsxlib) module. Added the `hasScope` method to quickly answers questions like, _is there a SESSION-scoped parameter among my settings?_, etc.
  - **MD5** module. Slight enhancement of the trace: it now shows the input string if it has less than 50 characters.

##### [180307]
  - [**File**](/core/$$.File.jsxlib) module. Changed the default temp file suffix into `txt` (since `tmp` may cause the OS to simply ignore the `execute` method.) Also, `File.temp()` now provides a fallback mechanism in case `execute()` returns `false`.

##### [180302]
  - Added the [**Complex**](/etc/$$.Complex.jsxlib) class for making easy to deal with complex numbers. Many operators and methods are available.

##### [180226]
  - [**BigInt**](/etc/$$.BigInt.jsxlib). Better implementation of the `+` operator when a `BigInt` is mixed with a string. Now interpreted as a `concat` operation. So `"Result: " + BigInt(1000)` will prompt `Result: 1000` as (likely) expected. Idem with `BigInt + str`.

## 1.80225
  - `Ext/number` now performs a polyfill for `Number`'s static members specified in ECMAScript 2015. Namely: `EPSILON`, `MAX_SAFE_INTEGER`, `MIN_SAFE_INTEGER`; and the methods `isInteger()` and `isSafeInteger()`. From now you can use code like `if(Number.isInteger(x)){...}` in your project.
  - Important fix in the [**BigInt**](/etc/$$.BigInt.jsxlib) module. In `prototype['<']` and `prototype['<=']` the _reversed_ argument wasn't listened to, so the scheme `number < this` was improperly parsed as `this['<'](number)`, leading to serious problems! For example, `999 < BigInt(1000)` was said false. ([Detail](/etc/$$.BigInt.jsxlib#L2720).)

##### [180221]
  - `Settings` updated. Various bugs fixed. Now supports session-persistent keys :-)

##### [171205]
  - `Ext/regexp` now provides the static method `RegExp.escape()`, inspired by [Benjamin Gruenbaum](https://github.com/benjamingr/RegExp.escape). Basically, you can inject the result of `RegExp.escape(myString)` into a regex with no edge effect. This implementation offers a 2nd parameter, `intent`, in order to fine-tune the process in special contexts, in particular those that may involve *literal* regexes.
  - `Ext/patterns`: added regexes intended to deal with escape issues: `RegExp.RESC` (canonical escaping class), `RegExp.RSAF` (stronger security), `RegExp.RLIT` (literal intent.)
  - `Ext/strings`: our great `String.prototype.toSource` method now allows the `quotes` param to be `false` (strictly), so that the result is not nested within quotes and does not *backslash* inner quotes. Handy in special cases (playing with literal regexes, etc.)

##### [171203]
  - `Ext/file` added, intended to extend `File.prototype`. So far it only introduces the method `nudeName()` which just returns the file name without its extension. (REM: Do not confuse `Ext/file` with the [**File**](/core/$$.File.jsxlib) module.)
  - Exposed the `stamp()` utility in the API of the [**File**](/core/$$.File.jsxlib) module. It basically invokes the private `~.STMP` function, which builds a unique name for temporary files. Call `$$.File.stamp()` to use this feature from anywhere.

##### [171202]
  - Updated the [**File**](/core/$$.File.jsxlib) module to keep it in sync with local changes, but still working on making it cleaner...

##### [171130]
  - Added the [**Markov**](/etc/$$.Markov.jsxlib) module (`/etc`), a simple (and fast) implementation of Markov chain.

##### [171125]
  - Various unnotified changes in [**JSON**](/core/$$.JSON.jsxlib). The `lave` function now supports a third param `FORCE_OBJ` that allows to browse special objects (such that `ScriptUI`, `BridgeTalk`…) which otherwise wouldn't expand. Also, the `DOM_ACCESS` param can be set to `-1`.
  - `Ext/number`: Implementation notes and small fixes.

##### [171122]
  - `Ext/enum`: the `revSource` method had no name. Fixed.
  - `Ext/regexp`: the `==` operator had no name. Fixed.
  - `Ext/string`: the `charSet` method had no name. Fixed.

## 1.71112
  - Added the `$$.help()` utility. See `core/Root/$$.help.jsxinc`. Display all API infos available from the included modules.
  - Added the `Function.prototype.send` utility, available at including stage. Provides to any public or private method being declared the ability to invoke `<context>[<meth>](this,x,y)` then return itself.
  - Enhancement of function signatures (_casting_) in various `etc/` modules ([**Random**](/etc/$$.Random.jsxlib), [**SHA**](/etc/$$.SHA.jsxlib), [**BigInt**](/etc/$$.BigInt.jsxlib)).

##### [171110]
  - `Ext/patterns`: Added a regex for capturing ExtendScript operators (`RegExp.EXOP`).

##### [171109]
  - Added the `__core__` property in `MODULE` and `CLASS` macros (`$$.jsxinc`).

##### [171105]
  - Added the `/tools` subdir (intended for extra dev tools.) Not part of the framework.

##### [171103]
  - The entry point (`$$.jsxinc`) now calculates the engine state before `$$.load()`.
  - Typo fixed in `$$.Env.engineState`.
  - `$$.load` updated ([**Root**](/core/$$.Root.jsxlib)). In case IdExtenso's name is not `"$$"`, remove the key `$$` from `[[global]]`. This cleanup step was previously done from `~.ISCL()`, but it is better to keep `$$` available up to this point. 

## 1.71024
  - [**Env**](/core/$$.Env.jsxlib) now exposes the `runningScript` property (URI pathname to the running script file.)
  - [**Log**](/core/$$.Log.jsxlib): Added an explicit `typeof logLevel` test, since ExtendScript wrongly regards `undefined < 0` as true!
  - Added `$$.isModule()` in [**Root**](/core/$$.Root.jsxlib). Tells whether a path, or a function, refers to a module.
  - `$$.error()` entirely rewritten.
  - [**Web**](/etc/$$.Web.jsxlib) module: Added an error case in `get()`.
  - Various unnotified changes.

##### [170609]
  - `Web.get()` now supports https on Win platforms (through VBS, non-modal state assumed.) See `~.ALTG` in `/etc/$$.Web.jsxlib`.

##### [170608]
  - 'JSON Hook' mechanism introduced to allow any ***IdExtenso***-compliant module or class to inject its own method for 	generating a source string. Details in `/core/$$.JSON.jsxlib`.
  - Added `toSource()` in [**BigInt**](/etc/$$.BigInt.jsxlib) prototype (`/etc/$$.BigInt.jsxlib`), and implemented its own JSON hook (see the private `JSON` method) in compliance with [**JSON**](/core/$$.JSON.jsxlib) module. As a result, `$$.JSON(BigInt(123456),0)` outputs the compact string `'BigInt("123456")'`, while `$$.JSON(BigInt(123456),1)` returns the expanded object source with no `BigInt` reference, that is, `'{ "neg" : 0, "size" : 1, "0" : 123456 }'`.

##### [170607]
  - Added a few comments to the [**JSON**](/core/$$.JSON.jsxlib) module (core), pending to address a design issue, namely, *how is JSON supposed to deal with IdExtenso-based entities, such as modules or BigInt instances?…* Ongoing reflection.

##### [170606]
  - Introducing the [**SHA**](/etc/$$.SHA.jsxlib) class (`/etc/$$.SHA.jsxlib`), the complete family of Secure Hash Algorithms as defined in FIPS PUB 180-4, FIPS PUB 202, and FIPS PUB 198a (HMAC). Implements: SHA-1, SHA-224, SHA-256, SHA-384, SHA-512, SHA-3-224, SHA-3-256, SHA-3-384, SHA-3-512, SHAKE128, and SHAKE256. The subclass **Int64** (`/etc/SHA/$$.Int64.jsxlib`) encapsulates 64-bit integer structure for bitwise calculations (taking advantage of ExtendScript's operator overloading.)

##### [170603]
  - Cosmetic addition: background & notice of the **MD5** module (`/etc/$$.MD5.jsxlib`).

##### [170601]
  - Added the [**Random**](/etc/$$.Random.jsxlib) class (`/etc/Random.jsxlib`) and its dependencies, cf. `/etc/Random/` directory.

## 1.70527
  - Major additions in both the entry point `/$$.jsxinc`, the root module `/core/$$.Root.jsxlib`, and the function extension `/core/Ext/$$.function.jsxinc`. A new macro is introduced, `CLASS`, which allows to declare the underlying module as a constructor (i.e, it can instantiate things) while preserving the overall paradigm of the framework (`[PUBLIC]` vs. `[PRIVATE]` zones.) Unlike regular MODULE entities, a CLASS module supports the keys `[STATIC]` (equiv. to `[PUBLIC]`) and a specific one, `[PROTO]`. The latter is used for prototyped members. A class builds instances through a `create()` method which, if available, is automatically invoked by the constructor (that's something of a factory.)
  - Added a (single) call to `$.hiresTimer` in `$$.load()` for the purpose of storing a load timestamp in microseconds. Made public via `$$.getLoadStamp()`. To be used by entropy collectors.
  - Introducing the extra module `/etc/BigInt.jsxlib`, aka [**BigInt**](/etc/$$.BigInt.jsxlib), a huge piece of code which implements in pure ExtendScript the famous BigInteger interface. Once included, just use `$$.BigInt("123456789123456")` to handle an immutable arbitrary-precision integer. [**BigInt**](/etc/$$.BigInt.jsxlib) operators are overloaded so that you can compute expressions such as `(X*9999)%Y-(Z+1234)`, where `X,Y,Z` are `BigInt`.

##### [170521]
  - Fixed integer code (`U53 -> I53`) in `$$.casting.jsxres`.

##### [170512]
  - Major update of the [**Env**](/core/$$.Env.jsxlib) module now including a Windows version checker based on `File.batchToString("VER > %1")`. Allows to fix OS signature in ExtendScript versions that return a wrong `$.os` string.
  - Updated `File.batchToString()` in the [**File**](/core/$$.File.jsxlib) module. Now requires a `%1` placeholder for the temporary output.
  - Added `readUTF16()`, `writeUTF16()`, and `appendUTF16()`.

##### [170511]
  - Added `File.batchToString(/*str*/myCommand)` in the [**File**](/core/$$.File.jsxlib) module. For the time being this method is only available to Windows platforms. It allows to quickly send a batch command that supports `> file` output, and returns the result as a string. For example, `$$.File.batchToString("VER")` returns the result of the command `> VER`. Handy and transparent!

##### [170510]
  - Added the byte type (i.e `int8`) in [`$$.casting.jsxres`](/core/Root/$$.casting.jsxres).

##### [170508]
  - Better type checking in `$$.success()`—making sure it treats the relevant params as strings.

##### [170504]
  - Added the _Window.update()_ trick in `~.SLMG()` (sleep message), thanks to [forums.adobe.com](https://forums.adobe.com/message/9484275#9484275).

##### [170501]
  - Slight improvement of `JSON` module: safer `NaN` string no longer relying on `[[global]].NaN` (which is writable.)

## 1.70428
  - Included the messaging API (quick prompts etc.) in the [**Root**](/core/$$.Root.jsxlib) module. Method: `$$.success(message)`.
  - Added `$$.Web.browse(url)` (in the [**Web**](/etc/$$.Web.jsxlib) module), which allows to open an url in the client-side browser.

##### [170427]
  - Added `File.macLineFeed()`, `File.winLineFeed()`, and `File.unixLineFeed()` to control newline character(s) during file creation.

##### [170426]
  - [**Web**](/etc/$$.Web.jsxlib): Bug fixed in `Web.get()` when `isText` option was turned ON. (No data were returned.)

##### [170424]
  - [**Yalt**](/etc/$$.Yalt.jsxlib): Added `Yalt.hasKey()` (check whether a translation key is present); fixed `Yalt.onLoad()` signature.

##### [170423]
  - [`Ext/$$.number.jsxinc`](/core/Ext/$$.number.jsxinc): added `prefix` and `zeroPad` params to `Number.prototype.toHexa`.

##### [170422]
  - Various unnotified changes in **JSON**, **Env**, etc.

## 1.70407
  - ***IdExtenso*** alpha release.
