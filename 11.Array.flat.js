Array.prototype.flatten = function (depth = 1) {
    let arr = this;
    let output = [];

    for (let a of arr) {
        if (Array.isArray(a) && depth > 0) {
            output = [...output, ...a.flatten(depth - 1)];
        }
        else {
            output.push(a);
        }
    }
    return output;
}

const nestedArr = [[[[[1]]]], [[[2]]]]
const flat = nestedArr.flatten(5);
console.log(flat);


///////////////////////////////////////////////////////////
// using reduce method

Array.prototype.flattenWithReduce = function (depth = 1) {
    return this.reduce(
        function (flat, toFlatten) {
            return flat.concat((Array.isArray(toFlatten) && (depth > 1)) ? toFlatten.flattenWithReduce(depth - 1) : toFlatten);
        }, []
    );
};
const nestedArr = [[[[[1]]]], [[[2]]]]
const flat = nestedArr.flattenWithReduce(5);
console.log(flat);