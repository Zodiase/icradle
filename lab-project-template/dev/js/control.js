function theControl( framework ) {

	var __model = null,
		__view = null;
	var events = Array();
	function listenEvent( eventName, responder ) {
		events[ eventName ] = responder;
	}
	function triggerEvent( eventName, args ) {
		var responder = events[ eventName ];
		if ( typeof responder === 'undefined' ) {
			framework.console.warn( 'No listener for event: ' + eventName );
		} else {
			responder.apply( args );
		}
	}
	
	function onLoad() {
		
	}
	function onDisplay() {
		
	}
	
	var api = {
		setup : function( callback, feedback ) {
			// prepare fallback option for feedback function
			if ( typeof feedback !== 'function' )
				feedback = function( message ) {
					framework.console.log( message );
				};
			// do not remove anything above

			feedback( 'setting event listeners' );
			listenEvent( 'loaded', onLoad );
			listenEvent( 'displayed', onDisplay );

			//-- put your initialization code here
			
			// do not remove anything below
        	// remove setup function
            delete api.setup;
            // execute callback
            if ( typeof callback === 'function' )
            	callback();
		},
		connectModel : function( model ) {
			__model = model;
		},
		connectView : function( view ) {
			__view = view;
		},
		triggerEvent : function( eventName, args ) {
			triggerEvent( eventName, args );
		}
	};
	return api;
}