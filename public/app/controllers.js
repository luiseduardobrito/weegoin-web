var weegoinControllers = angular.module('weegoinApp.controllers', []);

weegoinControllers.controller('ForceLoginCtrl',

	['$scope', '$http', '$location', 'user',

	function($scope, $http, $location, $user) {

		$scope.logged_in = false;

		$scope.checkUserStatus = function(){
			return $user.me();
		}

		$scope.$watch('checkUserStatus()', function(me) {

			if(me && $scope.logged_in == false) {

				$scope.logged_in = true;
				$location.path('places');
			}
		})

		$scope.checkLocationPath = function(){
			return $location.path();
		}

		$scope.$watch('checkLocationPath()', function(path) {

			if(!$scope.logged_in)
				$location.path("login");
		})
	}
])

weegoinControllers.controller('LoginCtrl',

	['$scope', '$http', '$location', 'user',

	function($scope, $http, $location, $user) {

		$scope.performLogin = function() {
			
			$user.login(function(err, me) {
				$location.path("places");
			})
		}
	}
])

weegoinControllers.controller('MainMenuCtrl',

	['$scope', '$http', '$location', 'user',

	function($scope, $http, $location, $user) {

		$scope.menuEnabled = false;

		$scope.me = function(){
			return $user.me();
		}

		$scope.$watch('me()', function(val) {

			if(val) {

				$scope.user = val
				$scope.menuEnabled = true;
			}
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

		$scope.confirm = function(event_id) {

			$user.confirmPresence(event_id, function(err, data) {

				if(err) {

					console.log(err);

					alert("Não foi possível confirmar sua presença nesse evento. "
						+ "Por favor, tente novamente. "
						+ "Se o problema persistir verifique se o prazo de abertuda da lista expirou"
					);
				}

				else {

					alert("Sua presença foi confirmada com sucesso. Boa festa!");
				}
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