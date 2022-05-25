if (Math.trunc == null) {
	Math.trunc = function (v) {
		return v < 0 ? Math.ceil(v) : Math.floor(v);
	};
}

// Usage example:

console.log( Math.trunc(  5     )); //  5
console.log( Math.trunc(  3.14  )); //  3
console.log( Math.trunc( -3.14  )); // -3
console.log( Math.trunc(  0.123 )); //  0
console.log( Math.trunc( -0.123 )); // -0