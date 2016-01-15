'use strict';

require('angular');



var app = angular.module('sideBarApp', []);
app.controller('searchController', require('./controllers/searchController.js'));
app.controller('searchResultController', require('./controllers/searchResultController.js'));
app.factory('searchResultService', require('./services/searchResultService.js'));
app.directive('aComplete', require('./directives/aComplete.js'));
app.run(require('./configs/run.js'));




