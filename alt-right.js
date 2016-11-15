// ==UserScript==
// @name         "Alt right"
// @version      0.1
// @description  Let's be honest here
// @author       Dan Conley
// @website      https://danconley.net
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // completely copied from http://stackoverflow.com/questions/24417791/replace-many-text-terms-using-tampermonkey-without-affecting-urls-and-not-look
    var replaceArry = [
    [/alt.right/g,    'white supremacist movement'],
    [/Alt.Right/g,    'White Supremacist movement'],
    [/Alt.right/g,    'White supremacist movement'],
    // etc.
];
var numTerms    = replaceArry.length;
var txtWalker   = document.createTreeWalker (
    document.body,
    NodeFilter.SHOW_TEXT,
    {   acceptNode: function (node) {
            //-- Skip whitespace-only nodes
            if (node.nodeValue.trim() )
                return NodeFilter.FILTER_ACCEPT;

            return NodeFilter.FILTER_SKIP;
        }
    },
    false
);
var txtNode     = null;

while (txtNode  = txtWalker.nextNode () ) {
    var oldTxt  = txtNode.nodeValue;

    for (var J  = 0;  J < numTerms;  J++) {
        oldTxt  = oldTxt.replace (replaceArry[J][0], replaceArry[J][1]);
    }
    txtNode.nodeValue = oldTxt;
}
})();
