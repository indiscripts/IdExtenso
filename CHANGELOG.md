##### [231113]
  - [Unit](/etc/$$.Unit.jsxlib) now conditionally includes a convenient [YALT package](/etc/Unit/$$.yalt.jsxres) covering measurement units (names and abbr.) in six languages.

##### [231104]
   - [SUI/mini](/core/SUI/$$.mini.jsxinc): `forceRedraw` now invokes the special `hide(); show();` trick when it encounters an _empty_ group. (Works in InDesign CC/CS.)

##### [231101]
  - [Unit](/etc/$$.Unit.jsxlib) module and [UnitData](/etc/Unit/$$.UnitData.jsxlib) class updated, now supporting a special _MICRO_POINTS_ unit (abbr. `µp`) that represents one millionth of a point: **1 pt == 1,000,000 µp**. This IdExtenso-specific unit is generally _not_ exposed to users, it allows metric quantities to be stored with high precision as pure JS integers, that is, magnitudes between `Number.MIN_SAFE_INTEGER` and `Number.MAX_SAFE_INTEGER` (the maximum absolute value in micropoints is then 9,007,199,254,740,991 — which is more than sufficient to express any valid metric quantity in InDesign.) Managing the measurements/settings of your script primarily in micropoints avoid rounding errors with floating point numbers, while `$$.Unit` can still convert and display those values in any other user-friendly unit.

##### [231022]
   - [SUI/mini](/core/SUI/$$.mini.jsxinc): Added the optional 2nd argument `TRY_NOTIFY` in `ScriptUI.forceRedraw`. In some environments—mostly CC versions—the command `myWidget.notify('onDraw')` might work, although not 100% safe. The `TRY_NOTIFY` flag makes `forceRedraw` try this approach first, using the scheme `try{ wg.notify('onDraw'); retval=1; }catch(_){ retval=0; }`. If it fails, the regular `forceRedraw` strategy is used.

