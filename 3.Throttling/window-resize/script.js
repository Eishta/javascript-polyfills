let throttle = (func, wait) => {
    let flag = true;
    return function (...args) {
        let [context, argList] = [this, args];
        if (flag) {
            func.apply(context, argList);
            flag = false;
            setTimeout(() => {
                flag = true
            }, wait)
        }
    }
}
let counter1 = 0;
let expensiveFunction = () => {
    console.log('Throttling example.......' + Date.now());
}

let throttledFunction = throttle(expensiveFunction, 1000);

window.onresize = throttledFunction;




//Other
/**
 * Returns a function, that, when invoked, will only be triggered at
 * most once during a given interval of time and no more frequently
 * than the animation frame rate allows it.
 *
 * @param func [function] the function to throttle
 * @param wait [number] time in milliseconds to use for window
 * @return [function] throttled function
 */
export function throttle(func, wait) {
    let timeout = null;
    let previous = 0;
    let pending = false;
    return function () {
        return new Promise((resolve, reject) => {
            const later = function () {
                previous = Date.now();
                timeout = null;
                pending = false;
                try {
                    func();
                    resolve();
                }
                catch (error) {
                    reject(error);
                }
            };
            const now = Date.now();
            const remaining = wait - (now - previous);
            if (remaining <= 0 && !pending) {
                if (timeout != null) {
                    clearTimeout(timeout);
                }
                pending = true;
                requestAnimationFrame(later);
            }
            else if (!timeout && !pending) {
                timeout = setTimeout(() => requestAnimationFrame(later), remaining);
            }
            else {
                resolve();
            }
        });
    };
}
//# sourceMappingURL=throttle.js.map