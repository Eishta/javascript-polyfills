// https://developers.google.com/web/updates/2015/08/using-requestidlecallback
// requestIdleCallback will schedule work when there is free time at the end of a frame,
//  or when the user is inactive. This means that there’s an opportunity to do your work
//   without getting in the user’s way.
window.requestIdleCallback =
    window.requestIdleCallback ||
    function (cb) {
        var start = Date.now();
        return setTimeout(function () {
            cb({
                didTimeout: false,
                timeRemaining: function () {
                    return Math.max(0, 50 - (Date.now() - start));
                }
            });
        }, 1);
    }

window.cancelIdleCallback =
    window.cancelIdleCallback ||
    function (id) {
        clearTimeout(id);
    }


//   usage
requestIdleCallback(myNonEssentialWork);
// When myNonEssentialWork is called, it will be given a deadline object
//  which contains a function which returns a number indicating
//   how much time remains for your work:
function myNonEssentialWork(deadline) {
    while (deadline.timeRemaining() > 0)
        doWorkIfNeeded();
}
function myNonEssentialWork(deadline) {
    while (deadline.timeRemaining() > 0 && tasks.length > 0)
        doWorkIfNeeded();

    if (tasks.length > 0)
        requestIdleCallback(myNonEssentialWork);
}