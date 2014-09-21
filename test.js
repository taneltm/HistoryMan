/**
 * Simple NodeJS test.  
 *
 * To run, CD to the project directory and run `node test`.
 *
 * @version 0.0.1
 * @author TanelTM
 */

var assert     = require('assert');
var HistoryMan = require('./HistoryMan');

var history    = new HistoryMan();

assert.ok( history.getPointer()   === -1       );
assert.ok( history.getPrevState() === null     );
assert.ok( history.getPointer()   === -1       );

assert.ok( history.add("banana")  === 0        );
assert.ok( history.add("orange")  === 1        );
assert.ok( history.add("apple")   === 2        );
assert.ok( history.add("mango")   === 3        );

assert.ok( history.getCount()     === 4        );

assert.ok( history.getNextState() === null     );
assert.ok( history.getPointer()   === 3        );

assert.ok( history.getPrevState() === "apple"  );
assert.ok( history.getNextState() === "mango"  );
assert.ok( history.getPointer()   === 3        );

assert.ok( history.getStateAt(0)  === "banana" );
assert.ok( history.add("lemon")   === 1        );
assert.ok( history.add("kiwi")    === 2        );

assert.ok( history.clear(1)       === 0        );

assert.ok( history.add("lemon")   === 1        );
assert.ok( history.add("kiwi")    === 2        );
assert.ok( history.clear()        === -1       );

console.log("All tests passed!");