/**
 * iNotiC ver 1.0 archived
 *
 * DESCR:
 *     The iNotiC function is a factory function that creates a note manager when called.
 *     The manager itself is a logic hidden private, with only the public methods being returned.
 * PARAM:
 *     $parent: a jQuery object of the element will be containing the note stack element
 *     insertAnimation: a function used to animate note elements for insertion
 *     removeAnimation: a function used to animate note elements for removal
 */
function iNotiC( $parent, insertAnimation, removeAnimation ) {
	/**
	 * define frame element
	 * this element contains all the notification elements
	 */
	var $noteList = $( '<ul class="iNotiC_stack">' ).appendTo( $parent );
	/**
	 * check animation functions
	 * if not (correctly) defined, use default functions
	 */
	if ( typeof insertAnimation !== 'function' ) {
		// using default function
		insertAnimation = function ( $noteElement, callback ) {
			$noteElement.animate( {
				// shift in from right
				marginLeft: '0%'
			}, 300, callback );
		};
	}
	if ( typeof removeAnimation !== 'function' ) {
		// using default function
		removeAnimation = function ( $noteElement, callback ) {
			$noteElement.animate( {
				// shift out towards right
				marginLeft: '100%'
			}, 300 ).animate( {
				// collapse
				padding: '0',
				height: '0'
			}, 100, callback );
		};
	}
	
	/**
	 * this function is used to create a new notification and return its public methods.
	 */
	var appendNote = function ( msg, auxClass, duration ) {
		var theNewNote = {
			$noteFrame: $( '<li class="iNotiC_msg">' ),
			$noteContent: $( '<p>' ).text( msg ),
			// a flag indicating if this note is NOT closing
			active: true,
			// method to close this note
			close: function () {
				// if the note is NOT closing
				if ( theNewNote.active ) {
					// set the flag to indicate this note IS closing
					theNewNote.active = false;
					
					// if a timer is defined previously, clear it
					if ( typeof theNewNote.timer != 'undefined' )
						window.clearTimeout( theNewNote.timer );
					
					// call the remove animation function
					removeAnimation.call( theNewNote.$noteFrame, theNewNote.$noteFrame, function () {
						theNewNote.$noteFrame.remove();
					} );
				}
			},
			text: function ( string ) {
				return theNewNote.$noteContent.text( string );
			}
		};
		
		theNewNote.$noteFrame.append( theNewNote.$noteContent ) // append the content element
		                     .addClass( auxClass )              // add class
		                     .click( theNewNote.close )         // define click behavior
		                     .appendTo( $noteList );            // append to context

		// call the insert animation function
		insertAnimation.call( theNewNote.$noteFrame, theNewNote.$noteFrame, function () {
			if ( typeof duration === 'number' && duration > 0 ) {
				// set timer to auto close the note
				theNewNote.timer = window.setTimeout( theNewNote.close, duration );
			}
		} );
		
		// return public methods of the note
		return {
			close: theNewNote.close,
			text: theNewNote.text
		};
	};
	
	// return public methods of the note manager
	return {
		log:
			/**
			 * this function is only a publicly accessible macro
			 * calling the appendNote with 'no auxiliary class'
			 */
			function ( msg, duration ) {
				// return the Note object so the caller can access it
				return appendNote( msg, false, duration );
			}
		,
		warn:
			/**
			 * this function is only a publicly accessible macro
			 * calling the appendNote with the specific auxiliary class 'iNotiC_warn'
			 * (user can use this className to specify style for warning notes)
			 * and duration -1 (means the note won't auto close)
			 */
			function ( msg ) {
				// return the Note object so the caller can access it
				return appendNote( msg, 'iNotiC_warn', -1 );
			}
	};
}