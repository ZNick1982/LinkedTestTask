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
            
            try {
                addon.port.emit('onSave', savedList);
            }
            catch(ex){
                console.log("Exception in classes/storage.js");
                console.log(ex.message);   
            }
            
        }
        return;
    }
};


try {
    addon.port.on('onRead', function(initArr){
        console.log('got onRead with: ' + JSON.stringify(initArr));
        localStorage.setItem(storageName, JSON.stringify(initArr));
    });
}
catch(ex){
    console.log("Exception in classes/storage.js");
    console.log(ex.message);   
}

