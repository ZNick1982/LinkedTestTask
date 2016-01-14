'use strict';

module.exports = ['$scope', 'searchResultService', function($scope, searchResultService){
    
    var self = this;
    
    self.searchModel = '';
    
    self.onSearchClick = function(){
        console.log('Search button clicked with text: ' + self.searchModel);
        addon.port.emit('onSearch', self.searchModel);
        searchResultService.clear();
    }
    
}];