##### [231020]
  - [`Edit(Factory)`](/etc/ScriptUI/factories/$$.Edit.jsxinc): Slight change in the _watcher_ callback, the `value` key is now re-normalized even if `this.text` already matches `this.valueToText(nv)`. Purpose: make sure that setting a value always results in the expected type in case your custom value-to-text converter also coerces foreign value types (e.g string → number). The `textToValue(…)` method is invoked to forcibly return `nv` in the valid value type.
  - [Yalt](/etc/$$.Yalt.jsxlib): Added the key `"Invalid numeric value"` in the [resource file](/etc/Yalt/$$.yalt.jsxres).
  - [Unit](/etc/$$.Unit.jsxlib): The static `$$.Unit.DecimalChar` property is now predefined as `Number.DecimalChar`, which sounds more consistent (you don't have to manually adjust it unless your code forcibly uses a custom locale). Of course it is still possible to explicitly re-assign `$$.Unit.DecimalChar` when your script starts up (or whenever needed.)

##### [231017]
  - [Unit](/etc/$$.Unit.jsxlib): Fixed wrong formatting of zero in `$$.Unit.format()` when 'pc' or 'ci' unit is involved with `UseTypographicNotation` turned on. E.g. `0.5 pc` → `0p6`.

## 2.31008
Important update (Oct 8, 2023.) Global re-generation of the core structure, including recent fixes and additions.
   - [Env](/core/$$.Env.jsxlib): Added the `forceUnit()` method (also callable from `$$`), allows a script to work safely in whatever `MeasurementUnits` mode. Supports `false` as direct arg to get units instantly restored. `$$.forceUnit(-1)` can be used in CC/CS6/CS5 (while remaining transparent in CS4): turns your script in `AUTO_VALUE` mode, which makes sense if the code is designed to deal with ruler units rather than some preferred script unit.
   - [Root/help](/core/Root/$$.help.jsxinc). Ability to _preselect_ a module while showing IdExtenso's API: just call `$$.help(<someModule>)` (first argument added), e.g. `$$.help($$.JSON)`. By default `$$.help()` still preselects the `$$` item (first of the list).
   - [JSON](/core/$$.JSON.jsxlib). Fixed reported issue with augmented `Array.prototype`.
   - [Ext/string](/core/Ext/$$.string.jsxinc). Bugfix, makes `String.prototype.indexOf(...)` still reliable when the string contains `"\u0000"`.

_(Other changes do not affect the core branch. See previous log entries regarding updated extra modules.)_

##### [230918]
  - [Dom.TextParcels](/etc/$$.Dom.TextParcels.jsxlib): Fixed an issue with continued footnotes when containing spanned tables or similar empty-line structures.

##### [230903]
  - Improved the [MultiStream](/etc/$$.Dom.TextParcels/$$.MultiStream.jsxlib) class (used by `Dom.TextParcels`): `append` can now digest most _not-well formed_ `EndnoteRanges`, based on a more general detection pattern: `/\uFEFF[^\u0004\uFEFF]{0,2}\u0004/`. This reduces the cases where `Dom.TextParcels` fails to parse document endnotes (in particular, imported notes that tend to alter the regular `U+FEFF` `U+0004` sequence.) Note that the character `U+0004` (endnote reference marker) is still required at the end of the pattern. If the user manually removes note numbers, the algorithm cannot work as expected. In such a case, `append` now provides a safer fallback mechanism that simply ignores endnote IDs: input data is then treated as the text stream of a basic `TextFrame`.

##### [230830]
  - [Dom.TextParcels](/etc/$$.Dom.TextParcels.jsxlib): Enhanced `forceSectionPrefix` in two ways:   
  1. the option now supports three values `0` (auto, default), `+1` (forcibly add the section prefix), `-1` (forcibly remove it).   
  2. the new method `changeSectionPrefixBehavior(<newFlag>)` allows you to change it _after_ construction.

##### [230827]
  - [Dom.TextParcels](/etc/$$.Dom.TextParcels.jsxlib): added a `forceSectionPrefix` parameter in the constructor options (`ini` argument). Allows to treat all page names as including their section prefix even if “Include Prefix when Numbering Pages” is disabled in InDesign's section options. The client code can use this option to manage and display page numbers (cf `pagesMap` property) as in the Pages panel. This is also a way to work around duplicate page names. (To be used with caution though, since mapping is no longer aligned with `myDoc.pages.everyItem().name`.)

##### [230813]
   - [Env](/core/$$.Env.jsxlib): Enhanced the implementation of `forceUnit` ; now supporting `false` as direct argument to get units instantly restored. Also, `$$.forceUnit(-1)` can be used in CC/CS6/CS5 (while remaining transparent in CS4): it turns your script in `AUTO_VALUE` mode, which makes sense if the code is designed to deal with ruler units rather than some preferred script unit. Rem.: The main issue with `app.scriptPreferences.measurementUnit` is that it is session-persistent and could be changed by _another script_ beyond your control. So **IdExtenso** provides a safe “unit policy” in its own scope AND restores the original context when `$$.unload()` is finally invoked.

##### [230811]
   - [Env](/core/$$.Env.jsxlib): Added the `forceUnit()` method (also callable from `$$`). Key idea: allows a script to work safely in whatever `MeasurementUnits` mode —you often need points— and automatically restores the original context when `$$.Env` is _unloading_. In CS5/CS6/CC it's just a matter of setting and restoring `app.scriptPreferences.measurementUnit`; in CS4 we need to temporarily change the `viewPreferences` property of the _host_ object (active document assumed, if available). The whole mechanism is now implemented in the [unit.jsxinc](/core/Env/$$.unit.jsxinc) snippet (part of the `Env` module). In practice, just call `$$.forceUnit(…)` when `$$` is loaded. You don't have to worry about restoring the original units in CS4, the framework has the job automatically done (cf `$$.Env.onUnload`). `forceUnit()` expects a `MeasurementUnits` enum or the equivalent number; if no argument is supplied, `MeasurementUnits.POINTS` is assumed.

##### [230803]
  - [`Edit(Factory)`](/etc/ScriptUI/factories/$$.Edit.jsxinc) and [`EditInteger(Factory)`](/etc/ScriptUI/factories/$$.EditInteger.jsxinc): These advanced `EditText` factories provide a better control of the native ScriptUI widget, dealing with internal events and validation mechanisms. `EditInteger(Factory)` inherits from `Edit(Factory)`: it overrides the API in order to strictly manage integers (signed or unsigned) in a custom range defined by the client code.

##### [230723]
  - [Dom.TextParcels](/etc/$$.Dom.TextParcels.jsxlib): this new class is the perfect tool for efficiently exploring text containers and capturing their contents from any InDesign `Document`. `$$.Dom.TextParcels` is **aimed at experienced developers only**. _(For the record, this code is the “load-bearing wall” that underlies all the power of [IndexMatic3](https://indiscripts.com/category/projects/IndexMatic), so don't tell your friends that you can access it directly in **IdExtenso** ;-)_ Want to run and study a superbasic sample script? Go to [tests/DomTextParcelsTest.jsx](/tests/DomTextParcelsTest.jsx).
  - [Root/help](/core/Root/$$.help.jsxinc). Ability to _preselect_ a module while showing IdExtenso's API: just call `$$.help(<someModule>)` (first argument added), e.g. `$$.help($$.JSON)`. By default `$$.help()` still preselects the `$$` item (first of the list).

##### [230721]
   - [JSON](/core/$$.JSON.jsxlib). An unusual situation arises when `Array.prototype` has been augmented from the client code: `myArr.__count__` then mistakenly increases by `Array.prototype.__count__` (natively 0), which led `$$.JSON` to produce a useless _[rich array](#200613)_ representation. We've fixed that by double-checking the actual count of extra properties. If still zero, the usual array representation is preserved.

##### [230628]
  - [Ext/string](/core/Ext/$$.string.jsxinc). An incredible bug was detected in ExtendScript CS4. In that version, the native `String.prototype.indexOf(...)` method is no longer reliable if the host string contains `"\u0000"` (i.e, the U+0000 character) and if the searched string has more than one character. Fortunately, it happens that `String.prototype.lastIndexOf(...)` still works fine in such a context, and we were able to use this fact to patch `indexOf` in a way that restores the expected behavior. _(This fix does not affect later versions of ExtendScript.)_

## 2.30518
Important update (May 18, 2023.) Global re-generation of the core structure, including last fixes and additions.
   - [JSON](/core/$$.JSON.jsxlib) v2.30518 aka `$$.JSON(...)`: Fixed a serious bug that made main **InDesign DOM components** unparseable through `$$.JSON(someIndesignObject, 1, 1)`. A typo made the `~.BRKN` filter completely transparent (for almost two years!), which resulted in an InDesign crash whenever you had to stringify `app` or `Document` objects :-/ (Reminder: The reason for this filter is to prevent browsing of buggy DOM properties like `app.scriptPreferences` or `.find<...>ShadowSettings`.)
   - [Root/messaging](/core/Root/$$.messaging.jsxinc): Safer memory cleanup: the method discussed in [230311](#230311) should also significantly enhance garbage collection in `$$.ModalScript`-based scripts and similar UI-intensive projects. Added the helper `$$.dual(msg, captionA, captionB, title)` for supporting custom A/B choices in a Yes/No box.
   - [Ext/string](/core/Ext/$$.string.jsxinc): Fixed a bug in `String.fromBase64()`.
   - [SUI/mini](/core/SUI/$$.mini.jsxinc): Added the property (uint) `ScriptUI.NoCharWidth` returning the probable width of the no-character glyph.

_(Other interesting changes do not affect the core branch. See previous log entries regarding updated extra modules.)_

##### [230513]
  - [Root/messaging](/core/Root/$$.messaging.jsxinc): Added `$$.dual(msg, captionA, captionB, title)`, just a variant of `$$.yesNo(...)` that supports custom captions instead. Two options are offered anyway: answer _A_ returns `1`, answer _B_ returns `0`.

##### [230508]
  - [`DrawnCheck(Factory)`](/etc/ScriptUI/factories/$$.DrawnCheck.jsxinc): Added dynamic boolean `__mouseOver__` and `__hasFocus__` properties (assumed private and read-only), can be used in your `ScriptUI.DrawnCheckFactory.Icons.<MyIcon>` function to customize further the appearance of the icon depending on `this.__mouseOver__` and/or `this.__hasFocus__` states.

##### [230403]
   - [Settings](/etc/$$.Settings.jsxlib): There were some embarrassing typos in `activate()`, `reset()` and `backup()` methods. Fixed.
   - [Dom.Scope](/etc/$$.Dom.Scope.jsxlib): The `TREE_SEL` argument of the `list()` method now supports a 4th case, `"bookall"`, which instructs the module to _Preselect all book documents if any, all visible documents otherwise_. (By contrast, using `"book"` means _Preselect all book documents if any, active document otherwise._)

##### [230329]
   - [Unicode](/etc/$$.Unicode.jsxlib): Adjusted the `getCategory()` method so it supports case-insensitive argument, e.g `"lu"` instead of `"Lu"`. (Of course the internal `~.CATG` map remains case-sensitive.)

##### [230318]

  - [`Popup(Factory)`](/etc/ScriptUI/factories/$$.Popup.jsxinc): Found that a popup component may fail to show up when a timer is set on it. The issue seems to occur especially when the script is launched from an InDesign menu (!?) Calling `Window.update()` happens to solve the problem.

- [Progress](/etc/$$.Progress.jsxlib): The window is now updated even if we only call `$$.Progress.title(...)`. This solves some refreshing issues.

##### [230312]

  - [SUI/mini](/core/SUI/$$.mini.jsxinc): U+FFFE seems a better candidate for computing `ScriptUI.NoCharWidth`. (U+0001 wasn't reliable in some environments.) The trick remains highly experimental though!

##### [230311]

ScriptUI CS is known for having weird issues in _garbage-collecting_ `Window` controls that are no longer used. By exploring the `$.list()` report it can be shown that many internal addresses of ScriptUI objects are lost (Refs=0) while still polluting the memory. This typically happens with modal `dialog` windows. Such a `Window` instance may be properly closed -- after `myWin.show()` -- and its local identifier removed from the scope, there are still empty pointers in memory. The issue gets critical in persistent-engine scripts based on `#targetengine...` and having rich UI components. The memory stack then grows unstoppably and leads InDesign to crash after a dozen successive execs of your script within the session. At each step the interface is getting slower and slower to display. I don't know of a definitive way to clean up memory properly once the damage is done, short of giving up all the benefits of a persistent script altogether. However, it seems that removing manually the Window widgets and calling `$.gc()` right before returning your UI function almost completely solves the problem:

    for( i=myWin.children.length ; i-- ; myWin.remove(i) ); // Remove win components.
	for( k in myWin ) delete myWin[k];                      // Clear custom win props.
	$.gc();                                                 // Garbage collector.

  - This snippet is now added at different strategic points, in [Root/messaging](/core/Root/$$.messaging.jsxinc)'s functions and in [ModalScript::UserInterface](/etc/ModalScript/$$.UserInterface.jsxlib). This slight fix is harmless in InDesign CC.
  - [SUI/mini](/core/SUI/$$.mini.jsxinc) now defines <del>`ScriptUI.NoCharWidth = ScriptUI.measureWidth("\x01")`</del><ins>`ScriptUI.NoCharWidth = ScriptUI.measureWidth("\uFFFE")`</ins>, which indicates the width of the no-character glyph (usually an empty square). This information should help us decide whether a Unicode character is _probably_ missing in ScriptUI default font. The idea is to compare `ScriptUI.measureWidth(someCandidateCharacter)` with `NoCharWidth` -- although this is not a 100% reliable test. When the two measurements coincide you may have reason to assume that the candidate glyph is missing. Of course there can be regular glyphs whose width is exactly that of `NoCharWidth`. But if other properties are known elsewhere, this sometimes allows a decision to be made.
  - [`CheckList(Factory)`](/etc/ScriptUI/factories/$$.CheckList.jsxinc): Some users reported that the CheckList component does not display properly because the underlying characters ◻ (U+25FB), ◼ (U+25FC), ⬓ (U+2B13), ※ (U+203B) are not supported in their system (that is, they're not available in the default ScriptUI font). This typically occurs in Windows7 environments with the font “Segoe UI” (v5.x) which, in newer Windows versions, was completed with “Segoe UI-Emoji”. A workaround is now proposed: `CheckListFactory` tries to detect whether U+2B13 is supported (using `ScriptUI.NoCharWidth`); if the test fails, fallback characters are used and the checklist will look like this:

    ![image](https://user-images.githubusercontent.com/6134238/224503322-b27c70d1-944a-4d01-b835-8954d5747f28.png)

    based on the correspondance
   
    ◻ (U+25FB) → `[ ]`
   
    ◼ (U+25FC) → `[•]`
   
    ⬓ (U+2B13) → `[~]`
   
    ※ (U+203B) → `[#]`
	
	For testing this component: https://github.com/indiscripts/IdExtenso/blob/master/tests/SuiFactories/TestCheckList.jsx


##### [230210]
   - [Ext/string](/core/Ext/$$.string.jsxinc): Found a bug in `String.fromBase64()`. The function wasn't supporting 1st argument supplied as an array of uint8. Fixed.

## 2.30123
Minor update (January 23, 2023.) Global re-generation of the core structure, including last fixes and additions.
   - [`File`](/core/$$.File.jsxlib): `startupAlias` fix. Solves the _“tt.nudeName is not a function”_ error.
   - [Ext/file](/core/Ext/$$.file.jsxinc): `nudeName` fix.
   - Added the method `File.prototype.fresh()` (returning a non-existing File instance based on the present File object).
   - [`Env`](/core/$$.Env.jsxlib): added the `isHighContrast` property (bool) in addition to `isDark`.

_(The most important changes do not affect the core branch. See previous log entries for detail on updated extra modules.)_

##### [230109]
   - [PageRange](/etc/$$.PageRange.jsxlib): Added the value `"Chicago"` for the `.elision` option. It implements the specific rules of the _Chicago Manual of Style_, as specified in the 2010 edition, p. 816:

![image](https://user-images.githubusercontent.com/6134238/211263667-c441669a-3260-44ea-a030-0b4a29c1d9a8.png)

##### [230104]
   - [Yalt](/etc/$$.Yalt.jsxlib): Now fully supports optional punctuation terminators (`...`, `:`, `.`, `!`) _after_ a mute terminator (`\x01`, `\x02`, `\x03`, `\x04`). This feature was already functional while translating the key into another language (e.g `"Advanced\x01:"` → `"Avancée :"`), but there was a bug for the default (English) language: the control character `\x01` wasn't removed from `"Advanced\x01:"`. Fixed.

##### [221012]
   - [Web](/etc/$$.Web.jsxlib): Fixed [issue #7 - “Missing location during redirection”](https://github.com/indiscripts/IdExtenso/issues/7).

##### [220910]
   - [Yalt (res)](/etc/Yalt/$$.yalt.jsxres): Added a few L10N strings relative to number validation. (Might be used in UI factories, etc.)

##### [220826]
   - [`File`](/core/$$.File.jsxlib): fixed the `startupAlias` method. It could produce a runtime error _“tt.nudeName is not a function”_ because `File.prototype.resolve()` can sometimes result in a `Folder` object (!)

##### [220816]
   - The modules [**ModalScript**](/etc/$$.ModalScript.jsxlib) (resp. [**BasicScript**](/etc/$$.BasicScript.jsxlib)) provide an aggregate of sub-modules (`Context`, `UserInterface`, `Server`) that encapsulate the abstract logic of an entire script, based on either a ScriptUI modal dialog or a DOM dialog. Although [`$$.Settings`](/etc/$$.Settings.jsxlib) remains the ideal—and optimal—place for sharing data throughout the script and between those sub-modules, it may turn out that you want to access e.g. the _Context_ from the _UserInterface_ (or from another location.) Then you'll have to use a path like `$$.ModalScript.Context` to get the desired reference. But this syntax has two drawbacks: first, it is a bit cumbersome; secondly, it requires hardcoding the “branch name” (_ModalScript_ vs. _BasicScript_ vs. etc) of the scheme you're using. This lacks flexibility, because if you were to change that scheme along the way, you would have to rewrite the corresponding path(s) in your code. For these various reasons, it seemed beneficial to make the sub-modules accessible straight from `$$`. Thus you can now use the aliases `$$.Context`, `$$.UserInterface` and `$$.Server` to enter the corresponding sub-modules, without worrying about the actual parent scheme.
   - The same enhancement has been applied to the extended modules [**ModalScriptMenu**](/etc/$$.ModalScriptMenu.jsxlib) (resp. [**BasicScriptMenu**](/etc/$$.BasicScriptMenu.jsxlib)), making the extra sub-module `MenuExtension` visible from `$$`.

##### [220807]
   - Added the `moreOptions(resObj&, anyObj)` method to [`ScriptUI/factories`](/etc/ScriptUI/$$.factories.jsxinc). A simple utility for adding extra options to a resource before calling the builder. Will be used in IdExtenso's [`factories`](/etc/ScriptUI/factories/) for handling the option `more`. Do the same with your own factories if needed.
   - Updated all [existing factory components](/etc/ScriptUI/factories/) so they now support the option `more` when you call the factory. This must be an `Object` having extra properties that you want to append to the resource object before the internal call to `ScriptUI.builder`. From then, you no longer need an external mechanism if you have to load extra properties at construction time. Say you want a Check component to have a custom ID, just add it in a `more` object:

   			CheckFactory$MyCheck1:
			[{
				text:                   __("Binary Check (with custom box)"),
				value:                  0,
				ternary:                false,
				help:                   __("Right-click the control to change its label..."),
				more:                   { myID:123 },
			}],

Note. — This way, all IdExtenso components can be constructed with their own, unfiltered properties, as you would do very similarly with `ScriptUI.builder(myResourceObj)`. The only difference is the requirement to use the `more` key (a sub-object) in your options object.

##### [220728]
   - Added the [`RectPack`](/etc/$$.RectPack.jsxlib) module, a fast and simple rectangle-packing algorithm that you can use for various layout-optimization projects. Goto [tests/RectPackTest](https://github.com/indiscripts/IdExtenso/tree/master/tests#rectpacktestjsx) for a basic InDesign demo script.

##### [220713]
   - Fixed a typo in [Ext/file](/core/Ext/$$.file.jsxinc)--the `nudeName()` wasn't honoring its argument--and added the method `File.prototype.fresh()` which always return a non-existing File instance based on the present File object. `myFile.fresh()` creates if necessary an incremental suffixed path, like in `"path/to/myFile (2).txt"`, etc.

##### [220610]
   - [`PageRange`](/etc/$$.PageRange.jsxlib): added the options `reduxPair` and `reduxMore` to the `format` method.

~~~~
reduxPair   (str) Special suffix for formatting pairs if minRange > 1.
                  (`minRange` is set to at least 2 if not supplied.)
                  Note: If reduxPair is missing while reduxMore is
                  non-empty, assume reduxPair=reduxMore.

            E.g   $$.PageRange([1,2,4,5,6,10,11,15], {reduxPair:"f."})
                  => "1f., 4-6, 10f., 15" ; implied minRange=2

reduxMore   (str) Special suffix for formatting N consecutive numbers
                  from N=3 to N=minRange, provided that reduxPair is
                  defined. (`minRange` is set to 3 if not supplied.)

            E.g   $$.PageRange([1,2,4,5,6,10,11,15], {reduxPair:"f.", reduxMore:"ff."})
                  => "1f., 4ff., 10f., 15" ; implied minRange=3

         WARNING  reduxPair/reduxMore operate whatever the `style` option,
                  which might lead to Roman numbers (i, ii, iii...) or
                  alphabetic sequences (a, b, c...) The client code is
                  responsible for adjusting the redux string accordingly.
~~~~

##### [220603]
  - Due to a specific limitation of ExtendScript CS4 —unability to retrieve _function_ keys using `for( k in o )`— the ScriptUI factory callbacks aren't available in InDesign CS4 (til someone finds a genius hack!) So, if your script has to support this version, it is recommended to provide a fallback strategy at the factory level. Basically, the `onLoad` method of your factory won't be invoked in CS4. A simple trick is to add the line

        $$.domVersion(7) || ScriptUI.MyCustomFactory.onLoad(); // CS4 fallback

at the end of your code. This solution is now used in [`Check(Factory)`](/etc/ScriptUI/factories/$$.Check.jsxinc) and [`DrawnCheck(Factory)`](/etc/ScriptUI/factories/$$.DrawnCheck.jsxinc).

##### [220602]
   - [`Env`](/core/$$.Env.jsxlib) now exposes a `isHighContrast` property (bool) in addition to `isDark`. So you can determine whether the UI, dark or light, is in high contrast state. Both properties are inherited by `$$`. The combination of `$$.isDark` and `$$.isHighContrast` allows your script to adjust its UI colors to the four possible states of the InDesign GUI.
   - The ScriptUI factories wrapper, [`$$.factories`](/etc/ScriptUI/$$.factories.jsxinc), now embeds a special, hidden module `$$.ScriptUIFactories` that connects any factory to IdExtenso's `onEngine` / `onLoad` / `onUnload` callback mechanism. Thus, you can declare a static `onLoad` method (resp. `onEngine`, `onUnload`) in your custom factory and then have it automatically called at the corresponding `$$` stage. Since ScriptUI factories are not _modules_, you couldn't enjoy usual callbacks in previous versions. Implementing `ScriptUI.myComponentFactory.onLoad` is very likely what you'll want to do to have internal data updated with respect to the context in which the framewok is loading. Typically, `$$.isDark` may have changed between two executions of your script in a session-persistent engine, so you may need to adjust UI colors accordingly, etc.
   - Updated [`Check(Factory)`](/etc/ScriptUI/factories/$$.Check.jsxinc) and [`DrawnCheck(Factory)`](/etc/ScriptUI/factories/$$.DrawnCheck.jsxinc) (better color management using the `onLoad` callback: the components now fit dynamically the InDesign UI theme.)

##### [220526]
   - Added the module [`Dom.Endnote`](/etc/$$.Dom.Endnote.jsxlib), the counterpart of [`Dom.Footnote`](/etc/$$.Dom.Footnote.jsxlib) for endnotes. Both now rely on a [common toolbox](/etc/Dom.FootEndnote/$$.common.jsxinc).

##### [220523]
   - [`Check(Factory)`](/etc/ScriptUI/factories/$$.Check.jsxinc) and [`DrawnCheck(Factory)`](/etc/ScriptUI/factories/$$.DrawnCheck.jsxinc): Better detection of Ctrl+Click.

##### [220521]
   - [`DrawnCheck(Factory)`](/etc/ScriptUI/factories/$$.DrawnCheck.jsxinc). Technically, the `onClickChange` handler of your **DrawnCheck** component receives as 1st argument a custom `clicked` event which is of little interest in most applications. But you may want to know more about that event in some specific cases. For example, was it a “Click” or a “Ctrl Click”? Or what was the location of the mouse cursor? This information is now present in the `clicked` event. It contains, when available,  the _essential_ properties of a ScriptUI `MouseEvent`, that is

~~~~
	         screenX    (int=0)       Screen X coord.
	         screenY    (int=0)       Screen Y coord.
	         clientX    (int=0)       Client X coord.
	         clientY    (int=0)       Client Y coord.
	         ctrlKey    (bool=false)  Whether the [Ctrl]  key is down.
	         altKey     (bool=false)  Whether the [Alt]   key is down.
	         shiftKey   (bool=false)  Whether the [Shift] key is down.
	         metaKey    (bool=false)  Whether the [Meta]  key is down.
	         button     (uint=0)      Mouse button (0|1|2).
~~~~
   - [`Check(Factory)`](/etc/ScriptUI/factories/$$.Check.jsxinc). The same enhancement has been applied to the **Check** component.

##### [220517]
   - [**Dom.Scope**](/etc/$$.Dom.Scope.jsxlib): added the methods `hasStyle()` and `hasLayer()`.

## 2.200507
   - Minor update (May 7, 2022.) Provides cosmetic changes and a global cleanup (missing declarations added in a few core functions.)
   - [Root](/core/$$.Root.jsxlib): slight change in the 'unloading' mechanism, `$$.Log.show()` is called _whatever the final log level_ as soon as the log file has been accessed. This makes the logging system more responsive even if the script just used raw `$$.Log.push(...)` commands (which are still honored in MUTE mode.)
   - [Log](/core/$$.Log.jsxlib) now exposes a `hits()` method that tells whether the logging system has been invoked during the execution of the script.
   - Updated [Env/winver](/core/Env/$$.winver.jsxres).
   
##### [220505]
   - [**Unicode**](/etc/$$.Unicode.jsxlib): this module had a wrong prolog, this is now fixed. Note: if your project uses it, the present fix is required to restore the normal behavior of your script with a `#targetengine` directive. Indeed, the error was to introduce the module using _only_

    ;eval(__(MODULE, $$, 'Unicode',  etc ))...

   instead of the regular form

    ;$$.hasOwnProperty('Unicode') || eval(__(MODULE, $$, 'Unicode',  etc ))...

   The missing part `$$.hasOwnProperty('Unicode') ||` is of primary importance. If you write your own IdExtenso modules, do not forget this crucial part and always apply the entire scheme above for every extension (i.e., outside of the `core` branch.) Otherwise, the intepreter will throw an obscure _"Unknown MODULE identifier"_ error while re-running the script in a persistent engine. The `#targetengine` directive is a great way of speeding up our scripts, since all heavy structures (core data and outer modules) can be declared once and for all (throughout the app session). However, we need to take great care of global identifiers then. Once loaded, **IdExtenso** automatically cleans up its own temporary globals (`MODULE` and many more.) Hence, the command `eval(__(MODULE, ... ))` would fail!

##### [220504]
   - Global cleanup in various modules, adding missing declarations in a few functions. (This is not a critical fix but it keeps the `[[global]]` scope much cleaner and may improve performances.)
   - [**Settings**](/etc/$$.Settings.jsxlib): Added the method `footprint(scope)` that creates a unique _footprint_ of the current settings in the specified scope(s). Useful when you need to determine whether some changes have been applied (to the settings) between two points of your process. Typical use: display a conditional "Save settings?" message when the user closes the main dialog. Just take a footprint before and after and compare the strings. Thanks to the _scope_ arg you can decide which kind of settings are traced here. The default value is `120` which merges the scopes `ENGI|SESS|OBJ|APP|HYB` and represents all keys that might be restored, regardless of CONST, RESET, and LIVE keys that are meaningless to this respect.

##### [220501]
   - [**Collator**](/etc/$$.Collator.jsxlib): Adjusted the `baseKey()` method so it takes care of tailored level1 weights in a way that gives them precedence over attractor(s).

##### [220425]
   - [**UniAsc**](/etc/$$.UniAsc.jsxlib): Added the method `sibling(anyChar)` that returns the whole string of sibling characters (incl. _anyChar_), that is, the set of characters that share the same ASCII base.

##### [220416]
   - Added a `IDEX_SESSION` env variable, cf [ENTRY POINT]($$.jsxinc), and the corresponding [`$$.Env.session()`](/core/Env/$$.script.jsxinc) method.
   - A few technical details added to **$$.Env** too.
   - [**Dom.Scope**](/etc/$$.Dom.Scope.jsxlib): Made some improvements. Better internal `UNIQ` property in `select()`.

##### [220415]
   - [**Linguist**](/etc/$$.Linguist.jsxlib): Made the `~.LNGS` map a separate resource file, so it might be accessed from an external module (just in case.)

## 2.20411
  - Important update (Apr. 11, 2022.) ⚠ A **highly critical bug** was found (and fixed!) in the [core/Ext/patterns](/core/Ext/$$.patterns.jsxinc) registry. It was affecting the static regexes `RegExp._BK`, `RegExp._SL`, `RegExp._DT`, `RegExp._OR` capturing respectively the escaped forms of `\` (backslash), `/` (slash), `.` (dot), and `|` (vertical line). Even if your script does not explicitly use these predefined patterns you should update the framework as soon as possible. Serious internal routines were indeed impacted, like `String.prototype.toSource()` or `$$.JSON()`!

##### [220409]
   - [**MetaCollator**](/etc/$$.MetaCollator.jsxlib) improves `W1BA`'s base keys using local replacements for a few letters whose level1 weight could appear prematurely in the Unicode map. See details in `~.REBA`:

    // Old Key       New Key (fix)
	// ---
	'\u037A':        '\u0399',   // iota subscript -> IOTA (Greek)
	'\xB5':          '\u039C',   // µ -> Μ (Greek)
	// etc

   - Updated [**Collator/W1BA**](/etc/Collator/$$.W1BA.jsxres) accordingly (data auto-generated using [RebuildCollator.jsx](/tools/RebuildCollator.jsx).)

   - Added `GREEK` and `CYRILLIC` attractors for use in [**Collator**](/etc/$$.Collator.jsxlib)'s `baseKey()` method. The function now supports multiple attractors if needed (underscore-separated, e.g `"LATIN_GREEK"`.)

##### [220406]
   - Important changes in the [**Collator**](/etc/$$.Collator.jsxlib) and [**MetaCollator**](/etc/$$.MetaCollator.jsxlib) modules (the latter being only involved in regenerating the resources of the former.) First, a small bug  was identified (and fixed!) in the `~.TMAP` routine. Although dormant, it could have had devastating effects on tailoring rules. Furthermore, a new public method `baseKey(str)` is now exposed in `$$.Collator`. It is independent from `sort()` and does not interact with the collating process. However, it provides a useful functionality, the ability to represent the _level1_ initial key of any string as a basic character, e.g `'ä'=>'A'`, `'œ'=>'O'` (in Latin script), and the same in other supported writing systems. Typically, `baseKey(input)` can be used for creating alphabetic groups ('A', 'B', 'C'…) surrounding your data. It automatically ignores _variable elements_ (punctuation marks, etc) so `baseKey("[hello]")` will still return `'H'`. Also, `baseKey()` is aware of the active tailoring rules defined by `setTailor(someLocale)`. So, for example, the code

    $$.Collator.setTailor('br');             // Select Breton
    alert( $$.Collator.baseKey("C'hweg") );  // => C'H

   will display the base key `C'H` (which is an independent letter in Breton.) In Spanish, `ñ` will be identified to `Ñ` (separate letter) while it would just produce `N` in the scope of European Ordering Rules (EOR.)

##### [220403]
   - [**Yalt**](/etc/$$.Yalt.jsxlib): added a 2nd param (_inCurrentLocale_) to the `hasKey()` method. Purpose: allows the client code to check whether a key string is available in either the global YALT map (whatever the locale), or specifically in the current, active locale.
   - [**Linguist**](/etc/$$.Linguist.jsxlib): added more than 120 keys to `~.WSYS` in order to address [ISO 15924](https://en.wikipedia.org/wiki/ISO_15924) writing systems that weren't supported yet.

##### [220402]
   - [**UniAsc**](/etc/$$.UniAsc.jsxlib): this new module provides basic Unicode-to-ASCII transliteration. When included, it appends a `translit()` method to `String.prototype` so you can simply use e.g. `"北亰".translit()` (which returns `"Bei Jing "`.)

## 2.20324

- Security update (March 24, 2022) including latest fixes and additions. Main changes in the core area: 1. The CS4 patch [`String.prototype.split`](/core/Ext/$$.string.jsxinc) wasn't working as expected on strings that _do not_ contain U+0000. It is now fixed. 2. [`RegExp.escape`](/core/Ext/$$.regexp.jsxinc) wasn't supporting the empty string. Fixed! 3. [`RegExp.fromCodeRanges`](/core/Ext/$$.regexp.jsxinc) had a logical bug related to surrogate pairs. Fixed! Also, the special escape sequence `\-` is now used for U+002D, instead of `\u002D` which is not properly handled in ExtendScript. In addition, `fromCodeRanges` supports a new option as 2nd argument, `OUT_MODE` (set it to `-1` to get a more compact range pattern.)

##### [220307]
   - [`DrawnCheck(Factory)`](/etc/ScriptUI/factories/$$.DrawnCheck.jsxinc) is a new component that manages CS/CC-consistent icon buttons (18×18 px) based on a customized `onDraw` callback. Unlike PNG sprites (that consume more memory and undergo UI scaling issues in various environments), `DrawnCheck` components are purely drawn from the `ScriptUIGraphics` canvas. You need to provide a unique key and function for each icon, as detailed in the [notice](/etc/ScriptUI/factories/$$.DrawnCheck.jsxinc). See also [TestDrawnCheck.jsx](/tests/SuiFactories/TestDrawnCheck.jsx) for a working example with three distinct icons.
   - [ScriptUI/factories](/etc/ScriptUI/$$.factories.jsxinc): Added the helper `ScriptUIGraphics.prototype.draw(x,y)`, providing a compact syntax for drawing a path from `anyWidget.graphics`. Instead of

    gx.moveTo(3,5); gx.lineTo(10,20); gx.lineTo(8,5); etc

   use

    gx.draw(3,5)(10,20)(8,5);
	
   (Each time you initiate `draw()` from a `ScriptUIGraphics` instance it interprets the first `(x,y)` pair as a `moveTo` command, then the next coordinates passed to the function are interpreted as a `lineTo` command.)

##### [220212]
   - [**PageRange**](/etc/$$.PageRange.jsxlib). A subtle option, `singletons`, has been added to the main `format` method (see the specification of the `options` argument.) In substance, `singletons` allows you to prevent some special numbers from being included in a range, disregarding any other rule that would otherwise apply. There are indeed particular circumstances where you want to detach a page number and preserve its visibility, for example if it is associated to a footnote whose number must in turn be rendered in some way during postprocessing. Then, you can tell `$$.PageRange` to exclude such page number, say 123, from a range like _120-128_. Add the option `{singletons:[123]}` (array of uint) and you will retrieve something like `"120-122, 123, 124-128"` instead of `"120-128"`. If found in the input array, your singleton number(s) is/are always detached from possible ranges.
     
> Keep in mind that those singletons are not _added_ to the input array. This is strictly a formatting option that reacts when such number is encountered while parsing and processing your data.

##### [220119]
   - [`CheckList(Factory)`](/etc/ScriptUI/factories/$$.CheckList.jsxinc): 1. Added the `root` option which tells `ScriptUI.CheckListFactory()` to automatically prepend a root node on top of all supplied branches. If `<yourOptions>.root` is a non-empty string, it becomes the root node of the tree. Useful to add a global ON/OFF control to your CheckList without re-indenting branches and nodes. Note that the getters `getString()` and `getValue()` will NOT report the root node, so the output data (items and levels) remain consistent with the input.   
   2. Added the `preCheck()` method, to wich you can pass an array of node paths assumed to describe a new set of checked nodes. Use this routine when your CheckList is already built and loaded in a particular state but then requires a new ‘selection’ of nodes from the client code. Unlike `setValue`, which entirely resets the tree based on new items, `preCheck` keeps all branches/nodes and only update their state in order to reflect your specification.

##### [220118]
   - [**Settings**](/etc/$$.Settings.jsxlib): Various improvements and optimizations. In particular, avoids accessing the DOM label twice when `app` is passed as 1st argument to `activate()`, `reset()`, or `backup()`.
   - [**Dom.Footnote**](/etc/$$.Dom.Footnote.jsxlib): Unlike variable instances (represented by U+0018), footnotes (U+0004) have no property that reveals the underlying number, as would do `myVar.resultText`. So, if you need to determine which ‘numeral’ a footnote is associated to, you have first to determine the actual index of that tootnote in its context, then you have to compute the resulting text with respect to various options like `FootnoteNumberingStyle` and so. All of these tedious tasks are taken over by the **Dom.Footnote** module. Typical uses:

    // Get the numeral of a FN ; e.g  "3", "iii", "003", "ث", etc
	var num = $$.Dom.Foonote(myFootnote);
    
	// Array of numerals of a plural FN ; e.g  ["003","004","005"...]
	var a = $$.Dom.Foonote(myStory.footnotes.everyItem());

##### [220114]
   - [**Dom.Scope**](/etc/$$.Dom.Scope.jsxlib): new module for managing a set of InDesign documents as a single entity. Read the [notice](/etc/$$.Dom.Scope.jsxlib).
   - [**Unicode**](/etc/$$.Unicode.jsxlib): updated the **Unicode** module and its dependencies; added the `~.SCRI` mapping related to Unicode scripts.
   - Updated [**MetaUnicode**](/etc/$$.MetaUnicode.jsxlib) accordingly.

##### [211226]
   - [**Settings**](/etc/$$.Settings.jsxlib): The methods `activate(src)`, `reset(src)`, and `backup(dst)` now support any arbitrary host object, that is, not necessarily an InDesign DOM object. In such case, the commands `extractLabel` and `insertLabel` are not invoked for reading/writing OBJ keys. Instead, the supplied object provides and receives data thru a _SUID_ property, where _SUID_ denotes the uid string of the active Settings. For example, if your settings are associated to the _SUID_ `"xyz"`, then `$$.Settings.activate(myObj)` will use `myObj.xyz` (if defined) as the set of OBJ-scoped keys, and `$$.Settings.backup(myObj)` will set `myObj.xyz` to the corresponding JSON string while saving the data. Note that `myObj.xyz` should be an Object when used as a source while it becomes a string when used as a destination. This kind of hack is useful when no DOM object is available when activating or saving the Settings, although object (or hybrid) keys are needed in your project. Suppose that a particular sequence of existing documents has to be treated as a single src/dst entity. No DOM object is associated to that set (unless you have a `Book` on hand.) However, your script could still elaborate a special structure and some unique ID for addressing that entity. And then you might want to assign OBJ keys to the entity, instead of global APP keys, whenever the client code works with that specific sequence of documents. You can then supply the dedicated object to `$$.Settings` methods in order to enjoy the mechanism of recovering and saving OBJ keys. (What is left to you is the process of reconstructing the entity and/or saving its own data in a persistent way when your project requires it.)

##### [211212]
   - [`CheckList(Factory)`](/etc/ScriptUI/factories/$$.CheckList.jsxinc): Modified the default behavior of `getString()` when **no argument** is supplied: it now returns the full state/item sequence, hence equivalent to `myCheckList.getValue()`. This change was required to keep this factory consistent with `ModalScript` semantics regarding the `SmartListItemGetter` option. See [ModalScript/UserInterface](/etc/ModalScript/$$.UserInterface.jsxlib). If you need to retrieve the items _without state prefixes_, use `myCheckList.getString(false)` (or `0`) instead of an undefined argument. The other options of `getString()` are unchanged.

##### [211210]
   - [Ext/regexp](/core/Ext/$$.regexp.jsxinc): `RegExp.escape()` wasn't supporting the empty string! Fixed.

##### [211207]
   - [`CheckList(Factory)`](/etc/ScriptUI/factories/$$.CheckList.jsxinc): Added a new state for _locked_ nodes. This change has no consequence on existing scripts. You can now declare a checked item as locked using the prefix `#` instead of `+` (this mechanism is only available for terminal nodes, do not attempt to _lock_ an entire branch.) A locked item cannot be unchecked, so it visually informs the user that the corresponding element will be automatically present in the final selection. Locked items are represented using the prefix ⏺ (U+23FA) in the listbox. Here is a typical declaration in a `ScriptUI.builder` resource object:
   
   	      . . .
		  CheckListFactory$MyCheckList:
	      [{
	          data:  ["+ Adobe", "## InDesign","-- Illustrator","++ Photoshop",
	                  "+ Other", "++ IndyFont", "-- Wordalizer"],
	          help:  "The InDesign element cannot be unchecked.",
	      }],
		  . . .

##### [211206]
   - [`CheckList(Factory)`](/etc/ScriptUI/factories/$$.CheckList.jsxinc): fixed the _“wg is undefined”_ error in `setValue` (!)

##### [211130]
   - [Ext/regexp](/core/Ext/$$.regexp.jsxinc): Found a logical bug in `RegExp.fromCodeRanges` (related to surrogate pairs.) Fixed!

##### [211129]
   - [Ext/regexp](/core/Ext/$$.regexp.jsxinc): Fixed and improved the static method `RegExp.fromCodeRanges(codeRanges,OUT_MODE)`. The special escape sequence `\-` is now used for the hyphen (U+002D), instead of `\u002D` which is not properly handled in ExtendScript's RegExp classes. In addition, `fromCodeRanges` supports a new option for its 2nd argument `OUT_MODE`: set it to `-1` to get a more compact range pattern. Only special characters are then escaped, using the `• -> \•` scheme.

##### [211118]
   - [**Unicode**](/etc/$$.Unicode.jsxlib). Updated Unicode blocks (`~.UBLK`); added category mapping (`~.CATG`) for future methods.
   - [**Collator**](/etc/$$.Collator.jsxlib). Full update based on Unicode “allkeys” 14.0.0. (New data automatically generated from [**MetaCollator**](/etc/$$.MetaCollator.jsxlib).)

##### [211112]
   - [**PageRange**](/etc/$$.PageRange.jsxlib). The methods `parse` and `normalize` now support the `map` argument as a function too. For example,
     `$$.PageRange.parse("15, 10-12, 18", null, function(x){ return x.toString() })`   
	 returns the array of _strings_ `["10", "11", "12", "15", "18"]` rather than the corresponding array of numbers. Of course you can use more sophisticated functions ;-)

##### [211107]
   - [SUI/mini](/core/SUI/$$.mini.jsxinc): Added an additional condition in `ScriptUI.setFocus()` so that one can forcibly exclude particular widgets from the “focus loop.” How? Just set the custom property `__cantFocus__` to a truthy value. When found, this flag is taken into account by `setFocus()` which then skips the widget as a possible target. Example: you have created a custom control (or factory) that technically supports the `active` property and could receive the focus, but you made it behave so that it does not respond to the `focus` event. In such case you want to inform `ScriptUI.setFocus` that it should ignore your component. This is now possible using `myComponent.__cantFocus__ = true`.

##### [210922]
   - Fixed [Issue #4](https://github.com/indiscripts/IdExtenso/issues/4) in the [$$.Web](/etc/Web.jsxlib) module.

##### [210913]
   - [Dom/items](/core/Dom/$$.items.jsxinc) solves the issue of retrieving items (from any `Collection` or plural specifier) having a specific property set to a specific value. It provides the general method `allItemsByKeyVal(host,key,value)`, then two useful methods based on it: `allItemsByName(host,name)` and `allItemsByLabel(host,label)`. Note that the native DOM command `myCollection.itemByName(someName)` _does not_ return a plural specifier (as you may expect), so it won't reach all items that share the incoming name within the collection. Use `$$.Dom.allItemsByName(myCollection,someName)` to get the whole array of target items. The methods support DOM specifiers as well, e.g `myLayer.textFrames.everyItem()`, etc.

##### [210902]
   - [`CheckList(Factory)`](/etc/ScriptUI/factories/$$.CheckList.jsxinc): added the `'x2'` option as 2nd argument of `getString()`, which then produces paths of the form `<parent>\x02<parent>\x02...<node>`. Useful if both brackets and slash characters may appear in node names.

## 2.10901

- Important update (Sept 1, 2021) including latest fixes and additions. Main changes in the core area: added the method `String.prototype.unaccent()` for removing accents/diacritics from a string, fixed the pattern `RegExp.LINE` in [Ext/patterns](/core/Ext/$$.patterns.jsxinc), [SUI/builder](/core/SUI/$$.builder.jsxinc) can optionally prevent `helpTip` inheritance on a particular component (use `helpTip: false`), added `ScriptUI.measureWidth()` to [`SUI/mini`](/core/SUI/$$.mini.jsxinc), which fixes the biased results of `graphics.measureString()` in CC/Win environments.

- The [**YALT**](/etc/$$.Yalt.jsxlib) module now supports “mute terminators”:

You have the option to register _variants_ for the same English key using a special terminator among the control characters `'\x01'`, `'\x02'`, `'\x03'` or `'\x04'`. Hence you can provide distinct sets of translation strings for words or expressions — like "All", "[None]", "match", etc — that have variant forms in the target language depending on the context. For example, in French,
	      
	      All     # Tous
	      All\x01 # Toutes
	      All\x02 # Tout
	      
   offer three possible translations for the word `"All"`. The suffixes `\x01` and `\x02` are used to discriminate these three cases. If the default (English) language is active, both key strings will result in the word _All_ (the terminator is removed). Otherwise, the desired translation will be selected.

This new feature allows you to address gender or number inflections that are not marked in English, as well as pure homographs like "left" (side) vs. "left" (past participle of leave.)

##### [210825]
   - Fixed the routine `ScriptUI.measureMulti()` for Win platforms in [ScriptUI/factories](/etc/ScriptUI/$$.factories.jsxinc). An infinite loop could occur with huge un-splittable strings.
   - [`Popup(Factory)`](/etc/ScriptUI/factories/$$.Popup.jsxinc): improved text wrap using ZERO WIDTH SPACE suffix after some punctuation marks: `.`, `-`, `/`, `\`.

##### [210821]
   - [ScriptUI/factories/](/etc/ScriptUI/factories): made states (i.e. `enabled` and `visible` properties) configurable at creation time for `Check(Factory)`, `CheckGroup(Factory)` and `CheckList(Factory)`. This allows you to predefine states straight from the `options` object.

##### [210819]
   - Improving the [`Popup(Factory)`](/etc/ScriptUI/factories/$$.Popup.jsxinc). 1. Added a cache to avoid re-processing the same arguments from the `update` method while the component is already shown in that state. Should deal smoothly with unconsidered duplications of 'popup' events. 2. Fixed resizing issue in CS4/CS5.

##### [210817]
   - [**PageRange**](/etc/$$.PageRange.jsxlib). New module for parsing-formatting-normalizing numeric sequences of the kind “3, 5-8, 10, 12-13...”. Typical use is checking and reformatting page ranges of your target document or book. _(See the demo in [`/tests/PageRangeTester`](/tests/PageRangeTester.jsx))_

##### [210814]
   - Added a [`CheckList`](/etc/ScriptUI/factories/$$.CheckList.jsxinc) component in [ScriptUI/factories/](/etc/ScriptUI/factories). This control allows to display and check/uncheck hierarchical data in a list (the underlying widget is a native ScriptUI `Listbox`.) Very useful for showing style groups and similar tree structures available in InDesign.
   - Added a [`SideMenu`](/etc/ScriptUI/factories/$$.SideMenu.jsxinc) component in [ScriptUI/factories/](/etc/ScriptUI/factories). Provides a _sidebar menu_ that controls the visibility of UI components (referred to as “menu targets”.)

##### [210810]
   - Loaded some custom components in the folder [ScriptUI/factories/](/etc/ScriptUI/factories):
      - [`Check`](/etc/ScriptUI/factories/$$.Check.jsxinc) implements a customizable checkbox that optionally supports three states and deals consistently with events. Can replace the native `Checkbox` widget.
      - [`CheckGroup`](/etc/ScriptUI/factories/$$.CheckGroup.jsxinc) manages a set of uniform `Check` components. (Hence it requires the `Check` factory.)
      - [`Popup`](/etc/ScriptUI/factories/$$.Popup.jsxinc) implements a hidden container that you can make temporary visible for displaying messages alongside UI widgets.

##### [210730]
   - [ScriptUI/factories](/etc/ScriptUI/$$.factories.jsxinc). This new snippet introduces a set of common functions used in custom ScriptUI factories. Mainly:
      - `ScriptUI.factoryOptions(ini,defs)`: Merges the incoming `ini` set with a default set of options.
      - `ScriptUI.setWatcher(widget,keys,watchFct,options)`: Attaches a _watcher_ (“watch function”) to widget keys.
      - `ScriptUI.dispatch(widget,evType,options)`: Dispatches a custom event.
      - `ScriptUI.measureMulti(text,widget,maxWidth)`: Returns the _probable_ dimensions of the string `text` when laid out in a multiline text widget (StaticText, EditText.)

##### [210729]
   - [SUI/mini](/core/SUI/$$.mini.jsxinc): added the `RETMAX` argument (boolean) in `ScriptUI.measureWidth(text,widget,RETMAX)`. The function then returns the highest result when _legacyWidth_ and _computedWidth_ differ.

##### [210711]
   - [SUI/builder](/core/SUI/$$.builder.jsxinc) now allows you to prevent `helpTip` inheritance on a particular component thas doesn't want to display any help tip. Simply use the rule `helpTip: false`.

##### [210703]
   - [ScriptUI/events](/etc/ScriptUI/$$.events.jsxinc). Better management of modifier keys (Alt/Ctrl/Shift/Meta) while cloning a `KeyboardEvent` via `ScriptUI.event('my_custom_type', 'K', originalKeyboardEvent)`.
   - [Ext/patterns](/core/Ext/$$.patterns.jsxinc): Changed `RegExp.LINE = /\u000D|\u000A|\u000D\u000A/g` into `RegExp.LINE = /\u000D\u000A|\u000D|\u000A/g` (longest match first.) The latter form is more conform and fixes inconsistencies between ExtendScript CS and CC.

##### [210626]
   - [Ext/string](/core/Ext/$$.string.jsxinc): Added the core method `String.prototype.unaccent()`, a basic routine for removing accents/diacritics from a string. E.g. `"ÀçĎéĩĵĶńőŕşūŵŷż".unaccent()` returns `"AcDeijKnorsuwyz"`.
   - [`SUI/mini`](/core/SUI/$$.mini.jsxinc): Added `ScriptUI.measureWidth()`, which fixes the biased results of `graphics.measureString()` in CC environments (Windows only, as the bug seems Win-specific.) Go to [StaticTextMetrics.jsx](/tools/StaticTextMetrics.jsx) for testing.

## 2.10608
  - Important update (June 06, 2021) including latest fixes and additions.
  - Main changes in the core area: fixed a potential error in `$$.Env.globalEvent()` ([Env/script](/core/Env/$$.script.jsxinc)); prevents [**JSON**](/core/$$.JSON.jsxlib) from accessing invalid name-based specifiers; added the `startupAlias()` method in [**File**](/core/$$.File.jsxlib) for dealing with “startup scripts.”

##### [210519]
   - [**Collator**](/etc/$$.Collator.jsxlib). Fixed a CS4 bug involving empty string(s): the `~.SPLT` routine was killing CS4 if the input string was empty. Now `s.length > 0` is a condition before calling `s.replace(callee.CUR_MTCH, F)`.

##### [210518]
   - [**YALT**](/etc/$$.Yalt.jsxlib). Added automatic support of `...` terminator. That is, if the key `abc` is present in your Yalt package and translated into `xyz`, then `abc...` will be recognized as well, and translated into `xyz...`. (The other automatic terminators are `.`, `:`, and `!`)

##### [210516]
   - [**Collator**](/etc/$$.Collator.jsxlib). Made zero-padding (`~.ZPAD`) simpler, cf `sortNumbers` option. Any word boundary (incl. `.`) can now initiate a valid digit sequence: `XYZ.123` is no longer interpreted as `0.123`, and regular decimal point as in `XYZ 123.45` is parsed normally.

##### [210515]
   - [**Collator**](/etc/$$.Collator.jsxlib). Small improvement of the _Word-by-Word_ system, removing spaces and hyphens followed by `(` or `,` while preprocessing text items (cf `~.PWBW`) This strengthens the rule `[PARENTHESIS] < [COMMA] < [SPACE]` and ties in with _Chicago Manual of Style_ example (p. 833, 2010.)

##### [210419]
   - [AnyScript/menu_extension](/etc/AnyScript/$$.menu_extension.jsxinc) Made `menuAction()` capable of targetting submenus as well as menuitems by calling `$$.Dom.Menu.get()` instead of `...getMenuItem()` while resolving menu references. As a result, any path in your ...ScriptMenu template can point out to either a `MenuItem` or `Submenu` instance.

##### [210417]
   - [Ext/regexp](/core/Ext/$$.regexp.jsxinc): Removed duplicated formal parameters _X,Y_ in `RegExp.fromCodeRanges`. (No side effects but had to be fixed.)

##### [210413]
   - [**Dom.Menu**](/etc/$$.Dom.Menu.jsxlib): re-implemented the menu access routine, taking into account the many bugs and limitations identified in InDesign CS4/CS5/CS6 regarding name-based specifiers (`Menu`, `Submenu`, and `MenuItem` objects.) In summary, the path solver had to avoid both `.getElements()`, `.constructor` and `.parent` commands to work around CSx bugs. In such environment, the algorithm tries to strictly resolve menu paths _by index_ (cf the routines `~.RESO()`, `~.INTO()`, etc.)
   - Added the `getAction()` method in [MenuExtension](/etc/AnyScript/$$.menu_extension.jsxinc) and fixed a few typos.

##### [210410]
   - [**JSON**](/core/$$.JSON.jsxlib): Skips invalid name-based specifiers altered by inner double quotes, like `/menu[@name="Контекстное меню "Общие""]/menu-item[@id=118791]`. This InDesign bug occurs in CS4/CS5 and leads to _broken_ DOM paths. `$$.JSON` now detects it and labels such specifiers as “broken”.

##### [210409]
   - [**ModalScriptMenu**](/etc/$$.ModalScriptMenu.jsxlib) (resp. [**BasicScriptMenu**](/etc/$$.BasicScriptMenu.jsxlib)) provides a simple and natural extension of the `ModalScript` (resp. `BasicScript`) module, based on the private `~.EXTN` member introduced in [AnyScript/run](/etc/AnyScript/$$.run.jsxinc). Thanks to this extension mechanism, the Context/UI/Server model now supports an additional `MenuExtension` component that fully manages menu installation and event handling. It is then super-easy to attach a menu to an existing `ModalScript` (resp. `BasicScript`). The whole logic is detailed in the [AnyScript/menu_extension](/etc/AnyScript/$$.menu_extension.jsxinc) snippet, which adds four _hooks_ to the system:
   1. `onStartup(runMode,parentModule)`: Called only if the script is presently running as a startup script.
   2. `beforeDisplay(runMode,parentModule,scriptMenuAction)`: Called when the `beforeDisplay` event occurs. If defined, this function must return TRUE (resp. FALSE) to enable (resp. disable) the menu item.
   3. `beforeInvoke(runMode,parentModule,scriptMenuAction`: Called when the `beforeInvoke` event occurs.
   4. `afterke(runMode,parentModule,scriptMenuAction`: Called when the `afterInvoke` event occurs.
   > See full example in [tests/BasicScriptMenuDemo.jsx](/tests/BasicScriptMenuDemo.jsx)

##### [210407]
   - [**Dom.Menu**](/etc/$$.Dom.Menu.jsxlib): Made `removeAction()` a bit safer using a `isValid` checkpoint on `ScriptMenuAction` instance(s).
   - [**File**](/core/$$.File.jsxlib): Added a generic `startupAlias()` method that will create, check or remove an alias of the `target` script file in the `startup scripts` subfolder of the _user_ branch.

##### [210405]
   - Added a preliminary step in [AnyScript/run](/etc/AnyScript/$$.run.jsxinc) that checks whether the private member `~.EXTN` is defined and functional. In such case, `~.EXTN(runMode)` is called and if the returned value is `false` the whole script execution is stopped. This block is processed _before_ the regular Context/UI/Server cycle (settings are not _activated_ at that point.) The general purpose of this preliminary step is to bring extensibility to the _AnyScript_ template (on which **BasicScript** and **ModalScript** are based.) A typical use of `~.EXTN` would be to provide menu and/or startup-script installation mechanisms, entirely decoupled from the Context/UI/Server scheme, while offering dedicated event handlers (_hooks_) like `onStartup`, `beforeDisplay`, etc. This will be done in extended modules (coming soon.)

##### [210404]
   - Quick fix of `$$.Env.globalEvent()` in [Env/script](/core/Env/$$.script.jsxinc): added an `isValid` test on the incoming event (since it's a DOM object.)
   - Added `removeAction()` in [**Dom.Menu**](/etc/$$.Dom.Menu.jsxlib).

## 2.10403
  - Quick update (April 04, 2021) introducing the important `$$.Env.inStartup()` method. This function tells whether the code is presently running “as a startup script”, based on the value of `app.performanceMetric(PerformanceMetricOptions.MINISAVE_COUNT)` and taking into account the engine state. More details in the [`Env/script`](/core/Env/$$.script.jsxinc) snippet. As all other **Env** features, `$$.Env.inStartup()` is now part of the core and will help manage interesting tasks in relation with startup scripts (in particular the InDesign menus and menu actions subsystem.) You can now determine if your program is _now_ running as a startup script from any point of your client script: `$$.Env.inStartup()` will return `1` (yes) or `0` (no) so you can decide, for example, if it is relevant to display a modal alert, go into time-consuming code, etc.

##### [210328]

- [**Dom.Menu**](/etc/$$.Dom.Menu.jsxlib) added, a handy module for accessing and managing `Menu`, `Submenu`, `MenuItem` instances, as well as custom `ScriptMenuAction`. See the BACKGROUND section to get started with **Dom.Menu** features. See also the [MenuCamelCase demo](/tests#menucamelcasejsx), which implements a custom menu action using `Dom.Menu.setAction()` and more advanced stuff.

## 2.10322
  - Stabilized version (March 22, 2021) including latest fixes, improvements, and additions.
  - [`Env/script`](/core/Env/$$.script.jsxinc): Enhanced the `$$.Env.globalEvent()` method so it will not return the same `Event` instance twice, unless explicitly allowed. This is a tricky adjustment but definitely needed in advanced projects: `$$.Env.globalEvent` recovers the current _DOM event_ (e.g, the `'onInvoke'` stage of a `ScriptMenuAction`) by reading the global variable `evt` (aka `$.global.evt`) which is automatically set by InDesign/ExtendScript. However, a problem may arise if you use a **persistent engine** and allows your script to be executed by different means (triggered by an event listener, launched from the Scripts panel, etc.) Then, the `$.global.evt` reference may persist (as previously initiated by a listener) and is _still_ in memory while your script now runs from a different launcher. So your code may misinterpret the returned ref of `$$.Env.globalEvent()` as a new Event and react inappropriately. To prevent any confusion, you could probably delete `$.global.evt` once processed (not tested though), but it sounds safer to address the issue from `$$.Env.globalEvent` itself. The new code uses an internal _event stamp_ that detects a previously returned event. In such case, the method returns `0` instead of the old `Event` reference, unless you supply a truthy `ALLOW_PREVIOUS_EVENT` argument as 1st parameter.
  - Recent additions/changes: [`SUI/mini`](/core/SUI/$$.mini.jsxinc): `ScriptUI.HDI_SCALING` (will manage HiDPI issues), `ScriptUI.callback()`, `ScriptUI.setFocus()`, plus the option to attach multiple events to a single listener in [`SUI/builder`](/core/SUI/$$.builder.jsxinc).

##### [210225]
  - [`SUI/mini`](/core/SUI/$$.mini.jsxinc): Added `ScriptUI.HDI_SCALING`, an array of two factors `[<xFactor>,<yFactor>]` that reflect how ScriptUI coordinates are sometimes affected in HiDPI displays. `ScriptUI.HDI_SCALING` should normally be `[1,1]`. In some environments (esp. Win10 with UI scaling applied) the factors can be higher, e.g `[1.5, 1.5]` in 150% UI scaling. Knowing these factors helps solve various inconsistencies altering ScriptUI coordinates.

##### [210203]
  - [**Web**](/etc/$$.Web.jsxlib): Fixed redirection issue, automatic `http -> https` redir is now supported. Relaxed the non-modalstate condition in InDesign >= CS5 (7.0) since it has been found that `app.doScript` can work in modal state from that ID version. Huge redesign of the [HTTP Secure (Win) snippet](/etc/Web/$$.HttpSecure.Win.jsxinc), made safer and more compact. _(Still searching how to manage timeout here…)_

##### [210124]
  - [`SUI/mini`](/core/SUI/$$.mini.jsxinc): Added `ScriptUI.callback()`, a helper that removes and/or attaches event listeners for specified event type(s).
  
  - [`SUI/builder`](/core/SUI/$$.builder.jsxinc) now provides the option to associate multiple events to a single listener in one line, e.g
  
    ~~~~
    _blur_focus:    function onBlurFocus(ev){ . . . }
    ~~~~

    You just have to concatenate one or several supported keys among `_move`, `_moving`, `_resize`, `_resizing`, `_show`, `_close`, `_focus`, `_blur`, `_change`, `_changing`, `_click`, `_mousedown`, `_mouseup`, `_mousemove`, `_mouseover`, `_mouseout`, `_enterKey`, `_keydown`, `_keyup`.

##### [210118]
  - [`SUI/mini`](/core/SUI/$$.mini.jsxinc): Improved `ScriptUI.setFocus()`, which now supports a 2nd argument (`NoRetWin`) that tells the function to return `0` if the Window is finally made active as a fallback.

## 2.10116
  - Stabilized version (January 16, 2021) including latest patches and additions.
  - Added in [**Env**](/core/$$.Env.jsxlib) the `uiLevel()` method that makes it easy to mute/restore _user interaction level_ while opening or processing documents. Typical use:

~~~~
// [REM] `$$.Env.uiLevel` is exposed in `$$`
$$.uiLevel(0); // mute user interactions
app.open(myArrayOfInddFiles);
$$.uiLevel(1); // restore
~~~~

  - Recent additions: `$$.Env.canToolKit()` (so `$$.Log` can now operate in ESTK console as well) ; `ScriptUI.event()` ; `$$.Dom.parentSpread(item)` and `$$.Dom.parentPage(item)` (exposed in `$$`).
  - `String.prototype.charAt()` fixed so it can pick U+0000.

##### [210106]

- The [**Env**](/core/$$.Env.jsxlib) module now checks ExtendScript Toolkit's status via `BridgeTalk` (see `~.ESTK()` in [/script.jsxinc](/core/Env/$$.script.jsxinc).) This information is reported in `$$.Env.summary()`. Also, the new `canToolKit()` method tells whether ESTK is in the place and presently running.

- The [**Log**](/core/$$.Log.jsxlib) module now outputs trace and/or warn messages in the ESTK console if you opened it before running the script. This is useful to get instant feedback while debugging. (The log file is still processed in parallel.)

##### [210104]

- [`Ext/string`](/core/Ext/$$.string.jsxinc): In pure JavaScript the `charAt` method can pick a U+0000 character, e.g `"x\0y".charAt(1)` returns `"\0"`. But in ExtendScript an empty string is returned whenever `charAt` should output `"\0"`. [`Ext/string`](/core/Ext/$$.string.jsxinc) hacks `String.prototype.charAt` in order to fix the problem.

##### [210103]

- [ScriptUI/events](/etc/ScriptUI/$$.events.jsxinc) snippet added in the `etc` branch. Provides the function `ScriptUI.event()` and advanced tools and tricks for manipulating `Event`, `UIEvent`, `MouseEvent`, and `KeyboardEvent` instances at the ScriptUI level.

##### [201213]

- The core [**Dom**](/core/$$.Dom.jsxlib) module now provides two essential functions `$$.Dom.parentSpread(item)` and `$$.Dom.parentPage(item)` that were highly expected in many InDesign scripts. This routines have aliases at the root level so you can simply call `$$.parentSpread(...)`, resp. `$$.parentPage(...)`. They support DOM objects that fit the `parentPage` property in CS5/CS6/CC:

> PageItem, SplineItem, Oval, Rectangle, GraphicLine, Polygon, Group, TextFrame, EndnoteTextFrame,
> Guide, HtmlItem, MediaItem, Movie, Sound, SVG, ImportedPage, EPSText, Graphic, PICT, WMF, PDF, EPS, Image,
> FormField, Button, MultiStateObject, CheckBox, ComboBox, ListBox, RadioButton, TextBox, SignatureField.

Note that `$$.parentPage()` is available in whatever version, including CS4 :-) Also, `$$.parentSpread(...)` and `$$.parentPage(...)` can work on plural specifiers, e.g `myDoc.ovals.everyItem()`, and will then return, if relevant, an array rather than a single object.

## 2.01127
  - Stabilized version (November 27, 2020) including latest fixes, improvements, and additions.
  - Cosmetic changes in [Root/errors](/core/Root/$$.errors.jsxinc).
  - Recent patches and additions: `String.prototype.subReplace()` ; `RegExp.fromCodeRanges()`.
  - [`Ext/math`](/core/Ext/$$.math.jsxinc): In ExtendScript CS4/CS5 (InDesign versions <= 7.0) `Math.min(...)` and `Math.max(...)` weren't supporting more than two arguments. In particular, the `Math.max.call(null, [1,2,3,4,5])` trick (resp. `Math.min...`) can't be used in these older script engines. The present snippet provides a patch that makes all scripts consistent regarding `Math.min` and `Math.max`. (Returned values comply with _ECMA-262_ rules.)

##### [201111]

- [`Root/error`](/core/Root/$$.error.jsxinc): Made `error()` and `receiveError()` less verbose on displaying the stack.

##### [201025]

- [`Ext/string`](/core/Ext/$$.string.jsxinc): Added a convenient `String.prototype.subReplace()` method that performs replacements only in specific substrings determined by a regular expression. In the following example, the replacement `/a(\d+)/g -> "X$1"` is processed only in `<...>` sub-regions:

~~~~
"a12<a34>a567<a998>".subReplace( /a(\d+)/g, "X$1", /<[^>]+>/g )
-> a12<X34>a567<X998>
~~~~

A 4th parameter (boolean) can be supplied, it then specifies whether replacements must be processed *outside* the sub-regions (default being *inside*.)

##### [201005]

- [`Ext/regexp`](/core/Ext/$$.regexp.jsxinc): Improved `RegExp.fromCodeRanges()`. The function now manages large ranges of surrogate pairs and optimizes the result. For example,
~~~~
RegExp.fromCodeRanges('1F5F4..20AD2')
-> \uD83D[\uDDF4-\uDFFF]|[\uD83E-\uD841][\uDC00-\uDFFF]|\uD842[\uDC00-\uDED2]
~~~~

##### [200923]

- [`Ext/regexp`](/core/Ext/$$.regexp.jsxinc): added `RegExp.fromCodeRanges()` (static), an experimental routine that allows you to build `RegExp` patterns from an array of Unicode codepoints and/or range of codepoints, including characters beyond U+FFFF that then require UTF16 encoding of surrogate pairs. See the [detailed description](https://github.com/indiscripts/IdExtenso/blob/master/core/Ext/%24%24.regexp.jsxinc#L629).

##### [200812]

- [**Collator**](/etc/$$.Collator.jsxlib): Added sort options and many refinements (_letter-by-letter_ and _word-by-word_ systems, stable sort, _upperFirst_ mode at level 3, ability to sort separate digit sequences as numbers.)

##### [200630]
  - [**YALT**](/etc/$$.Yalt.jsxlib): In order to make long strings more readable you can now write any translation string in a separate line starting with `<spacing># `, where `<spacing>` denotes zero or more spacing characters (space or tab.) Here is an example of valid multiline L10N string:

~~~~
	Collect All Threaded Frames
	# Récupérer tous les blocs liés
	# Alle verketteten Rahmen aufnehmen
	# Recopilar todos los marcos enlazados
~~~~

##### [200618]

- Updated European Ordering Rules (EOR), cf [MetaCollator/tailoring/$$.EOR.jsxres](/etc/MetaCollator/tailoring/$$.EOR.jsxres) reflected in [Collator/TLRM](/etc/Collator/$$.TLRM.jsxres).

- [**Collator**](/etc/$$.Collator.jsxlib)`.sort()`: Refinement of the rules regarding input/ouput processing when incoming data contain `\0`. A more consistent solution is adopted:

If an input string matches the pattern `"abc\0...\0xyz"`, where the first (resp. last) `\0` denotes the first (resp. last) occurence of U+0000, then:   
1. Only the `abc` part (prefix) will be considered while computing collation keys, the next characters being *entirely ignored*.   
2. Only the `xyz` part (suffix) *will be present* in the output array. Note that an input of the form `"abc...\0"` will lead to an empty output ("").

##### [200617]
- [**Collator**](/etc/$$.Collator.jsxlib): Since `String.prototype.replace()` is unsafe (in ExtendScript) as soon as `'\0'` is involved, input strings are now sanitized before splitting. (In particular, this prevents casual infinite loops in CS4!)

##### [200616]
- [**Collator**](/etc/$$.Collator.jsxlib): Enhanced (and simplified!) `~.SPLT` routine. The separator `U+FFFD` is no longer used by default while splitting the input string into keys. It had side effects and no application in the present implementation. (However the option is still available through the 3rd parameter `SPLIT_BY_FFFD`.)

##### [200613]
- [**Collator**](/etc/$$.Collator.jsxlib): Added the parameter `RET_MODE` in `getRichList()`. You can now get a full clone of the _rich array_ language list.

- [**JSON**](/core/$$.JSON.jsxlib): A more accurate solution has been found for dealing with rich arrays. The JSON string now evaluates to an actual `Array` object with additional properties, based on the following pattern:

`(function(a,o...){...})([...],{...})`

For example, the _arr_ array originally defined by

~~~~
var arr = [10,20,30];
arr.name = "Hello";
~~~~

will be stringified `'(function(a,o,k){for(k in o)o.hasOwnProperty(k)&&a[k]=o[k];return a})([10,20,30],{"name":"Hello"})'`.

This enhancement is required in various contexts, in particular when one needs to clone a rich array and send the result to a ScriptUI `ListBox`. Indeed this control expects a true `Array` class at construction time. A fake entity based on `__proto__` alteration wouldn't be recognized.

##### [200612]
[**Collator**](/etc/$$.Collator.jsxlib): Added `findTailor(iso)`, a generic public method for translating an _isoKey_ into a valid _tailorKey_. (See the private routine `~.ITOK`.) Unlike `setTailor()`, `findTailor()` does not change the current tailoring rules.

##### [200611]
[**ModalScript**](/etc/$$.ModalScript.jsxlib): Added a public [`changeLocaleTo(iLocale)`](/etc/ModalScript/$$.public.jsxinc) method in order to reflect the equivalent feature already available in [BasicScript](/etc/$$.BasicScript.jsxlib). This routine just reactivates **YALT** to a different locale, i.e, it basically calls `$$.Yalt.activate(iLocale)`.

##### [200606]
[**JSON**](/core/$$.JSON.jsxlib): Added support of _rich arrays_ in `~.['\x01Array']`. A "rich array" is an Array object whose `length` is lower than `__count__`, that is, having additional properties beyond '0', '1'... indices. E.g:

~~~~
var arr = [10,20,30];
arr.name = "Hello";
~~~~

> New workaround, see [200613]

<del>In this particular case, a regular Object is created (all properties are then explicitly set), and `__proto__` is set to `Array.prototype.__proto__`, so the evaluated result behaves as a regular array (all usual `Array` members are inherited.) The string `$$.JSON(arr)` will now look like:</del>

<del>`'(function(o){o.__proto__=[].__proto__;return o})({"0":10,"1":20,"2":30,"name":"Hello"})'`</del>

<del>which evaluates to a quasi-array _arr_ (`arr instanceof Array` is true, `arr.length` is 3, etc.), although `arr.__class__` is still "Object" (read-only) and `arr.toSource()` cannot work.</del>

## 2.00601
  - Stabilized version (June 1, 2020) including latest fixes, improvements, and additions.
  - Added extra info in [Root/errors](/core/Root/$$.errors.jsxinc), plus some code refinements.
  - Recent fix: `String.prototype.lastIndexOf()` patched (CS4.)

##### [200531]
  - [**Collator**](/etc/$$.Collator.jsxlib): New extra module that implements a simplified version of the Unicode Collation Algorithm (UCA) in ExtendScript. You can test it using the script [CollatorTester](/tests/CollatorTester.jsx).
  - [**MetaCollator**](/etc/$$.MetaCollator.jsxlib): Meta-module for rebuilding [**Collator**](/etc/$$.Collator.jsxlib) resources if needed. See [tools/RebuildCollator.jsx](/tools/RebuildCollator.jsx) for a ready-to-use tool.
  - [**YALT**](/etc/$$.Yalt.jsxlib): The default [YALT package](/etc/Yalt/$$.yalt.jsxres) now offers 300+ essential translation strings in `FR`, `DE`, `SP`, `IT`, `RU`. Most are inherited from InDesign L10N strings so they fit the conventions of the application.
  - Useful improvement of the main `YALT()` function -- aka `__()` -- which now _sanitize_ any missing argument. That is, if a YALT pattern specifies _%i_ placeholders but you don't supply the corresponding args, those `undefined` variables are automatically coerced into an empty string, instead of the string `"undefined"`. For example, calling `__("abc%1xyz")` without the _%1_ extra parameter will now return `"abcxyz"`. (In the previous version, `"abcundefinedxyz"` would have been returned.)

##### [200530]
  - [**DateFormat**](/etc/$$.DateFormat.jsxlib): Versioning and slight refinements.

##### [200528]
  - [**Linguist**](/etc/$$.Linguist.jsxlib): New module designed as a central place for addressing language and locale data. Its main component (`~.LISO`) maps ISO639-1 codes.
  - [**DateFormat**](/etc/$$.DateFormat.jsxlib): Added IT (Italian) and RU (Russian) localization patterns, so the module now supports `EN FR DE SP IT RU` date/time formats.

##### [200526]
  - [`Env/locale`](/core/Env/$$.locale.jsxinc): Added `localePrefix()`, a getter that simply returns the current locale name prefix, e.g `"FRENCH"`, `"SIMPLIFIED_CHINESE"`, `"INTERNATIONAL_ENGLISH"`... Also, the `localeIdToString(iLocale,keepSuffix)` method now implicitly considers the current InDesign locale if the `iLocale` arg is missing.
  - [`Ext/string`](/core/Ext/$$.string.jsxinc): CS4 patch of `String.prototype.lastIndexOf()`, which was unable to address `myStr.lastIndexOf('\0')`.

##### [200525]
  - [**Unicode**](/etc/$$.Unicode.jsxlib): Utility module added for dealing with Unicode data (work-in-progress.) So far, it manages Unicode blocks through the methods `getParentBlock(codePoint)` and `getRange(blockName)`.
  - [**MetaUnicode**](/etc/$$.MetaUnicode.jsxlib): Meta-module for rebuilding [**Unicode**](/etc/$$.Unicode.jsxlib) resources. See [tools/RebuildUnicode.jsx](/tools/RebuildUnicode.jsx) for a ready-to-use tool.

##### [200524]
  - [`Dom/app`](/core/Dom/$$.app.jsxinc): Notice and cosmetic refinements (`fromLocaleStr` and `toLocaleStr`.)

##### [200420]
  - [**ByteStream**](/etc/$$.ByteStream.jsxlib): Added the `TAG` encoding (equivalent to `ASC*4`) to handle OpenType tag type or similar 4-letter strings. Added a convenient `toSource()` method that both supports input and output streams.

## 2.00228
  - Stabilized version (Feb. 28, 2020) including latest fixes and additions.
  - An alternate entry point is provided, [`$$.spin.jsxinc`]($$.spin.jsxinc), which lets you display a _spinner_ from the including stage. Call `$$.spin()` at any point of your script/module to get the spinner updated while performing time-consuming tasks. To enjoy this feature, change `#include path/to/$$.jsxinc` into `#include path/to/$$.spin.jsxinc` in your client script. The method `$$.spin()` is otherwise transparent.
  - Recent additions in the `core` branch: `String.fromBase64()`, `String.prototype.toBase64()`, `String.prototype.rpad()`, `String.prototype.lpad()`, `String.levenFilter(arr,str,max)`, `$$.input()`, `$$.Env.tempRedraw()`.

##### [200228]
  - [**Web**](/etc/$$.Web.jsxlib): Fixed a typo in [`HttpSocket`](/etc/Web/$$.HttpSocket.jsxinc). This was causing a _not-a-function_ runtime error in non-trace mode.

##### [200117]
  - [`Ext/string`](/core/Ext/$$.string.jsxinc): added `String.fromBase64()` and `String.prototype.toBase64()`.
  - [`Root/messaging`](/core/Root/$$.messaging.jsxinc): slight improvements ; uses a panel in borderless windows.

##### [200112]
  - Fixed a typo (wrong variable) in [`AnyScript/initialize`](/etc/AnyScript/$$.initialize.jsxinc).
  - [`Ext/string`](/core/Ext/$$.string.jsxinc): added string methods `String.prototype.rpad` (right padding) and `String.prototype.lpad` (left padding.)

##### [191228]
  - [`Root/messaging`](/core/Root/$$.messaging.jsxinc): Added `$$.input(caption,defVal...)`, which displays a OK/Cancel prompt box. Allows to get an input string from the user. (Supports dropdown list.)

##### [190722]
  - [**Dom.Space**](/etc/$$.Dom.Space.jsxlib): Enhanced coordinate processor (see `~.RESO`.) Due to a [CS6-CC bug](https://forums.adobe.com/message/10897624#10897624) affecting `AnchoredObject`'s coordinate system, a stronger routine was needed to support anchored items as well as regular InDesign components. We found a set of fine-tuned workarounds to resolve locations in _almost_ all cases whatever the incoming format (coordinate space, bounding space or ruler coordinates.)

##### [190617]
  - [**Dom.Space**](/etc/$$.Dom.Space.jsxlib): Added `fromCustom()`, a special `from...` method that inializes the converter so it takes as input arguments _(x,y)_ coordinates in your own (O,I,J) system. Pass in an array of three [valid locations](http://indiscripts.com/blog/public/data/coordinate-spaces-and-transformations-5/CoordinateSpacesTransfos01-05.pdf#page=25) to define `O` (origin), `I` (right point), `J` (bottom point). This method is useful if your script cannot supply coordinates in the usual _XY_, _UV_ or _RL_ systems.
  - In addition, the method `$$.Dom.Space.preScale(kx,ky)` provides the option to preset multipliers (x- and y- factors) that the converter will apply to any incoming coordinate pair.
  
##### [190613]
  - [**Dom.Space**](/etc/$$.Dom.Space.jsxlib): Added the method `matrixValues()` which returns the internal matrix numbers used by `convert()`. (And fixed a minibug in `convert()`.)

##### [190611]
  - [`Env/screen`](/core/Env/$$.screen.jsxinc): The `$$.centerWindow()` method now supports its 2nd argument as either `Window` or `LayoutWindow` type. So you can explicitly center a ScriptUI window (1st argument) relative to another one, or relative to a document window (`LayoutWindow` instance.) When no 2nd argument is supplied, the method still tries to guess the active screen center point based on internal checks.
  
##### [190602]
  - [`Env/script`](/core/Env/$$.script.jsxinc): Added the method `$$.Env.tempRedraw()` (also available straight in `$$`). Allows to invoke a specific function (1st argument) and optionally from a particular context (2nd argument) with `app.scriptPreferences.enableRedraw` temporarily set to true during the execution of that function. If `enableRedraw` is already turned on, the function is simply executed. If it was turned off, the original state is restored once the function has returned. In addition, `$$.tempRedraw(myFunc)` returns `myFunc`'s returned value just in case you'd need it.

##### [190523]
  - [**Settings**](/etc/$$.Settings.jsxlib): Added a `DontClone` global option. Usually it's safer to let `$$.Settings` perform a JSON clone while setting a key to an object reference (`ss.myKey=myObj`), because that reference may be lost and `ss.myKey` is supposed to work anyway. But in specific cases you may want to explicitly prevent the module from cloning objects during script execution, either for performance gain or for bypassing cloning limitations over complex objects like augmented arrays etc. Then you can set `$$.Settings.DontClone` to 1 before invoking `$$.Settings.declare(...)`

##### [190422]
  - [**Dom.Space**](/etc/$$.Dom.Space.jsxlib): The `fromUV()` method supports a new parameter, `centered`, that lets you work in a variant of the _(u,v)_ system. When UV is centered, the coordinates `[0,0]` denote the center anchor, while `[1,0]` (resp. `[0,1]`) refer to center-right (resp. center-bottom) anchor. This variant is handy when you want to provide signed coordinates in `-1..+1` on both axes and have a true center point at `[0,0]` in the bounding box. (Rem: the regular UV system has its origin at top-left and the center point is located at `[0.5,0.5]`.)
  - [`ScriptUI/colors`](/etc/ScriptUI/$$.colors.jsxinc): Added `scriptUI.colorPen()`, which returns a cached `ScriptUIPen` from a _uint24_ `0xrrggbb` value. (Simple shortcut to `ScriptUI.colorSetter.MAKP`.)

##### [190420]
  - [**ZDeflate**](/etc/$$.ZDeflate.jsxlib): Added the `zlib()` method, which embeds the compressed stream within a zlib wrapper.

##### [190403]
  - [`ScriptUI/colors`](/etc/ScriptUI/$$.colors.jsxinc): Added `scriptUI.colorBrush()`, which returns a cached `ScriptUIBrush` based on both a colorValue `0xRRGGBB` and an alpha component in `0..1`. Fixed a stupid bug in `ScriptUI.colorArray()` (transparency was not treated.)

##### [190331]
  - Refactored both [**BasicScript**](/etc/$$.BasicScript.jsxlib) and [**ModalScript**](/etc/$$.ModalScript.jsxlib) to get all shared code at a single place. Cf `/etc/AnyScript/`. These changes do not impact the API, so existing scripts based on either BasicScript or ModalScript infrastructure should still work as expected.

##### [190330]
  - [`SUI/builder`](/core/SUI/builder/): Fixed a problem in `ARGS.jsxres` and `WIND.jsxres` snippets. The previous code was changing the input descriptor to adjust the `properties` object to its needs. Worked fine unless the client script used a cached object from within a persistent engine! Solved.

##### [190326]
  - [`Web/HttpSocket`](/etc/Web/$$.HttpSocket.jsxinc): The request header `Connection: keep-alive` was not a good idea. It makes ExtendScript Socket _much_ slower. During a single http GET, there is no reason to require a persistent connection.
  - [`SUI/builder/WSTA`](/core/SUI/builder/$$.WSTA.jsxres): On Mac OS, changing the `enabled` property may not update the appearence of a visible widget (in particular, the background color of inner components.) The hide-show technique seems to fix that. It is implemented in the `HARD_REFRESH` subfunction of `WSTA`.

##### [190325]
  - [**Web**](/etc/$$.Web.jsxlib) module fully rewritten, with clear dependencies, improved code, etc. Should work much better now, on both Mac and Win platforms!
  
##### [190317]
  - [**ModalScript**](/etc/$$.ModalScript.jsxlib): Improved get-string-key mechanism (`~._GS_`). If the widget under consideration provides a `getString` method, invoke it. Otherwise, stringify the value.
  - [`ModalScript/UserInterface`](/etc/ModalScript/$$.UserInterface.jsxlib): Added the `CancelValue` attribute (_uint_, default:2) and fixed the treatment of the value returned from the SUI dialog. The `onClose` hook can now handle the dialog retval as such: the `ok` argument is `false` only if _retval_`===µ.CancelValue`.
  - [`BasicScript/UserInterface`](/etc/BasicScript/$$.UserInterface.jsxlib): The `~._GO_` method wasn't supposed to return `true` in case the user validates the dialog while no `onClose` callback is available. Indeed, `true` has the meaning “Skip the server”. This tiny bug had no critical impact in practice, because the `onClose` hook is almost always implemented!
  
##### [190315]
  - [**Web**](/etc/$$.Web.jsxlib): finally found a way to _escape_ XMLHTTP `responseBody` in VBS and parse the returned string in JS. Should significantly reduce failures of your `https` requests (in Windows.)
  
##### [190313]
  - [**Ext/string**](/core/Ext/$$.string.jsxinc): added `String.levenFilter(arr,str,max)`. Returns a subset of `arr` (string array) whose items are the most similar to `str` with respect to the maximum distance `max`. Based on `String.levenDist()`. A 4th argument allows to make this function case-sensitive, by default it is not.

##### [190312]
  - [**Ext/string**](/core/Ext/$$.string.jsxinc): added `String.levenDist(stringA,stringB)`. Returns the [Levenshtein distance](http://en.wikipedia.org/wiki/Levenshtein_distance) between two input strings.
  - `String.random()` no longer uses `Date` timestamp, as this caused biases.

##### [190311]
  - [`SUI/builder/SETK`](/core/SUI/builder/$$.SETK.jsxres): the special key `optimalSize` can be used to set both `preferredSize` AND `minimumSize` in one step. This is a useful shortcut, since many ScriptUI controls require both a `preferredSize` and a `minimumSize` to get properly aligned.
  - [**Env**](/core/$$.Env.jsxlib) module: fixed a bug regarding `~.IDEX` and the public property `idexEntryPath` (“URI path to ***IdExtenso*** Entry Folder, if available”). There was a mistake on the location `$.fileName` refers to in the context of included subfiles. Interesting (and no so obvious) conclusions can be found [here](/core/$$.Env.jsxlib#L291).
  
##### [190310]
  - [`ScriptUI.builder`](/core/SUI/$$.builder.jsxinc): Splitted inner functions into separate resources (`core/SUI/builder/...`). Added [state watching and management](/core/SUI/builder/$$.WSTA.jsxres).

##### [190308]
  - [`ScriptUI.setFocus`](/core/SUI/$$.mini.jsxinc) improved and made smarter. Since `Group` and `Panel` objects don't provide the `active` property natively, it's not easy to implicitly activate the main control within a container. To bypass this limitation, we now provide a generic algorithm dealing with containers although they don't own an `active` property.
  
##### [190306]
  - [`ScriptUI.builder`](/core/SUI/$$.builder.jsxinc): the patterns `"custom$..."` and `"...Factory$..."` were missing in the reverse routine `~.RVRS`. Fixed.

## 1.90303
  - Stabilized version (March 3, 2019) including latest fixes and additions.
  - In [`Root`](/core/$$.Root.jsxinc)`.unload`, added a `try..catch` block for nesting `app.activate()`. This bypasses a runtime error that sometimes occurs when multiple InDesign CC versions are running in parallel!
  - Due to `app.layoutWindows` access in [`Env/screen`](/core/Env/$$.screen.jsxinc), the `ESTK` entry point wasn't working anymore! Added `A.layoutWindows = 0;` in [`$$.estk`](/$$.estk.jsxinc) to fix that.

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
