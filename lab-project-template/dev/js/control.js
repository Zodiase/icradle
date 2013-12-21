function theControl(body, console) {
	var model = null,
		view = null;
	var events = Array();
	function listenEvent (eventName, responder) {
		events[eventName] = responder;
	}
	function triggerEvent (eventName, args) {
		var responder = events[eventName];
		if (typeof responder === 'undefined') {
			console.warn('No listener for event: ' + eventName);
		} else {
			responder.apply(args);
		}
	}
	
	function onLoad() {
		
	}
	function onDisplay() {
		view.wrapper.show();
		view.navigatorFrame.show();
		view.control.show();
	}
	
	var api = {
		setup : function (callback, feedback) {
			feedback('setting event listeners');
			listenEvent ('loaded', onLoad);
			listenEvent ('displayed', onDisplay);
			
			// do not remove this line
			if (typeof callback === 'function') callback();
		},
		connectModel : function (_model) {
			model = _model;
		},
		connectView : function (_view) {
			view = _view;
		},
		triggerEvent : function (eventName, args) {
			triggerEvent (eventName, args);
		}
	};
	return api;
}