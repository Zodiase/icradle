/*==============================================================================
	the goal of the function theModel() is to return data objects that need to
	be accessed by the controls.
	the returned object has to have a method setup() to initialize data.
==============================================================================*/

function theModel( framework ) {
	var model = {
		// put accessible objects here
		
		setup : function( callback, feedback ) {
			// prepare fallback option for feedback function
			if ( typeof feedback !== 'function' )
				feedback = function( message ) {
					framework.console.log( message );
				};
			// do not remove anything above

			//-- put your initialization code here

			// do not remove anything below
			// remove setup function
			delete model.setup;
			// execute callback
			if ( typeof callback === 'function' )
				callback();
		}
	};
	return model;
}