'use strict';

module.exports = ['searchResultService', '$rootScope', function(searchResultService, $rootScope){
    
    addon.port.on('onAddLink', function(data){
        console.log('Sidebar got message onAddLink');
        searchResultService.add(data);
        $rootScope.$apply();
    });
    
}]