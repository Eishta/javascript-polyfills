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
memoAdd(2)