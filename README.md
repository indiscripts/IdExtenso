# *IdExtenso*  [alpha]
------------

*ExtendScript Framework for InDesign Ninjas.*

### Overview

***IdExtenso*** is a work-in-progress API dedicated to ExtendScript developers looking for a robust solution in the particular field of InDesign scripting. Think of it as a toolbox based on efficient and growing building blocks.

Do you need a clean JSON formatter that *really* supports ExtendScript oddities and InDesign DOM objects? Would you like to trace debug messages in a log file the easy way? And always making sure that the environment (operating system, InDesign version, locale, script engine) is properly addressed? ***IdExtenso*** natively provides those features as they are parts of its core structure.

The framework is designed to support ExtendScript from version `3.92` to `4.5` and InDesign from `v.6.0` (CS4) to `12.x` (CC 2017) in both Mac OS and Windows platforms. It fixes, improves or extends a number of built-in functionalities. For example, `myString.toSource()` can now save 30% of the original result length, and `RegExp.prototype["=="]` is now implemented so that you can compare regexes using `==`.

### What *IdExtenso* Is Not

Anyway, ***IdExtenso*** is definitely not a “syntactic sugar” provider. Its main purpose is to deal with ExtendScript—which is not just JavaScript—and to make InDesign easier to automate. In fact, care has been taken to limit the addition of pure JS helpers that one could easily find in other well-known libraries.

By the way, ***IdExtenso*** does not pretend to form a *library*. Rather, it is about articulating a complete workspace! Thus, it doesn't make sense to use it in tiny projects that don't involve topics like localization, performance, user interface, modularity, compatibility, code-factoring, robustness, settings management, etc.

### Key Points

- As fast and optimized as we can.

- Light-weight and very *non-polluting* regarding the `[[global]]` scope.

- Smart support of persistent engines created via `#targetengine` directives.

- Still works fine in a `JSXBIN` export of your final project.

- Fixes (at best as possible) compatibility issues between ExtenScript and/or InDesign DOM versions.

- Various—and always growing—additional modules that you can plug at wish through `#include`. Among the available modules of the `/etc` branch: **Yalt** (localization engine), **Web** (HTTP/1.0 getter), **Settings** (multiscope settings manager), **MD5**, **DateFormat**, and more coming soon!

### Getting Started

> *Warning*. — Use a true EDI ([SublimeText](https://www.sublimetext.com), [UltraEdit](http://www.ultraedit.com), etc.) rather than “ExtendScript ToolKit”, which is not suitable for ***IdExtenso*** at all!

1. Download the latest distribution of ***IdExtenso*** (ZIP file) and unzip the whole structure at a location available to the `Scripts Panel` folder. You must have at least `$$.jsxinc` (the entry point) and the `/core` subfolder (`/etc` contains optional modules, but there are great too!)


2. Either create a sample script (`myTest.jsx`) or simply open the provided one (`$$.test-json.jsx`). 

3. The script must contain the directive `#include '$$.jsxinc'` (which includes the framework), and then you have a global reference `$$` within which ***IdExtenso***'s API is fully available.

4. If relevant, include every additional module you may need—e.g. `#include etc/Web.jsxlib`—so that `$$.Web` will be added too. (All methods and properties are documented in each module.)

5. Once all includes are specified, *DO NOT FORGET* to invoke `$$.load()`.

Congratulations! You're now ready to use all ***IdExtenso*** features in your script!

Give a look at `$$.test-json.jsx` for a basic example.

###### *(To be continued. Work-in-Progress!)*
