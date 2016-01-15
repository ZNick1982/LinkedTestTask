'use strict';

var storageName = 'autocompleteStorage';

module.exports = {
    read: function(){
        
        var val = localStorage.getItem(storageName);
        if(val){
            val = JSON.parse(val);
        } 
        return val;
    },
    
    add: function(item){
        var isExist = false;
        
        var savedList = this.read();
        if(!savedList){
            savedList = [];
        }
        
        savedList.forEach(function(text){
            if(text === item){
                isExist = true;
            }
        });
        
        if(!isExist){
            savedList.push(item);
            localStorage.setItem(storageName, JSON.stringify(savedList));
        }
        return;
    }
};

