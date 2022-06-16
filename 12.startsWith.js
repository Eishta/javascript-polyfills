String.prototype.myStartsWith = function (search, rawPos) {
    pos = rawPos > 0 ? rawPos | 0 : 0;
    return this.substring(pos, pos + search.length) === search; // substring(start, end) - excluding the end index
}
const str = 'eishta';
console.log(str.myStartsWith('e')); // true
console.log(str.myStartsWith('i')); // false
'abcab'.startsWith('ab',3)    // true