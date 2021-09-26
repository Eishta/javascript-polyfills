String.prototype.myIncludes = function (searchString, pos = 0) {
    if (typeof pos !== 'number') pos = 0;
    if (searchString.length + pos > this.length) return false;
    else {
        return this.indexOf(searchString, pos) !== -1;
    }
}

// test cases

'hello'.myIncludes('e',3)
false

'hello'.myIncludes('e')
true

'hello'.myIncludes('z')
false

'hello'.myIncludes('e', 'e')
true

'hello'.myIncludes('e', 1000000000000000000000000000)
false   