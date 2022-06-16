// Link - https://jssaini07.medium.com/understanding-javascript-promises-by-writing-a-polyfill-69c8d51c23b4

// 1. when we create a promise , we send a function ref to Promise constructor
// 2. a Promise has a resolve , reject function which take some data and pass it to then and catch func.
// 3. then and catch function on Promise futher takes fn references
// Implementation
const CustomPromiseState = {
    PENDING: 'PENDIND',
    RESOLVED: 'RESOLVED',
    REJECTED: 'REJECTED'
};

class CustomPromise {
    constructor(fn) {
        this.CustomPromiseState = CustomPromiseState.PENDING;
        this.resolver = this.resolver.bind(this);
        this.rejector = this.rejector.bind(this);
        this.thenFn = null;
        this.catchFn = null;
        fn(this.resolver, this.rejector);
    }
    resolver(resolverData) {
        if (this.CustomPromiseState === CustomPromiseState.PENDING) {
            this.thenFn && this.thenFn(resolverData);
        }
        this.CustomPromiseState = CustomPromiseState.RESOLVED
    }
    rejector(rejectedData) {
        if (this.CustomPromiseState === CustomPromiseState.PENDING) {
            this.catchFn && this.catchFn(rejectedData);
        }
        this.CustomPromiseState = CustomPromiseState.REJECTED
    }
    then(thenFn) {
        this.thenFn = thenFn;
        return this; // return the promise so we can again call .then or catch on it
    }
    catch(catchFn) {
        this.catchFn = catchFn;
        return this; // return the promise so we can again call .then or catch on it
    }
}

// USE

const text = document.getElementById('text');
const btn = document.getElementById('button');

const getNumber = () => {
    new CustomPromise((res, rej) => {
        const randomNumber = parseInt(Math.random() * 100, 10);
        setTimeout(() => {
            if (randomNumber % 5 == 0) {
                rej(`Rejected with num : ${randomNumber}`);
            }
            res(`Resolved with num : ${randomNumber}`);
        }, randomNumber * 10);
    });
}

const clickHandler = () => {
    display('Loading.....');
    const numberPromise = getNumber();
    numberPromise.then(display).catch(display);
}

const display = (content) => {
    text.innerText = content;
}
btn.addEventListener("click", clickHandler);


// HTML

<body>
    <p id='text'></p>
    <button id='button'>Get Random Number</button>
</body>