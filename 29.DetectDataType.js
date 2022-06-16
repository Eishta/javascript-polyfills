function detectType(data) {
    return Object.prototype.toString.call(data).slice(1, -1).split(' ')[1].toLowerCase();
}