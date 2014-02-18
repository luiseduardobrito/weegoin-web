var weegoinApp = angular.module('weegoinApp', [
	'ngRoute',
	'weegoinApp.controllers',
	'weegoinApp.services',
	'weegoinApp.directives',
]);

weegoinApp.config(['$routeProvider', '$locationProvider',
	function($routeProvider, $locationProvider) {
		$routeProvider

			.when('/', {
				redirectTo: "/places"
			})

			.when('/login', {
				controller: 'LoginCtrl',
				templateUrl: 'views/login.html'
			})

			.when('/places', {
				controller: 'PlacesCtrl',
				templateUrl: 'views/list.html'
			})

			.when('/place/:id', {
				templateUrl: 'views/place.html',
				controller: 'PlaceCtrl'	
			})

			.when('/place/:id/events', {
				templateUrl: 'views/events_place.html',
				controller: 'PlaceEventCtrl'	
			})

			.when('/event/:id', {
				templateUrl: 'views/event_private.html',
				controller: 'PrivateEventCtrl'	
			})

			.when('/contact', {
				templateUrl: 'views/contact.html',
				controller: 'ContactCtrl'	
			})

			.otherwise({
				redirectTo: "/places"
			})

		$locationProvider.html5Mode(false)
		$locationProvider.hashPrefix('!');
	}
])