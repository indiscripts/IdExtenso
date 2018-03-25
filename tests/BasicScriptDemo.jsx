// =============================================================================
// BasicScriptDemo [180325]
// Manage a script ("PathNodes") that creates custom
// circles at each path point of target item(s.)
// ---
// Demonstrates:
// - Use of the BasicScript module (settings/localization/UI.)
// - Yalt package in four languages (EN + FR DE ES.)
// - Settings with various lifespans (RESET, SESSION, APP.)
// =============================================================================

#targetengine "PathNodes"
#include '../$$.jsxinc'
#include '../etc/$$.BasicScript.jsxlib'

;if( $$.isBooting() )
{
	$$.BasicScript.init
	(
		// Settings.
		//----------------------------------
		{
			_$SUID: "662b7c0f0a7a47461705850b0226395f",
			_$NAME: "PathNodes",
			_$VSTR: "1.0",
			_$COPY: "- Powered by BasicScript",
			// ---
			'RESET' :
			{
				canRunSel:  0,       // whether the sel is OK.
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

			</YALT>
		'''
	,
		// XML Dialog.
		//----------------------------------
		<Dialog>
		<DCOL>
			<DROP key="scope"       selectedIndex="0" caption="Scope"  list="Selection|Spread" />
			<MEBX key="radius"      value="5"         caption="Radius" min="0.25" max="20" small="0.25" large="1" />
			<MEBX key="stroke"      value="1"         caption="Stroke Weight" min="0" max="4" small="0.25" large="1" />
			<CBOX key="autoRunSel"  checked="false"   caption="Autorun on Selection" />
		</DCOL>
		</Dialog>
	)

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
		onClose: function(/*bool*/ok,/*Dialog*/dlg,/*settings&*/ss)
		{
			if( !ok )
			{
				return false; // No backup.
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

$$.BasicScript();