# *IdExtenso*  2.30123  (core: 203KB)

###### *“ExtendScript Framework for InDesign Ninjas.”* | [Overview](#overview) | [Key Points](#key-points) | [Getting Started](#getting-started) | [Quick Example](#quick-example)

![IdExtenso's API](screenshot.png)

## Overview

***IdExtenso*** is a complete ExtendScript/InDesign scripting framework for CC/CS6/CS5/CS4 environments. It provides a rich toolbox, based on stackable building blocks that will add muscles to your InDesign scripts.

* Do you need a clean JSON formatter that *really* supports ExtendScript oddities and InDesign DOM objects?

* Would you like to trace your debug messages in a log file the easy way?

* Are you concerned with localizing your scripts in other languages?

* …and always making sure that the environment (OS, InDesign version, locale, script engine) is properly identified and managed?

***IdExtenso*** addresses these needs, and many more. Its core structure will get you started, and a huge set of additional modules will help you implement more complex scripts and features.

The framework supports ExtendScript from version `3.92` to `4.x` and InDesign from `v.6.0` (CS4) to `18.x` (CC 2023) in both macOS and Windows platforms. It fixes, improves and extends many built-in functionalities. Here are a few examples:

* `myString.toSource()` can save 30% of the original result length.

* `$.global.parseInt()` complies with ECMAScript's latest specification.

* `RegExp.prototype["=="]` is implemented so that you can compare regexes using `==`.

* Numbers can be converted from/to IEEE754 encoding (32 or 64bit floating point arithmetic.)

* `Math.max()` and `Math.min()` support as many arguments as needed whatever the installed version of ExtendScript.

* `String.fromCodePoint()` and `String.prototype.codePointAt()` are now available with respect to ECMA-262, 9th Edition.

(And so on!)

> *Warning*. — ***IdExtenso*** is not designed for small projects. If your InDesign script does not require performance tricks, ScriptUI workarounds, localization features, high modularity, cross-version compatibility, advanced settings management... then the workspace we have designed here is probably not for you.

## Key Points

- 99.99% opensource (well, the [JsxBlind](/tools/JsxBlindLib.jsxinc) library had to be partially obfuscated ;-)

- As fast and optimized as possible.

- Light-weight core package.

- Leaving the `[[global]]` scope much cleaner than in any other framework.

- Smart support of persistent engines (`#targetengine` directives.)

- Curates various ExtendScript bugs and InDesign DOM compatibility issues.

- Still works fine in your `JSXBIN` exports!

- Growing number of extra modules that you can plug at wish (via `#include`.) Just give a look at the `/etc` branch: **[Yalt](/etc/$$.Yalt.jsxlib)** (L10N engine), **[Web](/etc/$$.Web.jsxlib)** (HTTP getter), **[Settings](/etc/$$.Settings.jsxlib)** (multiscope settings manager), **[Collator](/etc/$$.Collator.jsxlib)** (simplified Unicode collation algorithm), **[DateFormat](/etc/$$.DateFormat.jsxlib)**, **[ByteStream](/etc/$$.ByteStream.jsxlib)**, **[Unit](/etc/$$.Unit.jsxlib)**, **[PageRange](/etc/$$.PageRange.jsxlib)**, etc.

- Growing collection of powerful, fine-tuned and flexible ScriptUI components ([CheckGroup](/etc/ScriptUI/factories/$$.CheckGroup.jsxinc), [CheckList](/etc/ScriptUI/factories/$$.CheckList.jsxinc), [Popup](/etc/ScriptUI/factories/$$.Popup.jsxinc), [SideMenu](/etc/ScriptUI/factories/$$.SideMenu.jsxinc), [DrawnCheck](/etc/ScriptUI/factories/$$.DrawnCheck.jsxinc)...) easy to integrate in your own UI.

> *Note*. — Advanced InDesign scripts (including commercial products) are entirely built upon ***IdExtenso***. For instance, our Pie Chart Builder [Claquos 3](http://www.indiscripts.com/category/projects/Claquos) is 100% made up of ***IdExtenso*** components and modules. [SmartSort](https://www.indiscripts.com/category/projects/SmartSort), “advanced paragraph sorter for InDesign”, is also a nice script based on **[ModalScriptMenu](/etc/$$.ModalScriptMenu.jsxlib)**'s infrastructure and using the **[Collator](/etc/$$.Collator.jsxlib)** module. And the most recent example of ***IdExtenso***-based product is the huge [IndexMatic³](https://indiscripts.com/category/projects/IndexMatic) program, which would not have existed without the present framework.

## Getting Started

> *Requirement*. — Always open and explore the code in a true EDI ([SublimeText](https://www.sublimetext.com), [UltraEdit](http://www.ultraedit.com), etc.) rather than “ExtendScript ToolKit”. As an editor, ESTK is definitely not suitable for ***IdExtenso***.

1. Download the latest distribution ([ZIP file](https://github.com/indiscripts/IdExtenso/archive/master.zip)) and unzip the whole structure at a location available to the `Scripts Panel` folder. You must have at least `$$.jsxinc` (the _“entry point”_) and the `/core` subfolder. The `/etc` folder is optional but it contains modules of great value which we recommend you to keep at hand.

2. Either create a sample script (e.g. `myTest.jsx`) or simply open one of those provided in [`/tests`](tests). 

3. The script must contain a directive `#include 'path/to/$$.jsxinc'` pointing out to the entry point of the framework. A global reference `$$` is then available from which you can access any feature exposed in the API.

> *Note*. — If InDesign is not involved in your script project, you may `#include` the alternate entry point [`$$.estk.jsxinc`]($$.estk.jsxinc) which is intended to make **IdExtenso** available in simple ExtendScript context.

4. If relevant, include any additional module(s) you may need —e.g. `#include etc/Web.jsxlib`— so that `$$.Web` will be added too. All methods and properties are documented in their respective module.

5. After your `#include` directives, *DO NOT FORGET* to invoke `$$.load()`.

Congratulations! You're now ready to fuel your scripts with ***IdExtenso***!

> *Tip*. — Use `$$.help()` at any point of your code to discover and browse the API of the loaded modules.

## Quick Example

This basic snippet illustrates how to use some core features, namely **Log**, **JSON**, and **File**. Use it as a template to familiarize yourself with the framework.

    #target 'indesign'

    // IdExtenso entry point.
    // ---
    #include 'path/to/$$.jsxinc'

    // ---
    // Additional includes are possible here.
    // e.g: #include 'path/to/etc/Yalt.jsxlib'
    // ---

    // Load the framework.
    // ---
    $$.load('TRACE');

    // Your script goes here.
    // ======================
    try
    {
	    $$.Log.chrono().trace("Processing some huge JSON task...");
	    var json = $$.JSON(app.properties.activeDocument,1);

	    $$.Log.trace(__("JSON done in %1 ms.",+$$.Log.chrono));
	
	    alert( "The result should show up in a temporary file..." );
	    $$.File.temp(json,'tmp',1/*SHOW*/);
    }
    catch(e)
    {
	    $$.receiveError(e);
    }
    // ======================

    // Unload the framework.
    // ---
    $$.unload();

> _Note._ — The global identifier `$$` refers to ***IdExtenso***'s root object. You can reach all public functions and members —including those available in the installed modules— from that identifier. For example, use `$$.File.writeUTF8()` to invoke the `writeUTF8` method of the **File** module.

Other [ready-to-use scripts](tests) are available in the `/tests` directory.
