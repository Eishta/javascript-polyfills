const myObj = {
    a: 1,
    b: 'hello',
    c: [0, 1, 2],
    d: { e: 1, f: 2 }
};

const deepFreeze = obj => {
    Object.keys(obj).forEach(prop => {
        if (typeof obj[prop] === 'object' && !Object.isFrozen(obj[prop])) deepFreeze(obj[prop]);
    });
    return Object.freeze(obj);
};
deepFreeze(myObj);
