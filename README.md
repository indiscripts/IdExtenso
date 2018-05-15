# *IdExtenso*  1.80515

*ExtendScript Framework for InDesign Ninjas.*

### Overview

![Overview of IdExtenso's API](screenshot.png)

***IdExtenso*** is a work-in-progress API dedicated to ExtendScript developers looking for a robust solution in the particular field of InDesign scripting. Think of it as a toolbox based on efficient and growing building blocks.

Do you need a clean JSON formatter that *really* supports ExtendScript oddities and InDesign DOM objects? Would you like to trace your debug messages in a log file the easy way? And always making sure that the environment (operating system, InDesign version, locale, script engine) is properly addressed? ***IdExtenso*** natively provides these features as they are parts of its core structure.

The framework is designed to support ExtendScript from version `3.92` to `4.5` and InDesign from `v.6.0` (CS4) to `13.x` (CC2018) in both Mac OS and Windows platforms. It fixes, improves or extends a number of built-in functionalities. For example, `myString.toSource()` can now save 30% of the original result length, and `RegExp.prototype["=="]` is now implemented so that you can compare regexes using `==`.

### What *IdExtenso* Is Not

***IdExtenso*** is not a _“syntactic sugar”_ provider. Its main purpose is to deal with ExtendScript—which is not pure JavaScript—and to make InDesign easier to automate. Care has been taken to limit the addition of pure JS helpers easily findable in other distributions.

***IdExtenso*** does not pretend to form a *library* in the narrow sense. It is about building a complete workspace. So it wouldn't make sense to use it in small projects that don't involve features like localization, performance testing, user interface, modularity and compatibility issues, settings management, etc.

### Key Points

- As fast and optimized as we can.

- Light-weight and *non-polluting* regarding the `[[global]]` scope.

- Smart support of persistent engines created via the `#targetengine` directive.

- Still works fine in a `JSXBIN` export of your final project.

- Fixes (at best as possible) compatibility issues between ExtendScript and/or InDesign DOM versions.

- Growing number of extra modules that you can plug at wish through `#include`. Among the available modules of the `/etc` branch are: **Yalt** (localization engine), **Web** (HTTP getter), **Settings** (multiscope settings manager), **MD5**, **DateFormat**, **BigInt**, and more coming soon!

### Getting Started

> *Warning*. — Use a true EDI ([SublimeText](https://www.sublimetext.com), [UltraEdit](http://www.ultraedit.com), etc.) rather than “ExtendScript ToolKit”. ESTK is not suitable for ***IdExtenso***.

1. Download the latest distribution ([ZIP file](https://github.com/indiscripts/IdExtenso/archive/master.zip)) and unzip the whole structure at a location available to the `Scripts Panel` folder. You must have at least `$$.jsxinc` (the _“entry point”_) and the `/core` subfolder (`/etc` contains optional modules, but there are great too!)

2. Either create a sample script (e.g. `myTest.jsx`) or simply open one of those provided in [`/tests`](tests). 

3. The script must contain a directive `#include 'path/to/$$.jsxinc'` (which includes the framework.) A global reference `$$` is then available from which you can access the whole ***IdExtenso*** API.

4. If relevant, include the additional module(s) you may need—e.g. `#include etc/Web.jsxlib`—so that `$$.Web` will be added too. (All methods and properties are documented in each module.)

5. Once all includes are specified, *DO NOT FORGET* to invoke `$$.load()`.

Congratulations! You're now ready to use ***IdExtenso*** features in your script!

> *Tip*. — Use `$$.help()` at any point of your code to discover and browse the API of the included modules (including core features.) 

### Quick Example

This basic snippet illustrates how to use some core modules, namely **Log**, **JSON**, and **File**. Use it as a template to familiarize yourself with the framework.

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

> _Note._ — The global identifier `$$` refers to ***IdExtenso***'s root API. You can reach all features—including those available in the installed modules—from that identifier. For example, use `$$.File.writeUTF8()` to invoke the `writeUTF8` method of the **File** module.

Other [ready-to-use scripts](tests) are available in the `/tests` directory.
