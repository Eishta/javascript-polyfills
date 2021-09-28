// Promise.all is a static method and not a prototype method.

Promise.myPromiseAll = function (promisesArray) {
    var output = new Array(promisesArray.length);
    var counter = 0;

    return new Promise((resolve, reject) => {
        promisesArray.forEach((promise, index) => {
            Promise.resolve(promise)
                .then(value => {
                    output[index] = { state: 'fulfilled', value };
                    counter = counter + 1;
                    if (counter === promisesArray.length) {
                        // all promises resolved, resolve outer promise
                        resolve(output);
                    }
                })
                .catch(reason => {
                    output[index] = { state: 'rejected', reason };
                }); // reject outer promise immediately, as any promise rejects
        });
    });
}

let p1 = Promise.resolve("Promise1 resolved");

let p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Promise 2 resolved after 2 seconds");
    }, 1000);
});

Promise.myPromiseAll([p1, p2]).then(
    (res) => {
        console.log("Response => ", res);
        document.write("<b>Response => </b>" + res);
    },
    (err) => {
        console.log("error =>", err);
    }
);


  // Response =>  custom promise ::Promise1 resolved,Promise 2 resolved after 2 seconds