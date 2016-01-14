'use strict';

require('./mixins/cleanArray.js');

(function(){

var NodeProcessor = require('./classes/NodeProcessor.js');

var nodeProc = new NodeProcessor();

var keyWordsArr = [];

self.port.on("onSearch", function(message) {
    console.log('received onSearch message with keys: ' + message)
    if(message){
        keyWordsArr = message.split(" ").clean("");
        nodeProc.processLinks(document, keyWordsArr);
    } 
});

var domList = document.querySelector('ol.section-list');

var observer = new MutationObserver(function(mutations) {
    try {
        mutations.forEach(function(mutation) {
            if(mutation.addedNodes && keyWordsArr.length){
                    console.log('DOM changed!!!');
                    for (var i = 0; i < mutation.addedNodes.length; ++i) {
                        nodeProc.processLinks(mutation.addedNodes[i], keyWordsArr);
                    }        
            }
        });
    }
    catch(ex){
        console.log('Exception in DOM change handler!!!');
        console.log(ex.message);
    }    
});
 
observer.observe(domList, { attributes: false, childList: true, characterData: false });

})();
 


// .yt-lockup-dismissable>.yt-lockup-content>h3.yt-lockup-title>a.yt-uix-sessionlink  



