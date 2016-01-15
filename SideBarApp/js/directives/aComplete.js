'use strict';

var Autocomplete = require('../classes/autocomplete.js');

module.exports = [function(){
    return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attrs, ngModel) 
            {
                   var ac = new Autocomplete(element);
                   ac.onSelect(function(selectedValue){
                        console.log("click from directive with val: " + selectedValue);
                        ngModel.$viewValue = selectedValue;
//                        ngModel.$modelValue = selectedValue;
//                        scope.ngModel = selectedValue;
                        ngModel.$render();
//                        scope.$apply();
                        
                   });   
            }
        };
}];