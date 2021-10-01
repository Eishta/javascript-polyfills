// Polyfill for sleep method that blocks the main thread execution for the specified delay
function sleep(delay) {
    var startTime = Date.now();

    // loop until the current time exceeds the delayed time.
    while (Date.now() < startTime + delay);
}

(function () {
    // List for mainataining callbacks corresponding to their id's
    var timers = {}; // holds all the callbacks and the delay associated with it

    // generates a new id for every mySetTimeout call
    function generateNewId() {
        var r = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
        while (timers.hasOwnProperty(r)) { // check weather the id already exists
            r = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
        }
        return r;
    }

    function check() {
        var t = Date.now();
        // loop over all the timers
        for (var timerId in timers) {
            if (timers.hasOwnProperty(timerId) && t > timers[timerId].time) { // check if the current timer needs to be executed
                timers[timerId].callback(); // execute the callback
                myClearTimeout(timerId); // remove from timmers list
            }
        }
        requestIdleCallback(check); // keep a check on the check method when ever there is time
    }


    window.mySetTimeout = function (callback, delay) {
        if (typeof (callback) != 'function') throw new Error("callback should be a function");
        if (typeof (delay) != 'number' || delay < 0) throw new Error("delay should be a positive number");

        // generate a new id
        var newId = generateNewId();

        // add it to the list of timers
        timers[newId] = {
            callback: callback,
            time: Date.now() + delay // add the time after which callback needs to be executed
        };

        // return the id to the consumer for referencing it for later use.
        return newId;
    }

    // cancels the callback execution for an id.
    window.myClearTimeout = function (id) {
        if (timers.hasOwnProperty(id)) delete timers[id]; // if id exists just delete the timer and in the next check this timer won't be there
    }

    // call the checking process so that callbacks get executed.
    requestIdleCallback(check);
})();