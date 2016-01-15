'use strict';

require('angular');

var storage = require('./storage.js');

var Autocomplete = function(elem){
    
    var element = angular.element(elem);
    var onSelectHandlers = [];
    
    var clickInProcess = false;
    
    var acContainer = angular.element(document.createElement('div'));
    acContainer.css('position', 'absolute');
    acContainer.css('display', 'none');
    
    var body = angular.element(document.body);
        
    body.append(acContainer);
    
    element.on('input', tryAutocomplete);
    element.on('focus', tryAutocomplete);
    
    element.on('click', function(event){
        event.stopPropagation();
    });
    
    body.on('click', function(){
        window.setTimeout(function(){
            console.log('on body click!!!');
            if(!clickInProcess){
                clearDom();
            }
        }, 10);
    });
    
    
    window.addEventListener('resize', function(){
        recalcPosition();
    })
    
    function tryAutocomplete(event){
        event.stopPropagation();
        var inputVal = element.val();
        console.log('Input changed with val: ' + inputVal);
        
        var foundList = findInStorage(inputVal);
        if(foundList.length && inputVal) {
            recalcPosition();
            reGenerateDom(foundList);
        }
        else {
            clearDom();
        }
    }
    
    
    function findInStorage(searchVal){
        
        var list = storage.read();
        
        if(!list){
            list = [];
        }
        
        var resList = list.filter(function(item){
            return item.indexOf(searchVal) > -1;
        });
        return resList;
        
    }
    
    function reGenerateDom(itemList){
        clearDom();
        if(itemList.length){
            
            acContainer.css('display', 'block');
            
            var ulElem = angular.element(document.createElement('div'));
            ulElem.addClass('list-group');
            itemList.forEach(function(text){
                var liElem = angular.element(document.createElement('a'));
                liElem.text(text);
                liElem.addClass('list-group-item');
                liElem.attr('href', 'javascript:{}');
                liElem.on('click', onClickHandler);
                ulElem.append(liElem);
            });
            acContainer.append(ulElem);
        }
    }
    
    function clearDom(){
        clickInProcess = false;
        acContainer.html('');
        acContainer.css('display', 'none');
    }
    
    function recalcPosition(){
        var elemRect = element[0].getBoundingClientRect();
        acContainer.css('top', (elemRect.bottom + 1)+'px');
        acContainer.css('left', elemRect.left + 'px');
        acContainer.css('width', elemRect.width + 'px');
    }
    
    
    function onClickHandler(){
        clickInProcess = true;
        console.log('on click !!!');
        var thisItem = angular.element(this);
        var text = thisItem.text();
        onSelectHandlers.forEach(function(handler){
            handler(text);
        });
        
        clearDom();

    }
    
    
    this.onSelect = function(handler){
        if(handler){
            onSelectHandlers.push(handler);
        }
    }
}

module.exports = Autocomplete;

