/**
 * History manager.  
 *
 * History manager can be used to keep track of application state.  
 * It can also be used in places where an Undo/Redo framework doesn't quite fit.  
 *
 * Can be used with Node.js or as a RequireJS module.
 *
 * @version 0.0.1
 * @author TanelTM
 */

/**
 * Usage example:
 * 		// Initialize
 * 		var history = new HistoryMan();
 *
 * 		// Add some data
 * 		history.add({"route": "#downloads/1"});
 * 		history.add({"route": "#downloads/2"});
 * 		history.add({"route": "#downloads/3"});
 * 		history.add({"route": "#downloads/4"});
 *
 * 		// Undo
 * 		var state = history.getPrevState();
 * 		console.log(state); // > {"route": "#downloads/3"}
 *
 * 		// Redo
 * 		var state = history.getPrevState();
 * 		console.log(state); // > {"route": "#downloads/4"}
 *
 * 		// Get specific state
 * 		var state = history.getStateAt(1);
 * 		console.log(state); // > {"route": "#downloads/2"}
 *
 * 		// Adding a state when the pointer does not point to the last state
 * 		// There are currently 4 routes in history.
 * 		// The pointer points to the second route: {"route": "#downloads/2"}
 * 		history.add({"route": "#about"});
 *
 * 		// Now the history contains 3 routes in history:
 * 		// "#downloads/1", "#downloads/2" and "#about"
 * 		
 * Public functions:
 * 		add(state)
 * 		getStateAt(pointer)
 * 		getCurrentState()
 * 		getPrevState()
 * 		getNextState()
 * 		getPointer()
 * 		clear()
 * 		clear(pointer)
 */

(function(root, factory) {
	if (typeof exports === 'object') {
		// Node. Does not work with strict CommonJS, but
		// only CommonJS-like enviroments that support module.exports,
		// like Node.
		module.exports = factory();
	} else if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(factory);
	} else {
		// Browser globals (root is window)
		root.returnExports = factory();
	}
}(this, function() {
	return function() {
		var stack   = [];
		var pointer = -1;

		this.getStateAt = function(pt) {
			if (pt >= stack.length) {
				return null;
			} else {
				pointer = pt;
				return stack[pt];
			}
		};

		this.getCurrentState = function() {
			return stack[pointer];
		};

		this.getPrevState = function() {
			if (pointer <= 0) {
				return null;
			} else {
				pointer--;
				return stack[pointer];
			}
		};

		this.getNextState = function() {
			if (pointer+1 >= stack.length) {
				return null;
			} else {
				pointer++;
				return stack[pointer];
			}
		};

		this.getPointer = function() {
			return pointer;
		};

		this.getCount = function() {
			return stack.length;
		};

		this.clear = function(pt) {
			if (typeof pt == "undefined") {
				stack = [];
				pointer = -1;
				return pointer;
			} else if (pt < 0 || pt >= stack.length) {
				return null;
			} else {
				stack.splice(pt, stack.length-pt);
				if (pointer >= stack.length) {
					pointer = stack.length-1;
				}
				return pointer;
			}
		};

		this.add = function(object) {
			this.clear(pointer+1);
			stack.push(object);
			return ++pointer;
		};
	};
}));