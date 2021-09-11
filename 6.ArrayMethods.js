Array.prototype.myMap = function (callback) {
    let arr = [];
    for (let i = 0; i < this.length; i++) {
        arr.push(callback(this[i], i, this));
    }
    return arr;
}

Array.prototype.each = function (callback) {
    for (let i = 0; i < this.length; i++) {
        callback(this[i], i, this)
    }
}

Array.prototype.myFilter = function(cb) {
    let arr = [];
    for (let i = 0; i < this.length; i++) {
        if(cb(this[i], i, this)){
            arr.push(this[i]);
        }
    }
    return arr;
}

Array.prototype.myReduce = function(cb, init){
    let acc = init;
    for (let i = 0; i < this.length; i++) {
        if(acc !== undefined){
            acc = cb.call(undefined, acc, this[i], i, this);
        }
        else {
            acc=this[i]
        }
    }
    return acc;
}