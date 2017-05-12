##### [170512]
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
