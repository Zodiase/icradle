function iNotiC($parent, insertAnimation, removeAnimation) {
	/**
	 * define frame element
	 * this element contains all the notification elements
	 */
	var $noteFrame = $('<ul class="iNotiC_stack">').appendTo($parent);
	/**
	 * check animation functions
	 * if not (correctly) defined, use default functions
	 */
	if (typeof insertAnimation !== 'function') {
		insertAnimation = function ($noteElement, callback) {
			$noteElement.animate({
				marginLeft: '0%'
			}, 300, callback);
		};
	}
	if (typeof removeAnimation !== 'function') {
		removeAnimation = function ($noteElement, callback) {
			$noteElement.animate({
				marginLeft: '100%'
			}, 300).animate({
				padding: '0',
				height: '0'
			}, 100, callback);
		};
	}
	
	var appendNote = function (msg, auxClass, duration) {
		var theNewNote = {
			$element: $('<li class="iNotiC_msg">').text(msg),
			active: true,
			close: function () {
				if (theNewNote.active) {
					theNewNote.active = false;
					if (typeof theNewNote.timer != 'undefined') {
						window.clearTimeout(theNewNote.timer);
					}
					removeAnimation(theNewNote.$element, function () {
						theNewNote.$element.remove();
					});
				}
			}
		};
		theNewNote.$element.addClass(auxClass)
		                   .click(theNewNote.close)
		                   .appendTo($noteFrame);
		insertAnimation(theNewNote.$element, function () {
			if (typeof duration === 'number' && duration > 0) {
				theNewNote.timer = window.setTimeout(theNewNote.close, duration);
			}
		});
		return theNewNote;
	};
	return {
		log: function (msg, duration) {
			appendNote(msg, false, duration);
		},
		warn: function (msg) {
			appendNote(msg, 'iNotiC_warn', -1);
		}
	};
}