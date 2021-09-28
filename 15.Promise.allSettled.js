// About 
// Promise.allSettled() — This method returns a promise that resolves
//  after all of the given promises have either resolved or rejected,
//  with an array of objects that each describes the outcome of each promise.
// input = iterable
// output -> pending promise => For each outcome object, a status string is present.
//                               If the status is fulfilled, then a value is present.
//                               If the status is rejected, then a reason is present.

Promise.myAllSettled = function (promises) {
    let mappedPromises = promises.map((p) => {
        return p
            .then((value) => {
                return {
                    status: 'fulfilled',
                    value
                };
            })
            .catch((reason) => {
                return {
                    status: 'rejected',
                    reason
                };
            });
    });
    return Promise.all(mappedPromises);
};


// Example ================================================================================
const promise1 = Promise.resolve(3);
const promise2 = new Promise((resolve, reject) =>
    setTimeout(() => reject('foo'), 100)
);
const promises = [promise1, promise2];
Promise.myAllSettled(promises).then((results) => results.forEach((result) => console.log(result.status)));
// expected output:
// “fulfilled”
// “rejected”

// Example 2 ===============================================================================
Promise.allSettled([
    Promise.resolve(33),
    new Promise(resolve => setTimeout(() => resolve(66), 0)),
    99,
    Promise.reject(new Error('an error'))
  ])
  .then(values => console.log(values));
  
  // [
  //   {status: "fulfilled", value: 33},
  //   {status: "fulfilled", value: 66},
  //   {status: "fulfilled", value: 99},
  //   {status: "rejected",  reason: Error: an error}
  // ]