// =============================================================================
// BasicScriptMenuDemo [210409][210610]
// ---
// The targetengine directive can be commented for testing/debugging.
// It is not mandatory in this particular example because the action
// event handler is the present File itself -- which is persistent!
// However, adding a persistent engine when deploying the script is
// useful, and recommended, to prevent the handler from entering the
// `onEngine()` block again and again, which makes it much faster.
// =============================================================================
#targetengine 'PathNodesMenu'

#include '../$$.jsxinc'

#include '../etc/$$.BasicScriptMenu.jsxlib'

;if( $$.isBooting() )
{
	$$.BasicScript.init
	(
		// Settings.
		//----------------------------------
		{
			_$SUID: "662b7c0f0a7a47461705850b0226395f",
			_$NAME: "PathNodes",
			_$VSTR: "1.1",
			_$COPY: "- Powered by BasicScript",
			// ---
			'RESET' :
			{
				canRunSel:  0,       // whether the sel is OK.
				useMenu:    1,       // whether the menu must be used
			},
			'SESSION': // Session-persistent settings.
			{
				scope:      0,       // 0:selection ; 1:spread
				autoRunSel: false,   // whether the script autoruns on sel.
			},
			'APP':     // App-persistent settings.
			{
				radius:     5,       // radius (in pt)
				stroke:     0,       // stroke weight (in pt)
			}
		}
	,
		// Yalt Package.
		//----------------------------------
		'''
			<YALT> # FRENCH # GERMAN # SPANISH

			Scope # Portée # Bereich # Ámbito
			Selection # Sélection # Auswahl # Selección
			Spread # Planche # Druckbogen # Pliego

			Radius # Rayon # Radius # Radio
			Stroke Weight # Contour # Konturstärke # Grosor de trazo

			Autorun on Selection # Exécution auto. sur sélection # Automatische Ausführung auf der Auswahl # Ejecución automática en la selección
			Paths Menu # Menu Tracés # Pfade-Menü # Menú Trazados
			Path Nodes... # Points du tracé... # Pfadpunkte... # Puntos de trazado...
			
			</YALT>
		'''
	,
		// XML Dialog.
		//----------------------------------
		<Dialog>
		<DCOL>
			<DROP key="scope"         selectedIndex="0" caption="Scope"  list="Selection|Spread" />
			<MEBX key="radius"        value="5"         caption="Radius" min="0.25" max="20" small="0.25" large="1" />
			<MEBX key="stroke"        value="1"         caption="Stroke Weight" min="0" max="4" small="0.25" large="1" />
			<CBOX key="autoRunSel"    checked="false"   caption="Autorun on Selection" />
			<CBOX key="useMenu"       checked="true"    caption="Paths Menu" />
		</DCOL>
		</Dialog>
	)

	// Menu Extension.
	//----------------------------------
	;($.global.µ=$$.BasicScript['MenuExtension'])
	[PUBLIC]
	({
		MenuSettings:
		{
		title:          "Path Nodes...",
		localizeTitle:  1,
		paths:          [ [0,'$ID/&Object', '$ID/Paths Menu', '$ID/mJoin', 'before'] ],
		startup:        1,
		},
		
		beforeDisplay: function(rm,PM)
		//----------------------------------
		// => true | false
		{
			return !!PM.Context.checkSelection();
		},
	})

	// Context API & hooks.
	//----------------------------------
	;($.global.µ=$$.BasicScript['Context'])
	[PUBLIC]
	({
		checkItem: function(/*DOM*/item)
		{
			return item.hasOwnProperty('paths');
		},

		checkSelection: function(  a,i,r)
		{
			a = app.properties.selection;
			if( !a || !(i=a.length) ) return false;
			while( i-- ) if( r=this.checkItem(a[i]) ) break;
			return r;
		},

		onActive: function(/*settings&*/ss)
		{
			ss.canRunSel = this.checkSelection();
			ss.useMenu = !!$$.BasicScript.MenuExtension.installed();
			if( ss.canRunSel && ss.autoRunSel )
			{
				return true; // Skip the UI.
			}
		},
		
		onQuit: function(/*bool*/backup,/*settings*/ss)
		{
			if( ss.endMessage ) $$.success(ss.endMessage);
		},
	})

	// UserInterface API & hooks.
	// ---
	;($.global.µ=$$.BasicScript['UserInterface'])
	[PUBLIC]
	({
		onClose: function(/*bool*/ok,/*DOMDialog*/dlg,/*settings&*/ss)
		{
			if( !ok )
			{
				return false; // No backup.
			}
			if( !ss.useMenu )
			{
				$$.BasicScript.MenuExtension.uninstall();
			}
			if( !app.properties.activeDocument )
			{
				return true; // Skip the server.
			}
			if( 0===ss.scope && !ss.canRunSel )
			{
				ss.hasSelection && (ss.endMessage = __("Invalid selection."));
				return true; // Skip the server.
			}
		},
	})

	// Server API & hooks.
	// ---
	;($.global.µ=$$.BasicScript['Server'])
	[PUBLIC]
	({
		hotProcess: function(/*SplineItems[]&*/items,/*Spread*/spd,/*settings*/ss,  tpl,t,xy)
		{
			// Create a template circle at [0,0] (ruler space.)
			// ---
			t = ss.radius+'pt';
			tpl = spd.ovals.add({
				fillColor:    0 < ss.stroke ? "Paper" : "Black",
				strokeWeight: ss.stroke,
				strokeColor:  0 < ss.stroke ? "Black" : "None",
				geometricBounds: ['-'+t,'-'+t,t,t],
				});

			while( t=items.pop() )
			{
				// Flat array of all pathpoints coordinates.
				// t[i] :: [x,y] | [[lx,ly],[x,y],[rx,ry]]
				// ---
				t = [].concat.apply([],t.paths.everyItem().entirePath);

				// Duplicate the template at each point.
				// ---
				while( xy=t.pop() )
				{
					'number' == typeof xy[0] || (xy=xy[1]);
					tpl.duplicate(void 0, xy);
				}
			}

			// Remove the template.
			// ---
			tpl.remove();
		},

		run: function(/*settings&*/ss,  t,a,i)
		{
			while( 1 )
			{
				a = 0;
				t = app.properties.activeWindow;
				t = t && t.isValid && t.properties.activeSpread;
				if( !t.isValid )
				{
					ss.endMessage = __("Unable to access the active spread.");
					break;
				}

				if( 1==ss.scope )
				{
					a = t.pageItems;
					a = a.length && a.everyItem().getElements();
				}
				else
				{
					a = app.properties.selection;
				}

				for( i=a&&a.length ; i-- ; )
				{
					$$.BasicScript.Context.checkItem(a[i])
					|| a.splice(i,1);
				}
				break;
			}

			if( !a || !(a.length) )
			{
				ss.endMessage = __("No valid target.");
				return;
			}
			
			app.scriptPreferences.enableRedraw = false;
			this.hotProcess(a,t,ss);
			app.scriptPreferences.enableRedraw = true;
			
			app.select(null);
		}
	})
}

if( 'main' == $.engineName )
{
	// Debug mode.
	// -2=RESET+TRACE  ;  -1=TRACE  ;  0=MUTE  ;  +1=WARN.
	// ---
	$$.BasicScript();
}
else
{
	// Release mode.
	// ---
	app.doScript('$$.BasicScript()', +ScriptLanguage.javascript, void 0, +UndoModes.entireScript, $.engineName);
}