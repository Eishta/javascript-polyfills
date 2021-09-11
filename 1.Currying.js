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


function curry(func) {  // returns the curried function

    return function curried(...args) { // take all or partial argumnets
        if (args.length >= func.length) {  // if the args passed equals or exceed the params of origional function, call the func with args
            return func.apply(this, args);
        } else {
            return function (...args2) { // return a function that takes the rest of the params left when args does not contain all params that func needs
                return curried.apply(this, args.concat(args2));  //this function will combine the args passed and stored in lexical env. and the args of the curried function      }
            }
        };

    }
}

//   function sum(a, b, c) {
//     return a + b + c;
//   }

//   let curriedSum = curry(sum);

//   alert( curriedSum(1, 2, 3) ); // 6, still callable normally
//   alert( curriedSum(1)(2,3) ); // 6, currying of 1st arg
//   alert( curriedSum(1)(2)(3) ); // 6, full currying