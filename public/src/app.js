angular.module('MainApp',['ngRoute', 'ngResource'])
.config(function($routeProvider, $locationProvider){
	$routeProvider	
		.when('/',{
			templateUrl:'views/home.html',
			contorller: 'HomeController'
		})	
		.when('/about', {
			templateUrl: 'views/about.html',
			controller: 'AboutController'
		})
		.when('/contact',{
			templateUrl: 'views/contact.html',
			controller: 'EmailController'
		})
		.when('/projects',{
			templateUrl: 'views/projects.html',
			controller: 'ProjectController'
		})	
		//this is incase we need to add the #!
	$locationProvider.html5Mode(
	true);
});