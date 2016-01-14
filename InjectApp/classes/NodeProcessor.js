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