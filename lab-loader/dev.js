//-- code clip for google analytics
var _gaq = _gaq || [];
_gaq.push( [ '_setAccount', 'UA-34856732-1' ] );
_gaq.push( [ '_setDomainName', 'icradle.net' ] );
_gaq.push( [ '_trackPageview' ] );

( function() {
var ga = document.createElement( 'script' );
	ga.type = 'text/javascript';
	ga.async = true;
	ga.src = ( 'https:' == document.location.protocol ? 'https://ssl' : 'http://www' )
	+ '.google-analytics.com/ga.js';
var s = document.getElementsByTagName('script')[0];
	s.parentNode.insertBefore(ga, s);
} )();
// code clip for google analytics --//

( function(window, document, console, undefined) {
	$( function() {
		//-- helper functions
		// this function generates unique name strings by adding a prefix
		var _u = UNIQIT_GEN( 'xhll_' ); // xhll = xh lab loader
		// this function generates functions for creating DOM objects
		var $ELE = function( tagName ) {
			return function() {
				return $( '<' + escape( tagName ) + '>' );
			};
		};
		var $DIV   = $ELE( 'DIV' ),
			$IMG   = $ELE( 'IMG' ),
			$LABEL = $ELE( 'LABEL' ),
			$P     = $ELE( 'P' );
		// helper functions --//

		// framework
		var framework = {
			version : '0.2.2.6',
			// console
			console: {
				$container : $DIV()
					.addClass( _u( 'logCTNR', 'fixFullWindow' ) )
				,
				log_base : function( msg, className, css ) {
					var newLog = $P().text( msg );
					if ( className != undefined )
						newLog.attr( 'class', className );
					if ( css != undefined )
						newLog.css( css );
					newLog.appendTo( framework.console.$container );
				},
				log : function( msg ) {
					framework.console.log_base( msg, 'log' );
					console.log( msg );
				},
				warn : function( msg ) {
					framework.console.log_base( msg, 'warn' );
					console.warn( msg );
				}
			},
			// off-document container
			unreal : {
				$container : $DIV()
					.addClass( _u( 'ofdCTNR', 'fixFullWindow' ) )
			},
			// hidden container
			hidden : {
				$container : $DIV()
					.addClass( _u( 'hidCTNR' ) )
			},
			// background container
			background : {
				$container : $DIV()
					.addClass( _u( 'bkgCTNR', 'fixFullWindow' ) )
					.hide()
			},
			// body container
			body : {
				$container : $DIV()
					.addClass( _u( 'bdyCTNR', 'fixFullWindow' ) )
					.hide()
			},
			// cover container
			cover : {
				$container : $DIV()
					.addClass( _u( 'cvrCTNR', 'fixFullWindow' ) )
					.hide()
				,
				logo : {
					$container : $DIV()
						.addClass( _u( 'cvr_logo' ) )
						.hide()
					,
					$img : $IMG()
						.addClass( _u( 'cvr_logo_img' ) )
						.hide()
					,
					$label : $LABEL()
						.addClass( _u( 'cvr_logo_label' ) )
						.hide()
				}, // logo
				statusBar : {
					$container : $DIV()
						.addClass( _u( 'cvr_statusbar' ) )
						.hide()
					,
					$text : $LABEL()
						.addClass( _u( 'cvr_statusbar_label' ) )
						.hide()
					,
					$dots : [
						$LABEL()
							.addClass( _u( 'cvr_statusbar_label' ) )
							.hide()
							.text('.')
						,
						$LABEL()
							.addClass( _u( 'cvr_statusbar_label' ) )
							.hide()
							.text('.')
						,
						$LABEL()
							.addClass( _u( 'cvr_statusbar_label' ) )
							.hide()
							.text('.')
					]
				} // statusBar
			} // cover
		}; // framework

		// application
		var app = {
			// MVC - model
			model : null,
			// MVC - view
			view : null,
			// MVC - control
			control: null
		};

		/**
		 * main function
		 * this function does the following in order
		 * 1. setup the visual interface (DOM structure)
		 * 2. initialize the processing model (LC-3 object)
		 * 3. bind visual object with processing model
		 */
		var mainQueue = PQUEUE( null, [
			function config( queue, heap ) {
				// debug options
				heap.skip_animation = false;
			},
			function framework_setup( queue, heap ) {
				/* build structure */
				$( document.body ).append(
					framework.console.$container,
					framework.hidden.$container,
					framework.background.$container,
					framework.body.$container,
					framework.cover.$container.append(
						framework.cover.logo.$container.append(
							framework.cover.logo.$img,
							framework.cover.logo.$label
						),
						framework.cover.statusBar.$container.append(
							framework.cover.statusBar.$text,
							framework.cover.statusBar.$dots[ 0 ],
							framework.cover.statusBar.$dots[ 1 ],
							framework.cover.statusBar.$dots[ 2 ]
						)
					)
				);
				/* create private apis */
				framework.cover.statusBar.$dots.jump = function() {
					framework.cover.statusBar.$dots[ 0 ]
						.delay( 300 )
						.animate( {
							top: '-12px'
						}, 200 )
						.animate( {
							top: '0'
						}, 150 );
					framework.cover.statusBar.$dots[ 1 ]
						.delay( 400 )
						.animate( {
							top: '-12px'
						}, 200 )
						.animate( {
							top: '0'
						}, 150 );
					framework.cover.statusBar.$dots[ 2 ]
						.delay( 500 )
						.animate( {
							top: '-12px'
						}, 200 )
						.animate( {
							top: '0'
						}, 150 );
				};
				/* framework apis */
				framework.loadingDotsJumpTimer = null;
				framework.makeLoadingDotsJump = function() {
					framework.loadingDotsJumpTimer =
						window.setInterval( framework.cover.statusBar.$dots.jump, 2000 );
				};
				framework.makeLoadingDotsStop = function() {
					window.clearInterval( framework.loadingDotsJumpTimer );
				};
				
				framework.console.log( 'iCradle Laboratory Loader version: ' + framework.version );
			},
			function framework_fadeInBackground( queue, heap ) {
				if ( heap.skip_animation === true ) {
					framework.background.$container.show();
				} else {
					queue.pause();
					framework.background.$container.fadeIn( 300, queue.resume );
				}
			},
			function framework_showCover( queue, heap ) {
				if ( heap.skip_animation === true ) {
					framework.cover.$container.show();
				} else {
					queue.pause();
					framework.cover.$container.fadeIn( 300, queue.resume );
				}
			},
			function framework_loadSiteImageLogo( queue, heap ) {
				queue.pause();
				queue.pc.goto( queue.pc.locate( 'framework_showSiteImageLogo' ) );
				framework.cover.logo.$img
					.error( function () {
						framework.console.warn( 'logo failed to load' );
						queue.pc.goto( queue.pc.locate( 'framework_showSiteTextLogo' ) );
						queue.resume();
					} )
					.load( queue.resume )
					.attr( 'src', './img/' + _u( 'logo' ) + '.png' );
			},
			PQUEUE_BARRIER,
			function framework_showSiteImageLogo( queue, heap ) {
				queue.pc.goto( queue.pc.locate( 'framework_adjustSiteLogo' ) );
				framework.cover.logo.$img.show();
			},
			PQUEUE_BARRIER,
			function framework_showSiteTextLogo( queue, heap ) {
				queue.pc.goto( queue.pc.locate( 'framework_adjustSiteLogo' ) );
				framework.cover.logo.$label.text('hello world');
				framework.cover.logo.$label.show();
			},
			PQUEUE_BARRIER,
			function framework_adjustSiteLogo( queue, heap ) {
				var logo_css = {
					height: '124px',
					marginTop: '-62px'
				};
				if ( heap.skip_animation === true ) {
					framework.cover.css( logo_css );
				} else {
					queue.pause();
					framework.cover.logo.$container
						.fadeIn( 300 )
						.delay( 1000 )
						.animate( logo_css, 300, queue.resume );
				}
			},
			PQUEUE_HALT,
			function framework_showStatusBar( queue, heap ) {
				framework.cover.statusBar.$text.text( 'starting' ).show();
				framework.cover.statusBar.$dots[ 0 ].show();
				framework.cover.statusBar.$dots[ 1 ].show();
				framework.cover.statusBar.$dots[ 2 ].show();
				framework.cover.statusBar.$container.fadeIn( 300 );
			},
			function framework_makeLoadingDotsJump( queue, heap ) {
				framework.makeLoadingDotsJump();
			},
			function loadModel( queue, heap ) {
				if ( typeof theModel !== 'function' ) {
					framework.console.warn( 'Unable to load model: theModel undefined.' );
				} else {
					app.model = theModel( framework );
					heap.model_setup_feedback = function( message ) {
						framework.cover.statusBar.$text.text( 'loading model: ' + message );
					};
					queue.pause();
					app.model.setup( queue.resume, heap.model_setup_feedback );
				}
			},
			function loadView( queue, heap ) {
				if ( typeof theView !== 'function' ) {
					framework.console.warn( 'Unable to load view: theView undefined.' );
				} else {
					app.view = theView( framework );
					heap.view_setup_feedback = function( message ) {
						framework.cover.statusBar.$text.text( 'loading view: ' + message );
					};
					queue.pause();
					app.view.setup( queue.resume, heap.view_setup_feedback );
				}
			},
			function loadControl( queue, heap ) {
				if ( typeof theControl !== 'function' ) {
					framework.console.warn('Unable to load control: theControl undefined.');
				} else {
					app.control = theControl( framework );
					heap.control_setup_feedback = function( message ) {
						framework.cover.statusBar.$text.text( 'loading control: ' + message );
					};
					queue.pause();
					app.control.setup( queue.resume, heap.control_setup_feedback );
				}
			},
			function connectMVC( queue, heap ) {
				if ( typeof app.control === 'undefined' ) {
					heap.connectMVC_error = 'Critical error: missing control.';
					framework.console.warn( heap.connectMVC_error );
				} else {
					queue.pc.goto( queue.pc.locate( 'initializeApplication' ) );
					framework.cover.statusBar.$text.text( 'finalizing setup' );
					if (typeof app.model != 'undefined')
						app.control.connectModel( app.model );
					if ( typeof heap.view != 'undefined' )
						app.control.connectView( app.view );
				}
			},
			function connectMVC_displayError( queue, heap ) {
				queue.pause();
				alert( heap.connectMVC_error );
			},
			PQUEUE_BARRIER,
			function initializeApplication( queue, heap ) {
				framework.cover.statusBar.$text.text( 'initializing application' );
				app.control.triggerEvent( 'loaded' );
			},
			function framework_showBody( queue, heap ) {
				framework.body.$container.show();
			},
			function framework_makeLoadingDotsStop( queue, heap ) {
				framework.makeLoadingDotsStop();
			},
			function framework_hideStatusBar( queue, heap ) {
				framework.cover.statusBar.$text.text( '' ).hide();
				framework.cover.statusBar.$dots[ 0 ].hide();
				framework.cover.statusBar.$dots[ 1 ].hide();
				framework.cover.statusBar.$dots[ 2 ].hide();
				framework.cover.statusBar.$container.hide();
			},
			function framework_hideCover( queue, heap ) {
				if ( heap.skip_animation === true ) {
					framework.cover.$container.hide();
				} else {
					queue.pause();
					framework.cover.$container.fadeOut( 300, queue.resume );
				}
			},
			function startApplication( queue, heap ) {
				app.control.triggerEvent( 'displayed' );
			},
			PQUEUE_HALT
		], 0, 'main' ).boot();
	});
} )( window, window.document, console );