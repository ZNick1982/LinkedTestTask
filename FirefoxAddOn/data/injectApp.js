(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

module.exports=function(){
    
    this.processLinks = function(rootElem, keyArray){
        var that = this;
        try{
            var items = rootElem.querySelectorAll( "h3.yt-lockup-title > a" );
            
            console.log('items: ' + items.length);
            
            for (var i = 0; i < items.length; ++i) {
                var item = items[i];
//                console.log(item.textContent);
                var rank = that.checkRank(item.textContent, keyArray);
                var url = item.getAttribute('href');
                if(rank){
                    item.parentNode.parentNode.parentNode.style.border = "5px solid red";
                    (function(_rank, _text, _url){
                        self.port.emit('onAddLink', {rank: _rank, text: _text, url: _url});
                    })(rank, item.textContent, url);    
                }
                else{
                    item.parentNode.parentNode.parentNode.style.border = "";
                }
                
            }
            
        }catch(ex){
            console.log('Exception in NodeProcessor.processLinks() !!!');
            console.log(ex.message);
        }
    }
    
    
    this.checkRank = function(nameStr, keyArray){
        var res = 0;
        if(!keyArray){
            return res;
        }
        if(!nameStr){
            return res;
        }
        try{
            nameStr = nameStr.toLowerCase();
            keyArray.forEach(function(key, i){
                
                key = key.toLowerCase();
                var pos = nameStr.indexOf(key);
                while (pos !== -1) {
                    res++;
                    pos = nameStr.indexOf(key, pos + 1);
                }
            });            
        }
        catch(ex){
            console.log('Exception in NodeProcessor.checkRank() !!!');
            console.log(ex.message);
        }
        return res;
        
    }
}
},{}],2:[function(require,module,exports){
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
 
if(domList){
    observer.observe(domList, { attributes: false, childList: true, characterData: false });
}

})();
 


// .yt-lockup-dismissable>.yt-lockup-content>h3.yt-lockup-title>a.yt-uix-sessionlink  




},{"./classes/NodeProcessor.js":1,"./mixins/cleanArray.js":3}],3:[function(require,module,exports){
'use strict';

Array.prototype.clean = Array.prototype.clean || function(deleteValue) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == deleteValue) {         
      this.splice(i, 1);
      i--;
    }
  }
  return this;
};


},{}]},{},[2]);
