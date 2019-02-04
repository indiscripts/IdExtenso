## Dev Tools

### Overview

The `/tools` subdir is not part of ***IdExtenso***'s core distribution. It offers to developers additional gems and scripts that make coding more productive.

From this location, any `.jsx` script can include the core framework using `#include '../$$.jsxinc`. As usual, extra modules—which always belong to `/etc`—may be selectively added using `#include '../etc/<ModuleName>.jsxlib`.

### List of Tools

##### [`GetMD5.jsx`](GetMD5.jsx)

Compute and prompt the MD5 hash of the input string. (Based on `etc/$$.MD5.jsxlib`.)

##### [`JsxBlindLib.jsxinc`](JsxBlindLib.jsxinc)

***JsxBlind 2.1 Library*** for ExtendScript Toolkit. A full, smart, and fast `jsxbin` obfuscator.

  - Version 2.1 (4 Feb, 2019) fixes two critical bugs regarding reserved words.

##### [`SelToPng.jsx`](SelToPng.jsx)

![SelToPng anim](SelToPng.gif)

Convert the current selection (`PageItem`, `Group` etc.) into a serialized PNG string and show the result in a dialog. You can then copy-paste the PNG string and use it to build a ScriptUI image straight in your code without the need of deploying a file.
