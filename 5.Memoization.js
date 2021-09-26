// memoize a function with single argument
let memoize = (fn) => {
    let cache = {};
    return (n) => {
        if (n in cache) {
            return cache[n];
        }
        else {
            let result = fn(n)
            cache[n] = result;
            return result;
        }
    }

}

let add = (n) => {
    return n + 10;
}
let memoAdd = memoize(add);
memoAdd


/////////////////////////////////////////////////////////////////

// to memoise a funcgtion with multiple arguments
function memorize(fn) {
    let cache = {};
    return (...args) => {
        let argsStr = JSON.stringify(args);

        if (cache[argsStr] !== undefined) {
            return cache[argsStr];
        }
        else {
            let result = fn.call(undefined, ...args);
            cache[argsStr] = result;
            console.log(cache)
            return result;
        }
    }
}
const sum = (a, b, c) => {
    console.log("Sum called");
    return a + b + c
}

const memorizedSum = memorize(sum);

console.log(memorizedSum(1, 2, 3));
console.log(memorizedSum(4, 1, 3));
console.log(memorizedSum(1, 2, 3));
