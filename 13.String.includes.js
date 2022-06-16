String.prototype.myIncludes = function (searchString, pos = 0) {
    if (typeof pos !== 'number') pos = 0;
    if (searchString.length + pos > this.length) return false;
    else {
        return this.indexOf(searchString, pos) !== -1;
    }
}

// test cases

// called with pos
'hello'.myIncludes('e',3)
false

// called without pos so now the pos is 0
'hello'.myIncludes('e')
true

// called with a char not present in string
'hello'.myIncludes('z')
false

// case -> pos is not a number
'hello'.myIncludes('e', 'e')
true

// called with extremely big interger
'hello'.myIncludes('e', 1000000000000000000000000000n)
false   

