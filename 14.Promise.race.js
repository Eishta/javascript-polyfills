// About ================================================================================================================================
/**
* The Promise.race() method returns a promise that fulfills or rejects
*   as soon as one of the promises in an iterable fulfills or rejects,
*   with the value or reason from that promise.
* Promise.race takes the first settled(either resolve or reject) Promise whereas Promise.any takes the first fulfilled(only resolved) Promise.
* input -> iterable
* output -> pending promise
* Case I- If the iterable passed is empty, the promise returned will be forever pending.
* Case II- If the iterable contains one or more non-promise value and/or an already settled promise,
*          then Promise.race will resolve to the first of these values found in the iterable.
*/
// About Ends ================================================================================================================================

// Implementation ===========================================================================================================================

Promise.myRace = function promiseRace(promisesArray) {
    return new Promise((resolve, reject) => {
        promisesArray.forEach((promise) => {
            Promise.resolve(promise)
                .then(resolve) // resolve outer promise, as and when any of the input promise resolves
                .catch(reject); // reject outer promise, as and when any of the input promise rejects
        });
    });
}

//  Implementation Ends ======================================================================================================================= 
// Example ====================================================================================================================================

// link - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race
const promise1 = new Promise((resolve, reject) => {
    setTimeout(resolve, 500, 'one');
});

const promise2 = new Promise((resolve, reject) => {
    setTimeout(resolve, 100, 'two');
});


Promise.race([promise1, promise2]).then((value) => {
    console.log(value);
    // Both resolve, but promise2 is faster
});
  // expected output: "two"

// Example Ends =================================================================================================================================