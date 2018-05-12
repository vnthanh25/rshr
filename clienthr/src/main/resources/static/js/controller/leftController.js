
define(['require', 'angular'], function (require, angular) {

	app.aController(clienthr.prefix + 'leftController', function($rootScope, $scope, $state, $translate, $translatePartialLoader) {
		if(typeof(clienthr.translate.left) === 'undefined' || clienthr.translate.left.indexOf($translate.use()) < 0) {
			if(typeof(clienthr.translate.left) === 'undefined') {
				clienthr.translate.left = '';
			}
			clienthr.translate.left += $translate.use() + ';';
			$translatePartialLoader.addPart(clienthr.contextPath + '/js/common/message/left');
		}
		
		var unRegister = $rootScope.$on('$translateChangeSuccess', function () {
		    $scope.title = $translate.instant('clienthr_left_title');
		});
		// Unregister
		$scope.$on('$destroy', function () {
		    unRegister();
		});		
		$translate.onReady().then(function() {
	    	$scope.title = $translate.instant('clienthr_left_title');
	    });
		// goto.
		$scope.goto = function(state, params) {
			delete $rootScope.menuActiveTitle;
			$state.go(clienthr.prefix + state, params);
		}
	});
	
});
