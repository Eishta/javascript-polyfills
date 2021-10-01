// https://medium.com/@emailid.akshay/lets-implement-queryselectorall-in-javascript-2d47ce8fe5b3
/**
 * Calls Element.prototype.matches() || native matches selectors to
 *  evaluate input query string is a match for input element
 */
function isMatch(node, selector) {
    if (node.matches) { // for browsers that supports Element.prototype.matches()
        return node.matches(selector);
    } else { // for old browsers 
        // calling the native methods if matches is not supported by the browser 
        var matches = Element.prototype.matchesSelector ||
            Element.prototype.mozMatchesSelector ||
            Element.prototype.msMatchesSelector ||
            Element.prototype.oMatchesSelector;
        return matches.call(node, selector);
    }
}

/**
 * Traveses DOM tree and evaluates whether input selector is a match.
 */
Document.prototype.myQuerrySelectorAll = function (selector) {
    var result = [];
    /**
     * helper function
     * recurr on all childern evaluating the selector, adding element to result if evaluated true
     */
    function traverse(node) {
        if (node == null)
            return;
        if (isMatch(node, selector)) // add result if its a match !
            result.push(node);
        for (var child of node.children) // check all children
            traverse(child);
    }
    traverse(this.documentElement); // document.documentElement points root Element(the html element)
    return result;
}

// we traverse on the DOM tree (the helper method traverse) and evaluate the input 
// selector expression on each Element (the helper method isMatch()). If the element
//  matches then we store it(var result). After traversing we return the result.