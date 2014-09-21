HistoryMan
==========

Simple Javascript History Manager

History manager can be used to keep track of application state.  
It can also be used in places where an Undo/Redo framework doesn't quite fit.  

Can be used with Node.js or as a RequireJS modUle.

Public functions
----------------
```
add(state)          -> pointer
getPointer()        -> pointer
clear()             -> pointer || null
clear(pointer)      -> pointer || null
getStateAt(pointer) -> state   || null
getCurrentState()   -> state   || null
getPrevState()      -> state   || null
getNextState()      -> state   || null
```

Usage example
-------------
```
// Load (in Node.js)
var HistoryMan = require('./HistoryMan');

// Initialize
var history = new HistoryMan();

// Add some data
history.add({"route": "#downloads/1"});
history.add({"route": "#downloads/2"});
history.add({"route": "#downloads/3"});
history.add({"route": "#downloads/4"});

// Undo
var state = history.getPrevState();
console.log(state); // > {"route": "#downloads/3"}

// Redo
var state = history.getPrevState();
console.log(state); // > {"route": "#downloads/4"}

// Get specific state
var state = history.getStateAt(1);
console.log(state); // > {"route": "#downloads/2"}

// Adding a state when the pointer does not point to the last state
// There are currently 4 routes in history.
// The pointer points to the second route: {"route": "#downloads/2"}
history.add({"route": "#about"});

// Now the history contains 3 routes in history:
// "#downloads/1", "#downloads/2" and "#about"
```