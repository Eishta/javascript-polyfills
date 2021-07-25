// Case 1: add(1)(2)(3)
function add(a) {
    return function (b) {
        return function (c) {
            return a + b + c;
        }
    }
}


//    Case 2: add(1)(2)(3)…(n)()

function add(a) {
    return function (b) {
        if (b) {
            return add(a + b);
        }
        return a;
    }
}

//Case 3: sum(1,2)(3,4)
function add(a, b) {
    return function (c, d) {
        return a + b + c + d;
    }
}

// Case 4: add(1,2..n)(5,6…n)…(n)()
function add(...args) {
    let a = args.reduce((a, b) => a + b, 0);
    return function (...args2) {
        let b = args2.reduce((a, b) => a + b, 0);
        if (b) {
            return add(a + b);
        }
        return a;
    }
}