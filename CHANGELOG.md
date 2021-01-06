##### [210106]

- The [**Env**](/core/$$.Env.jsxlib) module now checks ExtendScript Toolkit's status via `BridgeTalk` (see `~.ESTK()` in [/script.jsxinc](/core/Env/$$.script.jsxinc).) This information is reported in `$$.Env.summary()`. Also, the new `canToolKit()` method tells whether ESTK is in the place and presently running.

- The [**Log**](/core/$$.Log.jsxlib) module now outputs trace and/or warn messages in the ESTK console if you openened it before running the script. This is useful to get instant feedback while debugging. (The log file is still processed in parallel.)

##### [210104]

- [`Ext/string`](/core/Ext/$$.string.jsxinc): In pure JavaScript the `charAt` method can pick a U+0000 character, e.g `"x\0y".charAt(1)` returns `"\0"`. But in ExtendScript an empty string is returned whenever `charAt` should output `"\0"`. [`Ext/string`](/core/Ext/$$.string.jsxinc) hacks `String.prototype.charAt` in order to fix the problem.

##### [210103]

- [ScriptUI/events](/etc/ScriptUI/$$.events.jsxinc) snippet added in the `etc` branch. Provides the function `ScriptUI.event()` and advanced tools and tricks for manipulating `Event`, `UIEvent`, `MouseEvent`, and `KeyboardEvent` instances at the ScriptUI level.

##### [201213]

- The core [**Dom**](/core/$$.Dom.jsxlib) module now provides two essential functions `$$.Dom.parentSpread(item)` and `$$.Dom.parentPage(item)` that were highly expected in many InDesign scripts. This routines have aliases at the root level so you can siply call `$$.parentSpread(...)`, resp. `$$.parentPage(...)`. They support DOM objects that fit the `parentPage` property in CS5/CS6/CC:

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
