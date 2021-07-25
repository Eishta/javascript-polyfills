let counter = 0;
const getData = () => {
    // calls an api and gets data
    console.log('Fetching data.......' + counter++);
}

let debounce = function (fn, delay) {
    let timer;
    return function () {
        let context = this,
            args = arguments;
        clearTimeout(timer);

        timer = setTimeout(() => {
            fn.apply(context, args)
        }, delay)
    }

}

// call getData only when the differene between the 2 key press is greater or eual to 300
let newFunction = debounce(getData, 300)


// Other

// Drupal debounce function
Drupal.debounce = function (func, wait, immediate) {
    var timeout;
    var result;
    return function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var context = this;

        var later = function later() {
            timeout = null;

            if (!immediate) {
                result = func.apply(context, args);
            }
        };

        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);

        if (callNow) {
            result = func.apply(context, args);
        }

        return result;
    };
};