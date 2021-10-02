//Link - https://www.youtube.com/watch?v=79yHvDzVA_I&list=PL4ruoTJ8LTT83ayHmUe4bGz8HouruE9hK&index=7
// To be checked with code 
let counter = 0;
let intervalID;

function greeting() {
    counter++;
    console.log('Hello Eishta');
    if (counter >= 3) {
        clearInterval(id);
    }
}
intervalID = setInterval(greeting, 1000);

// output 
// Hello Eishta1
// Hello Eishta2
// Hello Eishta3

// Polyfill
// requirements-> setInterval which will take a acb and delay and return inetrvalID.
//             -> clearInterval which will take input = interval id and removes this id from the map that stores the info of the callback;

// we create a function createSetIntervalPolyfill so that we dont pollute the global space

function createSetIntervalPolyfill() {
    //closure scope
    let intervalID = 0;
    let intervalMap = {};
    function setIntervalPolyfill(cb, delay = 0, ...args) {
        if(typeof cb !== 'function'){
            throw new TypeError('Callback passed should be a function')
        }
        // unique id
        var id = intervalID++;

        function repeat() {
            intervalMap[id] = setTimeout(
                () => {
                    cb(...args)
                    // Terminating
                    if (intervalMap[id]) {
                        repeat();
                    }
                }, delay
            )
        }
        repeat();
        return intervalID;

    }

    function clearIntervalPolyfill(intervalID) {
        clearTimeout(intervalMap[intervalID]);
        delete intervalMap[intervalID]
    }
    return {
        setIntervalPolyfill,
        clearIntervalPolyfill
    };
}

const {
    setIntervalPolyfill,
    clearIntervalPolyfill
} = createSetIntervalPolyfill();

let counter = 0;
let id;

function greetingWithPolyfill() {
    counter++;
    console.log('Hello Eishta');
    if (counter >= 3) {
        clearIntervalPolyfill(id);
    }
}
id = setIntervalPolyfill(greetingWithPolyfill, 1000);


