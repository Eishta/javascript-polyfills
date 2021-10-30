var timerId;
var divBodyDom = document.getElementById('div-body');

// This represents a very heavy method which takes a lot of time to execute
function makeAPICall() {
    var debounceDom = document.getElementById('debounc-count');
    var debounceCount = debounceDom.innerHTML || 0;

    debounceDom.innerHTML = parseInt(debounceCount) + 1
}

// Throttle function: Input as function which needs to be throttled and delay is the time interval in milliseconds
// var  throttleFunction  =  function (func, delay) {
// 	// If setTimeout is already scheduled, no need to do anything
// 	if (timerId) {
// 		return
// 	}

// 	// Schedule a setTimeout after delay seconds
// 	timerId  =  setTimeout(function () {
// 		func()

// 		// Once setTimeout function execution is finished, timerId = undefined so that in <br>
// 		// the next scroll event function execution can be scheduled by the setTimeout
// 		timerId  =  undefined;
// 	}, delay)
// }
// general function
let throttle = (func, wait) => {
    let flag = true;
    return function (...args) {
        let [context, argList] = [this, args];
        if (flag) {
            func.apply(context, argList);
            flag = false;
            setTimeout(() => {
                flag = true
            }, wait)
        }
    }
}
var throttledFunction = throttle(makeAPICall, 200);
// general function implemnetation end
// Event listener on the input box
divBodyDom.addEventListener('scroll', function () {
    var apiCallCountDom = document.getElementById('show-api-call-count');
    var apiCallCount = apiCallCountDom.innerHTML || 0;
    apiCallCount = parseInt(apiCallCount) + 1;

    // Updates the number of times makeAPICall method is called
    apiCallCountDom.innerHTML = apiCallCount;

    // Throttles makeAPICall method such that it is called once in every 200 milliseconds
    throttledFunction() // using general function
    // throttledFunction(makeAPICall, 200);
})