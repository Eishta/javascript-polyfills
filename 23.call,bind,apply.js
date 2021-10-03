
function displayUser(state, country, method) {
    console.log('----- ' + method + ' -----');
    console.log('Name : ', this.name);
    console.log('Age : ', this.age);
    console.log('City : ', this.city);
    console.log('State : ', state);
    console.log('Country : ', country);
}
var user = {
    name: 'John Stewart',
    age: '10',
    city: 'Sanfrancisco'
}
//-----------------------------------------------------------------------------

// Bind
// takes the object to bind, and the arguments 
Function.prototype.myBind = function (...args) {
    let [bindFn, bindObj, bindParams] = [this, args[0], args.slice(1)];
    return function (...fnArgs) {
        bindFn.apply(bindObj, [...bindParams, ...fnArgs]);
    }
}
let f = displayUser.myBind(user, 'CA', 'USA', 'bind --> bind');
f();

//-----------------------------------------------------------------------------
// Call
Function.prototype.myCall = function (...args) {
    let callObj = args[0];
    callObj.callFn = this;
    let callParams = args.slice(1);
    callObj.callFn(...callParams);
}
displayUser.myCall(user, 'CA', 'USA', 'apply --> runApply');

//-----------------------------------------------------------------------------
// Apply 

Function.prototype.myApply = function (...args) {
    let applyObj = args[0];
    applyObj.applyFn = this;
    let applyParams = args[1];
    applyObj.applyFn(...applyParams);
}

displayUser.myApply(user, ['CA', 'USA', 'apply --> runApply']);
