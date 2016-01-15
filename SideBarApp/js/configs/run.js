'use strict';

module.exports = ['searchResultService', '$rootScope', '$log', '$timeout', 
    function(searchResultService, $rootScope, $log, $timeout){
    try{
        addon.port.on('onAddLink', function(data){
            searchResultService.add(data);
            $rootScope.$apply();
        });
    }
    catch(ex){
        $log.error("Exception in configs/run.js");
        $log.error(ex.message);
        
        var addTestData = function(){
            $timeout(function(){
                searchResultService.add(
                    {
                        rank: Math.floor((Math.random() * 10) + 1),
                        url: 'http://www.google.com',
                        text: 'Test link ' + Math.floor((Math.random() * 10) + 1)
                    });
               addTestData();
            }, 1000);
        }
        
        var clearTestData = function(){
            $timeout(function(){
                searchResultService.clear();
                clearTestData();
            }, 60000);
        }
        
        addTestData();
        clearTestData();
    }     
}];