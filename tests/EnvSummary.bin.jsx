// IdExtenso wants to run in INDD.
// ---
#target 'indesign'

// Path to IdExtenso entry point.
// ---
#include '../$$.jsxinc'

// Below is the JSXBIN-compiled version of EnvSummary.jsx without its
// #target and #include directives. This illustrates an important
// distinction b/w the MAIN SCRIPT (i.e, the present JSX file) and
// the RUNNING STREAM (i.e, the BIN code embedded in `eval`).
// As `$$.Env.summary()` is invoked from within the BIN stream,
// it will both identify the MAIN SCRIPT as:
//        Script (JSX):    EnvSummary.bin.jsx [<location>]
// and the RUNNING STREAM as
//        Running Code:    Inner BIN Stream [<number>]
// ---
eval("@JSXBIN@ES@2.0@MyBbyBn0ADJJnAEXzEjMjPjBjEBfjzChEhECfRBFdyBffgUbyBn0AEOgbbygfn0ABJgfnABXzHjWjFjSjTjJjPjODfXzRjTjDjSjJjQjUiQjSjFjGjFjSjFjOjDjFjTEfjzDjBjQjQFfneDhYhOhQfAEXzKjEjPjNiWjFjSjTjJjPjOGfjCfRBFdJffnOhCbyhGn0ABJhGnABXzPjNjFjBjTjVjSjFjNjFjOjUiVjOjJjUHfXEfjFfXzFiQiJiDiBiTIfjzQiNjFjBjTjVjSjFjNjFjOjUiVjOjJjUjTJfnfAEXGfjCfRBFdHffnJhMnASzJjTjFjQjBjSjBjUjPjSKyBCzBhLLXzHjOjFjXiMjJjOjFMfjCfXzGjTjQjBjDjFjTNfXzDiMjPjHOfjCfnnnftJhNnAEXzFjUjSjBjDjFPfjCfRBEjzCififQfRCFehEiFjOjWiTjVjNjNjBjSjZhAhIjBjGjUjFjShAjTjPjNjFhAjDjIjBjOjHjFjThJhAhehAhFhRCLVKfyBEXzDiFjOjWRfjCfRBVKfyBffnnffffABnzBjFSnbyBn0ABJhWnAEXzMjSjFjDjFjJjWjFiFjSjSjPjSTfjCfRBjSfffJhenAEXzGjVjOjMjPjBjEUfjCfnfABK40BiAABAzAVByB");