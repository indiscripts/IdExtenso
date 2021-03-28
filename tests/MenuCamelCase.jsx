// =============================================================================
// MenuCamelCase [210328]
// Simple implementation of Type > Change Case > CamelCase
// ---
// The targetengine directive can be commented for testing/debugging.
// It is not mandatory in this particular example because the action
// event handler is the present File itself -- which is persistent!
// However, adding a persistent engine when deploying the script is
// useful, and recommended, to prevent the handler from entering the
// `onEngine()` block again and again, which makes it much faster.
// =============================================================================
#targetengine 'CamelCase'

#include '../$$.jsxinc'

#include '../etc/$$.Dom.Menu.jsxlib'

;$$.hasOwnProperty('CamelCase') || eval(__(MODULE, $$, 'CamelCase', 210328, 'onRunning'))

[PRIVATE]
({
	CAML: function(  tx,a)
	//----------------------------------
	// Implements the CamelCase routine.
	{
		if( !(tx=callee.TEXT) ) return;
		a = tx.contents.split(/[ _-]+/g);
		for( i=a.length ; i-- ; a[i]=a[i].charAt(0).toUpperCase() + a[i].slice(1).toLowerCase() );
		tx.contents = a.join('');
	}
	.setup
	({
		TEXT: false, // expecting a Text object.
	}),
})

[PUBLIC]
({
	UniqueLabel: 'MyCamelCaseUID',
	OkAction:    false,

	onEngine: function onEngine_(  refs,m,ok,msg)
	//----------------------------------
	{
		refs = [];

		// Main > Type > Change Case > <lastMenuItem>
		( m = $$.Dom.Menu.getMenuItem([0,'','$ID/CCase Cmd', -1]) )
		? $$.trace(__("%1 > Primary reference menu successfully identified.", callee.µ))
		: $$.warn( __("%1 > Cannot identify the primary reference menu.", callee.µ));
		m && refs.push({ ref:m, pos:'after' });

		// RightClickText > Change Case > <lastMenuItem>
		( m = $$.Dom.Menu.getMenuItem(['$ID/RtMouseText', '$ID/CCase Cmd', -1]) )
		? $$.trace(__("%1 > Contextual menu successfully identified.", callee.µ))
		: $$.warn( __("%1 > Cannot identify the contextual menu.", callee.µ));
		m && refs.push({ ref:m, pos:'after' });
		
		ok = refs.length && $$.Dom.Menu.setAction
		(
			__("CamelCase"),                                // title (could be localized thru Yalt)
			refs,                                           // more menu refs could be added to this array
			{
				events:  'beforeDisplay_onInvoke',          // managed events
				label:   this.UniqueLabel,                  // default would have been the title
				handler: File($$.Env.runningScript),        // would be the default handler if not explicitly set
			}
		);
		
		if( !ok )
		{
			msg = __("%1 > Couldn't install the menu action.", callee.µ);
			(+$$.warn) ? $$.warn(msg) : $$.failure(msg);
			this.OkAction = false;
			return;
		}
		
		if( !this.OkAction )
		{
			msg = __("%1 > Action successfully installed.", callee.µ);
			(+$$.trace) ? $$.trace(msg) : $$.success(msg);

			this.OkAction = true;
		}
	},

	onRunning: function onRunning_(  µ,ev,tg,sel,tx,canRun,F)
	//----------------------------------
	{
		µ = callee.µ;                                       // more agnostic than `this`
		if( !µ.OkAction ) return;                           // failure already notified

		ev = $$.globalEvent();
		if( !ev )                                           // re-executed from the scripts panel
		{
			// Here you could implement a yes/no dialog
			// with the option to uninstall the action etc.
			return;
		}

		tg = ev.target;
		if( (!tg.isValid) || µ.UniqueLabel !== tg.properties.label )
		{
			// This shouldn't happen, unless crazy event
			// managers have been installed in parallel...
			$$.warn(__("%1 > Invalid or foreign event target!"));
			return;
		}

		// Checkpoint. Make sure this part runs *fast*
		// to minimize latency on `beforeDisplay`.
		sel = app.properties.selection||0;
		sel = 1===sel.length && sel[0];

		canRun = sel.isValid && sel.hasOwnProperty('texts')
		&& 0 < (tx=sel.texts[0]).contents.length;

		switch( ev.eventType )
		{
			case 'beforeDisplay':
				// Enable/disable the menu action according to the context.
				tg.enabled = !!canRun;
				break;

			case 'onInvoke':
				if( canRun )
				{
					// Make the command undo-able.
					// The way we pass the Text paramater to ~.CAML allows
					// us to send a pure function to `app.doScript`, without
					// literal arguments. The present script would then support
					// JsxBlind obfuscation (in JSXBIN mode.)
					(F = µ['~'].CAML).TEXT = tx;
					app.doScript(F, void 0, void 0, +UndoModes.ENTIRE_SCRIPT, tg.name);
				}
				break;

			default:;
		}
	},
});


$$.load(0);
try{ $$.CamelCase() }
catch(e){ $$.receiveError(e) }
$$.unload();