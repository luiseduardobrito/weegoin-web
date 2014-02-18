var weegoinControllers = angular.module('weegoinApp.controllers', []);

weegoinControllers.controller('MainMenuCtrl',

	['$scope', '$http', '$location', 'user',

	function($scope, $http, $location, $user) {

		$scope.me = function(){
			return $user.me();
		}

		$scope.$watch('me()', function(val) {
			$scope.user = val
		})

		$scope.selectedIndex = 0;

		$scope.items = [

			{n: 1, label: "Estabelecimentos", value: "places"},
			{n: 2, label: "Calendário", value: "calendar"},
			// {n: 3, label: "Perfil", value: "profile"},
			// {n: 4, label: "Configurações", value: "settings"},
			// {n: 5, label: "Contato", value: "contact"}
		]

		$scope.state = function(s) {
			return s == $scope.selectedIndex ? 'current' : '';
		}

		$scope.goto = function(path) {

			for(var i = 0; i < $scope.items.length; i++) {
				if($scope.items[i].value == path)
					$scope.selectedIndex = $scope.items[i].n
			}

			$location.path(path);
		}

		$scope.performLogin = function() {
			
			$user.login(function(err, me) {
				$location.path("places");
			})
		}

		$scope.performLogout = function() {

			var response = $device.confirm("Tem certeza que deseja sair?");

			if(response) {

				$user.logout();
				$location.path("places");
			}
		}
	}
])

weegoinControllers.controller('HomeCtrl', 

	['$scope', '$http', '$location',

	function($scope, $http, $location) {
		return null;		
	}
])

weegoinControllers.controller('PlacesCtrl', 

	['$scope', '$http', '$location',

	function($scope, $http, $location) {
		return null;		
	}
])

weegoinControllers.controller('PlaceEventCtrl', 

	['$scope', '$http', '$location',

	function($scope, $http, $location) {
		return null;		
	}
])

weegoinControllers.controller('PublicEventCtrl', 

	['$scope', '$http', '$location', 'device',

	function($scope, $http, $location, $device) {
		
		$scope.share = function() {

			$device.share({
				message: "Mensagem exemplo",
				subject: "weego.in",
				image: 'https://fbcdn-sphotos-f-a.akamaihd.net/hphotos-ak-prn2/1395200_477436185703086_1623485670_n.jpg',
				link: 'http://weego.in'
			})
		}
	}
])

weegoinControllers.controller('PrivateEventCtrl', 

	['$scope', '$http', '$location', 'device',

	function($scope, $http, $location, $device) {
		
		$scope.share = function() {

			$device.share({
				message: "Mensagem exemplo",
				subject: "weego.in",
				image: 'https://fbcdn-sphotos-f-a.akamaihd.net/hphotos-ak-prn2/1395200_477436185703086_1623485670_n.jpg',
				link: 'http://weego.in'
			})
		}
	}
])

weegoinControllers.controller('ContactCtrl', 

	['$scope', '$http', '$location',

	function($scope, $http, $location) {
		return null;		
	}
])