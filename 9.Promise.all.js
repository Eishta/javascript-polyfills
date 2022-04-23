Promise.myall = (promises) => {
    let responses = [];
    let errorResp = [];
    return new Promise((resolve, reject) => {
        /** Loop over promises array **/
        promises.forEach(async (singlePromise, i) => {
            try {
                /** wait for resolving 1 promise **/
                let res = await singlePromise;
                /** to maintain the order as some promises can resolve immediately and some take time we dont use push instead add res on index **/
                responses[i]=res;
                /** when all the promises have resolved, then only the Promise.all resolves with responses array**/
                if (i == promises.length - 1) {           
                    if (errorResp.length > 0) {
                        reject(errorResp);
                    } else {
                        // resolve(esponses)
                        // To know our cutom promise function returning result
                        resolve(responses);
                    }
                }
            } catch (err) {
                /** if the promise at line 9 is rejected , the code pointer is moved here and rejects immediately **/
                errorResp.push(err);
                reject(err);
            }
        });
    });
};

// Case I- both resolve

let p1 = Promise.resolve("Promise1 resolved");

let p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Promise 2 resolved after 2 seconds");
    }, 1000);
});

// output -> ['Promise1 resolved', 'Promise 2 resolved after 2 seconds']

// Case II - first reject
let p1 = Promise.reject("Promise1 rejected");

let p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Promise 2 resolved after 2 seconds");
    }, 1000);
});
// output => error => Promise1 rejected

// Case III - second reject
let p1 = Promise.resolve("Promise1 resolved");

let p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject("Promise 2 rejected after 2 seconds");
    }, 1000);
});
// output => error => Promise 2 rejected after 2 seconds

// Case IV - both reject
let p1 = Promise.reject("Promise1 rejected");

let p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject("Promise 2 rejected after 2 seconds");
    }, 1000);
});

// output => error => Promise1 rejected

Promise.myall([p1, p2]).then(
    (res) => {
        console.log("Response => ", res);
        document.write("<b>Response => </b>" + res);
    },
    (err) => {
        console.log("error =>", err);
    }
);



// *************** Example 2 ************************
function delay(time, value) {
  return new Promise(function(resolve) {
    setTimeout(resolve, time, value)
  })
}
// 1.)
Promise.myall([
  delay(100, 'a'),
  delay(200, 'b'),
  delay(50, 'c'),
  delay(1000, 'd')
])
.then(console.log, console.error)

// output:  ['a', 'b', 'c', 'd']

// 2.)

Promise.myall([
  delay(100, 'a'),
  delay(200, 'b'),
  Promise.reject(Error('bad things happened')),
  delay(50, 'c'),
  delay(1000, 'd')
])
.then(console.log, console.error);

// output: Error: bad things happened
