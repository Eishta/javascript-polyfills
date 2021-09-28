/**
 *  ABOUT
 * ========
 * Promise.any() takes an iterable of Promise objects and,as soon as one of the promises in the iterable fulfills, 
 * returns a single promise that resolves with the value from that promise. 
 * If no promises in the iterable fulfill (if all of the given promises are rejected),
 * then the returned promise is rejected with an AggregateError, a new subclass of Error that groups together individual errors.
 */
// Input - Iterable
// Output=> An already rejected Promise if the iterable passed is empty.
//       => An asynchronously resolved Promise if the iterable passed contains no promises.
//       => A pending Promise in all other cases. This returned promise is then resolved/rejected asynchronously 
//            (as soon as the stack is empty) when any of the promises in the given iterable resolve, or if all the promises have rejected.

// Implementation ==================================================================================================================
Promise.myAny = function promiseAny(promisesArray) {
    var errorOutput = new Array(promisesArray.length);
    var counter = 0;

    return new Promise((resolve, reject) => {
        promisesArray.forEach((promise, index) => {
            Promise.resolve(promise)
                .then(resolve) // resolve outer promise, as and when any of the input promises resolves
                .catch(error => {
                    errorOutput[index] = error;
                    counter = counter + 1;
                    if (counter === promisesArray.length) {
                        // all promises rejected, reject outer promise
                        reject(errorOutput);
                    }
                });
        });
    });
}

// Implementation Ends =============================================================================================================
// Example =========================================================================================================================
const promise1 = Promise.reject(0);
const promise2 = new Promise((resolve) => setTimeout(resolve, 100, 'quick'));
const promise3 = new Promise((resolve) => setTimeout(resolve, 500, 'slow'));

const promises = [promise1, promise2, promise3];

Promise.any(promises).then((value) => console.log(value));

// expected output: "quick"
// Eample End =====================================================================================================================