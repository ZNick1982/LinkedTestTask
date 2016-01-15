'use strict';

var storage = require('../classes/storage.js');

module.exports = ['$scope', 'searchResultService', '$log', function($scope, searchResultService, $log){
    
    var self = this;
    
    self.searchModel = '';
    
    self.onSearchClick = function(){
        $log.debug('Search button clicked with text: ' + self.searchModel);
        try {
            addon.port.emit('onSearch', self.searchModel);
        }
        catch(ex){
            $log.error("Exception in controllers/searchController.js");
            $log.error(ex.message);   
        }
        storage.add(self.searchModel);
        searchResultService.clear();
    }    
}];