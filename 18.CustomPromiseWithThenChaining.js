// Link - https://jssaini07.medium.com/understanding-javascript-promises-by-writing-a-polyfill-69c8d51c23b4

import { number } from "prop-types";

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
        this.thenFns = [];
        this.catchFn = null;
        this.resolvedData=null;
        fn(this.resolver, this.rejector);
    }
    resolver(resolverData) {
        if (this.CustomPromiseState !== CustomPromiseState.PENDING) {
           return;
        }
        this.CustomPromiseState = CustomPromiseState.RESOLVED;
        while(this.thenFns.length){
            const thenFn = this.thenFns.shift();
            this.resolvedData = thenFn(this.resolvedData || resolverData);
        }
    }
    rejector(rejectedData) {
        if (this.CustomPromiseState === CustomPromiseState.PENDING) {
            this.catchFn && this.catchFn(rejectedData);
        }
        this.CustomPromiseState = CustomPromiseState.REJECTED
    }
    then(thenFn) {
        this.thenFn = thenFn;
        return this;
    }
    catch(catchFn) {
        this.catchFn = catchFn;
        return this;
    }
}

// USE

const text = document.getElementById('text');
const btn = document.getElementById('button');

const getNumber = () => {
    new CustomPromise((res, rej) => {
        const randomNumber = 10;
        setTimeout(() => {
            res(randomNumber);
        }, randomNumber * 10);
    });
}

const incrementBy = (val, incrementByVal)=>{
    return val + incrementByVal;
}
const clickHandler = () => {
    display('Loading.....');
    const numberPromise = getNumber();
    numberPromise
    .then(val=> incrementBy(val,10))
    .then(val=> incrementBy(val,20))
    .then(val=> incrementBy(val,30))
    .then(display)
    .catch(display);
}

const display = (content) => {
    text.innerText = content;
}
btn.addEventListener("click", clickHandler);