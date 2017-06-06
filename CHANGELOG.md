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
