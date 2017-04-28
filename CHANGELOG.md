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
