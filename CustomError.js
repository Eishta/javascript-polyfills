
class Error {
    constructor(message) {
        this.message = message;
    }

}


try {
    throw new Error('Refernce Error');
}
catch (e) {
    console.log(e.message)
}