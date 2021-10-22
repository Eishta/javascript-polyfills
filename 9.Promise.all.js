Promise.myall = (promises) => {
    let responses = [];
    let errorResp = [];
    return new Promise((resolve, reject) => {
        /** Loop over promises array **/
        promises.forEach(async (singlePromise, i) => {
            try {
                /** wait for resolving 1 promise **/
                let res = await singlePromise;
                responses.push(res);
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
let p1 = Promise.reject("Promise1 resolved");

let p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Promise 2 resolved after 2 seconds");
    }, 1000);
});
// output => error => Promise1 resolved

// Case III - second reject
let p1 = Promise.resolve("Promise1 resolved");

let p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject("Promise 2 resolved after 2 seconds");
    }, 1000);
});
// output => error => Promise 2 resolved after 2 seconds

// Case IV - both reject
let p1 = Promise.reject("Promise1 resolved");

let p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject("Promise 2 resolved after 2 seconds");
    }, 1000);
});

// output => error => Promise1 resolved

Promise.myall([p1, p2]).then(
    (res) => {
        console.log("Response => ", res);
        document.write("<b>Response => </b>" + res);
    },
    (err) => {
        console.log("error =>", err);
    }
);