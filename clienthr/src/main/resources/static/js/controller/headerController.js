
define(['require', 'angular'], function (require, angular) {

	app.aController(clienthr.prefix + 'headerController', function($rootScope, $scope, $translate, $translatePartialLoader, $mdDateLocale, moment) {
		if(typeof(clienthr.translate.header) === 'undefined' || clienthr.translate.header.indexOf($translate.use()) < 0) {
			if(typeof(clienthr.translate.header) === 'undefined') {
				clienthr.translate.header = '';
			}
			clienthr.translate.header += $translate.use() + ';';
			$translatePartialLoader.addPart(clienthr.contextPath + '/js/common/message/header');
		}
		
		var unRegister = $rootScope.$on('$translateChangeSuccess', function () {
		    $scope.title = $translate.instant('clienthr_header_title');
		});
		// Unregister
		$scope.$on('$destroy', function () {
		    unRegister();
		});		
		$translate.onReady().then(function() {
	    });

		$scope.goto = function(state, params) {
			delete $rootScope.menuActiveTitle;
			$state.go(clienthr.prefix + state, params);
		}

		$scope.changeLanguage = function(language) {
			gLanguage = language;
			require(['moment_' + gLanguage], function(){
				$translate.use(gLanguage);
				//$translate.refresh();
				// Change moment language.
			    moment.locale(gLanguage);
			    var localeData = moment.localeData();
			    $mdDateLocale.months      = localeData._months;
			    $mdDateLocale.shortMonths = moment.monthsShort();
			    $mdDateLocale.days        = localeData._weekdays;
			    $mdDateLocale.shortDays   = localeData._weekdaysMin;
			    $mdDateLocale.firstDayOfWeek = localeData._week.dow;
			});
			
		}
		

		$scope.openNav = function() {
		    document.getElementById("moduleNav").style.width = "100%";
		}
		
	});	
});
