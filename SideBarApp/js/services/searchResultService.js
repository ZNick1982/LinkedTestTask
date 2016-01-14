'use strict';

module.exports = ['$rootScope', function($rootScope){
    
    var service = {
        resultList: []
    };
    
    service.clear = function(){
        service.resultList = [];
    }
    
    service.add = function(rec){
        if(!rec)
        return;
        
        service.resultList.push(rec);        
    }
    
    return service;
}];