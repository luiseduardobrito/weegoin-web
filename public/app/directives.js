var weegoinDirectives = angular.module('weegoinApp.directives', []);

weegoinDirectives.directive('locationPath', function($http, $location) {

	return {

		restrict: 'A',
		scope: true,
		link: function($scope, $elem, $attrs) {

			if($elem[0]) $elem = $elem[0];

			jQuery($elem).click(function(){

				$scope.$apply(function(){
					$location.path($attrs.locationPath);
				})
			})
		}
	}
});