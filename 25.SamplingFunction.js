/**
 * A sampling function accepts a function as an input and a count and executes the input 
 * function once for the given count of calls
 */

const message = (count) => {
    console.log(`Hello , I am called ${count} times`);
}
const sampler = (fn, count, context) => {
    let counter = 0;
    return function (...args) {
        context = context ?? this;
        if (++counter == count) {
            fn.apply(context, args);
            counter = 0;
        }
    }
}


const sample = sampler(message, 4);

sample(1); // counter = 1
sample(2); // counter = 2
sample(3); // counter = 3
sample(4); // counter = 4,  this is called , counter = 0
sample(5); // counter = 1
sample(6); // counter = 2
sample(7); // counter = 3
sample(8); // counter = 4,  this is called , counter = 0
// ......