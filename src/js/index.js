var app = angular.module('d3examples', ['ngRoute']);
app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  
  $routeProvider.otherwise('/bar-html');
  
  $routeProvider.when('/:component', {
    templateUrl : function(params) { return 'home/' + params.component + '.html'; },
    controller : 'HomeController'
  });
}]);