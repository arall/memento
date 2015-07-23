(function(){
	"use strict";

	var app = angular.module('app',
		[
		'app.controllers',
		'app.filters',
		'app.services',
		'app.directives',
		'app.routes',
		'app.config',
		]);

	angular.module('app.routes', ['ui.router', 'ngStorage', 'satellizer']);
	angular.module('app.controllers', ['ui.router', 'ngMaterial', 'ngStorage', 'restangular', 'ngMdIcons']);
	angular.module('app.filters', []);
	angular.module('app.services', ['ui.router', 'ngStorage', 'restangular']);
	angular.module('app.directives', []);
	angular.module('app.config', []);

})();
(function(){
	"use strict";

	angular.module('app.routes').config( ["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider ) {

		var getView = function( viewName ){
			return '/views/app/' + viewName + '/' + viewName + '.html';
		};

		$urlRouterProvider.otherwise('/');

		$stateProvider
		.state('landing', {
			url: '/',
			views: {
				main: {
					templateUrl: getView('landing')
				}
			}
		}).state('dashboard', {
			url: '/dashboard',
			views: {
				main: {
					templateUrl: getView('dashboard')
				},
				footer: {
					templateUrl: getView('footer')
				}
			}
		});


	}] );
})();
(function(){
	"use strict";

	angular.module('app.filters').filter( 'capitalize', function(){
		return function(input, all) {
			return (!!input) ? input.replace(/([^\W_]+[^\s-]*) */g,function(txt){
				return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
			}) : '';
		};
	});
})();
(function(){
	"use strict";

	angular.module('app.filters').filter( 't', ["$filter", function( $filter ){
		return function( text ){
			text = $filter('translate')(text);
			return $filter('ucfirst')(text);
		};
	}]);
})();
(function(){
	"use strict";

	angular.module('app.filters').filter( 'trustHtml', ["$sce", function( $sce ){
		return function( html ){
			return $sce.trustAsHtml(html);
		};
	}]);
})();
(function(){
	"use strict";

	angular.module('app.filters').filter('ucfirst', function() {
		return function( input ) {
			if ( !input ){
				return null;
			}
			return input.substring(0, 1).toUpperCase() + input.substring(1);
		};
	});

})();

(function(){
	"use strict";

	angular.module('app.config').config( ["RestangularProvider", function(RestangularProvider) {
		RestangularProvider
		.setBaseUrl('/api/1/');
	}]);

})();
(function (){
    "use strict";

    angular.module('app.config').config(["$authProvider", function ($authProvider){
        // Satellizer configuration that specifies which API
        // route the JWT should be retrieved from
        $authProvider.loginUrl = '/api/1/authenticate';
    }]);

})();
(function(){
	"use strict";

	angular.module('app.config').config( ["$mdThemingProvider", function($mdThemingProvider) {
		/* For more info, visit https://material.angularjs.org/#/Theming/01_introduction */
		$mdThemingProvider.theme('default')
		.primaryPalette('teal')
		.accentPalette('cyan')
		.warnPalette('red');
	}]);

})();
(function(){
	"use strict";

	angular.module('app.controllers').controller('DashboardCtrl', ["$scope", "Restangular", function( $scope, Restangular ){


		$scope.sample_test = function(){
			$scope.sample_data = 'Loading..';
			Restangular.all('test/sample').post().then(function( response ){
				$scope.sample_data = response.data;
			});
		};

	}]);

})();

(function(){
	"use strict";

	angular.module('app.controllers').controller('LandingCtrl', ["$scope", "$mdToast", "$mdDialog", "$interval", function( $scope, $mdToast, $mdDialog, $interval ){

		$scope.promoImage = 'https://i.imgur.com/XiMykki.png';
		$scope.icon = 'send';

		var icons = [
		'office', 'facebook', 'twitter', 'apple', 'whatsapp', 'linkedin', 'windows', 'accessibility', 'alarm', 'aspect_ratio',
		'autorenew', 'bookmark_outline', 'dashboard', 'dns', 'favorite_outline', 'get_app', 'highlight_remove', 'history', 'list',
		'picture_in_picture', 'print', 'settings_ethernet', 'settings_power', 'shopping_cart', 'spellcheck', 'swap_horiz', 'swap_vert',
		'thumb_up', 'thumbs_up_down', 'translate', 'trending_up', 'visibility', 'warning', 'mic', 'play_circle_outline', 'repeat',
		'skip_next', 'call', 'chat', 'clear_all', 'dialpad', 'dnd_on', 'forum', 'location_on', 'vpn_key', 'filter_list', 'inbox',
		'link', 'remove_circle_outline', 'save', 'text_format', 'access_time', 'airplanemode_on', 'bluetooth', 'data_usage',
		'gps_fixed', 'now_wallpaper', 'now_widgets', 'storage', 'wifi_tethering', 'attach_file', 'format_line_spacing',
		'format_list_numbered', 'format_quote', 'vertical_align_center', 'wrap_text', 'cloud_queue', 'file_download', 'folder_open',
		'cast', 'headset', 'keyboard_backspace', 'mouse', 'speaker', 'watch', 'audiotrack', 'edit', 'brush', 'looks', 'crop_free',
		'camera', 'filter_vintage', 'hdr_strong', 'photo_camera', 'slideshow', 'timer', 'directions_bike', 'hotel', 'local_library',
		'directions_walk', 'local_cafe', 'local_pizza', 'local_florist', 'my_location', 'navigation', 'pin_drop', 'arrow_back', 'menu',
		'close', 'more_horiz', 'more_vert', 'refresh', 'phone_paused', 'vibration', 'cake', 'group', 'mood', 'person',
		'notifications_none', 'plus_one', 'school', 'share', 'star_outline'
		],
		counter = 0;

		$interval(function(){
			$scope.icon = icons[++counter];
			if ( counter > 112 ){
				counter = 0;
			}
		}, 2000);

		$scope.toastNotification = function(){
			$mdToast.show(
				$mdToast.simple()
				.content('This is a toast notification!')
				.position('top right')
				.hideDelay(3000)
				);
		};

		$scope.showDialog = function( event ){
			$mdDialog.show(
				$mdDialog.alert()
				.parent(angular.element(document.body))
				.title('This is an alert title')
				.content('You can specify some description text in here.')
				.ariaLabel('Alert Dialog Demo')
				.ok('Got it!')
				.targetEvent(event)
				);
		};

	}]);

})();
(function (){
    "use strict";

    angular.module('app.controllers').controller('LoginCtrl', ["$scope", "Restangular", "$auth", "$state", function ($scope, Restangular, $auth, $state){

        // Use Satellizer's $auth service to login because it'll automatically save the JWT in localStorage
        $auth.login(credentials).then(function (data){
            // If login is successful, redirect to the users state
            $state.go('dashboard');
        });


        // This request will hit the getData method in the AuthenticateController
        // on the Laravel side and will return your data that require authentication
        Restangular.all('api/authenticate/data').get().then(function (response){

        }, function (error){

        });

    }]);

})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9tYWluLmpzIiwiYXBwL3JvdXRlcy5qcyIsImZpbHRlcnMvY2FwaXRhbGl6ZS5qcyIsImZpbHRlcnMvdHJhbnNsYXRpb25zLmpzIiwiZmlsdGVycy90cnVzdF9odG1sLmpzIiwiZmlsdGVycy91Y2ZpcnN0LmpzIiwiY29uZmlnL3Jlc3Rhbmd1bGFyLmpzIiwiY29uZmlnL3NhdGVsbGl6ZXIuanMiLCJjb25maWcvdGhlbWUuanMiLCJhcHAvZGFzaGJvYXJkL2Rhc2hib2FyZC5qcyIsImFwcC9mb290ZXIvZm9vdGVyLmpzIiwiYXBwL2xhbmRpbmcvbGFuZGluZy5qcyIsImFwcC9sb2dpbi9sb2dpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNmQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtcblx0XCJ1c2Ugc3RyaWN0XCI7XG5cblx0dmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdhcHAnLFxuXHRcdFtcblx0XHQnYXBwLmNvbnRyb2xsZXJzJyxcblx0XHQnYXBwLmZpbHRlcnMnLFxuXHRcdCdhcHAuc2VydmljZXMnLFxuXHRcdCdhcHAuZGlyZWN0aXZlcycsXG5cdFx0J2FwcC5yb3V0ZXMnLFxuXHRcdCdhcHAuY29uZmlnJyxcblx0XHRdKTtcblxuXHRhbmd1bGFyLm1vZHVsZSgnYXBwLnJvdXRlcycsIFsndWkucm91dGVyJywgJ25nU3RvcmFnZScsICdzYXRlbGxpemVyJ10pO1xuXHRhbmd1bGFyLm1vZHVsZSgnYXBwLmNvbnRyb2xsZXJzJywgWyd1aS5yb3V0ZXInLCAnbmdNYXRlcmlhbCcsICduZ1N0b3JhZ2UnLCAncmVzdGFuZ3VsYXInLCAnbmdNZEljb25zJ10pO1xuXHRhbmd1bGFyLm1vZHVsZSgnYXBwLmZpbHRlcnMnLCBbXSk7XG5cdGFuZ3VsYXIubW9kdWxlKCdhcHAuc2VydmljZXMnLCBbJ3VpLnJvdXRlcicsICduZ1N0b3JhZ2UnLCAncmVzdGFuZ3VsYXInXSk7XG5cdGFuZ3VsYXIubW9kdWxlKCdhcHAuZGlyZWN0aXZlcycsIFtdKTtcblx0YW5ndWxhci5tb2R1bGUoJ2FwcC5jb25maWcnLCBbXSk7XG5cbn0pKCk7IiwiKGZ1bmN0aW9uKCl7XG5cdFwidXNlIHN0cmljdFwiO1xuXG5cdGFuZ3VsYXIubW9kdWxlKCdhcHAucm91dGVzJykuY29uZmlnKCBmdW5jdGlvbigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyICkge1xuXG5cdFx0dmFyIGdldFZpZXcgPSBmdW5jdGlvbiggdmlld05hbWUgKXtcblx0XHRcdHJldHVybiAnL3ZpZXdzL2FwcC8nICsgdmlld05hbWUgKyAnLycgKyB2aWV3TmFtZSArICcuaHRtbCc7XG5cdFx0fTtcblxuXHRcdCR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy8nKTtcblxuXHRcdCRzdGF0ZVByb3ZpZGVyXG5cdFx0LnN0YXRlKCdsYW5kaW5nJywge1xuXHRcdFx0dXJsOiAnLycsXG5cdFx0XHR2aWV3czoge1xuXHRcdFx0XHRtYWluOiB7XG5cdFx0XHRcdFx0dGVtcGxhdGVVcmw6IGdldFZpZXcoJ2xhbmRpbmcnKVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSkuc3RhdGUoJ2Rhc2hib2FyZCcsIHtcblx0XHRcdHVybDogJy9kYXNoYm9hcmQnLFxuXHRcdFx0dmlld3M6IHtcblx0XHRcdFx0bWFpbjoge1xuXHRcdFx0XHRcdHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdkYXNoYm9hcmQnKVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRmb290ZXI6IHtcblx0XHRcdFx0XHR0ZW1wbGF0ZVVybDogZ2V0VmlldygnZm9vdGVyJylcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXG5cblx0fSApO1xufSkoKTsiLCIoZnVuY3Rpb24oKXtcblx0XCJ1c2Ugc3RyaWN0XCI7XG5cblx0YW5ndWxhci5tb2R1bGUoJ2FwcC5maWx0ZXJzJykuZmlsdGVyKCAnY2FwaXRhbGl6ZScsIGZ1bmN0aW9uKCl7XG5cdFx0cmV0dXJuIGZ1bmN0aW9uKGlucHV0LCBhbGwpIHtcblx0XHRcdHJldHVybiAoISFpbnB1dCkgPyBpbnB1dC5yZXBsYWNlKC8oW15cXFdfXStbXlxccy1dKikgKi9nLGZ1bmN0aW9uKHR4dCl7XG5cdFx0XHRcdHJldHVybiB0eHQuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyB0eHQuc3Vic3RyKDEpLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHR9KSA6ICcnO1xuXHRcdH07XG5cdH0pO1xufSkoKTsiLCIoZnVuY3Rpb24oKXtcblx0XCJ1c2Ugc3RyaWN0XCI7XG5cblx0YW5ndWxhci5tb2R1bGUoJ2FwcC5maWx0ZXJzJykuZmlsdGVyKCAndCcsIGZ1bmN0aW9uKCAkZmlsdGVyICl7XG5cdFx0cmV0dXJuIGZ1bmN0aW9uKCB0ZXh0ICl7XG5cdFx0XHR0ZXh0ID0gJGZpbHRlcigndHJhbnNsYXRlJykodGV4dCk7XG5cdFx0XHRyZXR1cm4gJGZpbHRlcigndWNmaXJzdCcpKHRleHQpO1xuXHRcdH07XG5cdH0pO1xufSkoKTsiLCIoZnVuY3Rpb24oKXtcblx0XCJ1c2Ugc3RyaWN0XCI7XG5cblx0YW5ndWxhci5tb2R1bGUoJ2FwcC5maWx0ZXJzJykuZmlsdGVyKCAndHJ1c3RIdG1sJywgZnVuY3Rpb24oICRzY2UgKXtcblx0XHRyZXR1cm4gZnVuY3Rpb24oIGh0bWwgKXtcblx0XHRcdHJldHVybiAkc2NlLnRydXN0QXNIdG1sKGh0bWwpO1xuXHRcdH07XG5cdH0pO1xufSkoKTsiLCIoZnVuY3Rpb24oKXtcblx0XCJ1c2Ugc3RyaWN0XCI7XG5cblx0YW5ndWxhci5tb2R1bGUoJ2FwcC5maWx0ZXJzJykuZmlsdGVyKCd1Y2ZpcnN0JywgZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIGZ1bmN0aW9uKCBpbnB1dCApIHtcblx0XHRcdGlmICggIWlucHV0ICl7XG5cdFx0XHRcdHJldHVybiBudWxsO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGlucHV0LnN1YnN0cmluZygwLCAxKS50b1VwcGVyQ2FzZSgpICsgaW5wdXQuc3Vic3RyaW5nKDEpO1xuXHRcdH07XG5cdH0pO1xuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCl7XG5cdFwidXNlIHN0cmljdFwiO1xuXG5cdGFuZ3VsYXIubW9kdWxlKCdhcHAuY29uZmlnJykuY29uZmlnKCBmdW5jdGlvbihSZXN0YW5ndWxhclByb3ZpZGVyKSB7XG5cdFx0UmVzdGFuZ3VsYXJQcm92aWRlclxuXHRcdC5zZXRCYXNlVXJsKCcvYXBpLzEvJyk7XG5cdH0pO1xuXG59KSgpOyIsIihmdW5jdGlvbiAoKXtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdhcHAuY29uZmlnJykuY29uZmlnKGZ1bmN0aW9uICgkYXV0aFByb3ZpZGVyKXtcbiAgICAgICAgLy8gU2F0ZWxsaXplciBjb25maWd1cmF0aW9uIHRoYXQgc3BlY2lmaWVzIHdoaWNoIEFQSVxuICAgICAgICAvLyByb3V0ZSB0aGUgSldUIHNob3VsZCBiZSByZXRyaWV2ZWQgZnJvbVxuICAgICAgICAkYXV0aFByb3ZpZGVyLmxvZ2luVXJsID0gJy9hcGkvMS9hdXRoZW50aWNhdGUnO1xuICAgIH0pO1xuXG59KSgpOyIsIihmdW5jdGlvbigpe1xuXHRcInVzZSBzdHJpY3RcIjtcblxuXHRhbmd1bGFyLm1vZHVsZSgnYXBwLmNvbmZpZycpLmNvbmZpZyggZnVuY3Rpb24oJG1kVGhlbWluZ1Byb3ZpZGVyKSB7XG5cdFx0LyogRm9yIG1vcmUgaW5mbywgdmlzaXQgaHR0cHM6Ly9tYXRlcmlhbC5hbmd1bGFyanMub3JnLyMvVGhlbWluZy8wMV9pbnRyb2R1Y3Rpb24gKi9cblx0XHQkbWRUaGVtaW5nUHJvdmlkZXIudGhlbWUoJ2RlZmF1bHQnKVxuXHRcdC5wcmltYXJ5UGFsZXR0ZSgndGVhbCcpXG5cdFx0LmFjY2VudFBhbGV0dGUoJ2N5YW4nKVxuXHRcdC53YXJuUGFsZXR0ZSgncmVkJyk7XG5cdH0pO1xuXG59KSgpOyIsIihmdW5jdGlvbigpe1xuXHRcInVzZSBzdHJpY3RcIjtcblxuXHRhbmd1bGFyLm1vZHVsZSgnYXBwLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignRGFzaGJvYXJkQ3RybCcsIGZ1bmN0aW9uKCAkc2NvcGUsIFJlc3Rhbmd1bGFyICl7XG5cblxuXHRcdCRzY29wZS5zYW1wbGVfdGVzdCA9IGZ1bmN0aW9uKCl7XG5cdFx0XHQkc2NvcGUuc2FtcGxlX2RhdGEgPSAnTG9hZGluZy4uJztcblx0XHRcdFJlc3Rhbmd1bGFyLmFsbCgndGVzdC9zYW1wbGUnKS5wb3N0KCkudGhlbihmdW5jdGlvbiggcmVzcG9uc2UgKXtcblx0XHRcdFx0JHNjb3BlLnNhbXBsZV9kYXRhID0gcmVzcG9uc2UuZGF0YTtcblx0XHRcdH0pO1xuXHRcdH07XG5cblx0fSk7XG5cbn0pKCk7IiwiIiwiKGZ1bmN0aW9uKCl7XG5cdFwidXNlIHN0cmljdFwiO1xuXG5cdGFuZ3VsYXIubW9kdWxlKCdhcHAuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdMYW5kaW5nQ3RybCcsIGZ1bmN0aW9uKCAkc2NvcGUsICRtZFRvYXN0LCAkbWREaWFsb2csICRpbnRlcnZhbCApe1xuXG5cdFx0JHNjb3BlLnByb21vSW1hZ2UgPSAnaHR0cHM6Ly9pLmltZ3VyLmNvbS9YaU15a2tpLnBuZyc7XG5cdFx0JHNjb3BlLmljb24gPSAnc2VuZCc7XG5cblx0XHR2YXIgaWNvbnMgPSBbXG5cdFx0J29mZmljZScsICdmYWNlYm9vaycsICd0d2l0dGVyJywgJ2FwcGxlJywgJ3doYXRzYXBwJywgJ2xpbmtlZGluJywgJ3dpbmRvd3MnLCAnYWNjZXNzaWJpbGl0eScsICdhbGFybScsICdhc3BlY3RfcmF0aW8nLFxuXHRcdCdhdXRvcmVuZXcnLCAnYm9va21hcmtfb3V0bGluZScsICdkYXNoYm9hcmQnLCAnZG5zJywgJ2Zhdm9yaXRlX291dGxpbmUnLCAnZ2V0X2FwcCcsICdoaWdobGlnaHRfcmVtb3ZlJywgJ2hpc3RvcnknLCAnbGlzdCcsXG5cdFx0J3BpY3R1cmVfaW5fcGljdHVyZScsICdwcmludCcsICdzZXR0aW5nc19ldGhlcm5ldCcsICdzZXR0aW5nc19wb3dlcicsICdzaG9wcGluZ19jYXJ0JywgJ3NwZWxsY2hlY2snLCAnc3dhcF9ob3JpeicsICdzd2FwX3ZlcnQnLFxuXHRcdCd0aHVtYl91cCcsICd0aHVtYnNfdXBfZG93bicsICd0cmFuc2xhdGUnLCAndHJlbmRpbmdfdXAnLCAndmlzaWJpbGl0eScsICd3YXJuaW5nJywgJ21pYycsICdwbGF5X2NpcmNsZV9vdXRsaW5lJywgJ3JlcGVhdCcsXG5cdFx0J3NraXBfbmV4dCcsICdjYWxsJywgJ2NoYXQnLCAnY2xlYXJfYWxsJywgJ2RpYWxwYWQnLCAnZG5kX29uJywgJ2ZvcnVtJywgJ2xvY2F0aW9uX29uJywgJ3Zwbl9rZXknLCAnZmlsdGVyX2xpc3QnLCAnaW5ib3gnLFxuXHRcdCdsaW5rJywgJ3JlbW92ZV9jaXJjbGVfb3V0bGluZScsICdzYXZlJywgJ3RleHRfZm9ybWF0JywgJ2FjY2Vzc190aW1lJywgJ2FpcnBsYW5lbW9kZV9vbicsICdibHVldG9vdGgnLCAnZGF0YV91c2FnZScsXG5cdFx0J2dwc19maXhlZCcsICdub3dfd2FsbHBhcGVyJywgJ25vd193aWRnZXRzJywgJ3N0b3JhZ2UnLCAnd2lmaV90ZXRoZXJpbmcnLCAnYXR0YWNoX2ZpbGUnLCAnZm9ybWF0X2xpbmVfc3BhY2luZycsXG5cdFx0J2Zvcm1hdF9saXN0X251bWJlcmVkJywgJ2Zvcm1hdF9xdW90ZScsICd2ZXJ0aWNhbF9hbGlnbl9jZW50ZXInLCAnd3JhcF90ZXh0JywgJ2Nsb3VkX3F1ZXVlJywgJ2ZpbGVfZG93bmxvYWQnLCAnZm9sZGVyX29wZW4nLFxuXHRcdCdjYXN0JywgJ2hlYWRzZXQnLCAna2V5Ym9hcmRfYmFja3NwYWNlJywgJ21vdXNlJywgJ3NwZWFrZXInLCAnd2F0Y2gnLCAnYXVkaW90cmFjaycsICdlZGl0JywgJ2JydXNoJywgJ2xvb2tzJywgJ2Nyb3BfZnJlZScsXG5cdFx0J2NhbWVyYScsICdmaWx0ZXJfdmludGFnZScsICdoZHJfc3Ryb25nJywgJ3Bob3RvX2NhbWVyYScsICdzbGlkZXNob3cnLCAndGltZXInLCAnZGlyZWN0aW9uc19iaWtlJywgJ2hvdGVsJywgJ2xvY2FsX2xpYnJhcnknLFxuXHRcdCdkaXJlY3Rpb25zX3dhbGsnLCAnbG9jYWxfY2FmZScsICdsb2NhbF9waXp6YScsICdsb2NhbF9mbG9yaXN0JywgJ215X2xvY2F0aW9uJywgJ25hdmlnYXRpb24nLCAncGluX2Ryb3AnLCAnYXJyb3dfYmFjaycsICdtZW51Jyxcblx0XHQnY2xvc2UnLCAnbW9yZV9ob3JpeicsICdtb3JlX3ZlcnQnLCAncmVmcmVzaCcsICdwaG9uZV9wYXVzZWQnLCAndmlicmF0aW9uJywgJ2Nha2UnLCAnZ3JvdXAnLCAnbW9vZCcsICdwZXJzb24nLFxuXHRcdCdub3RpZmljYXRpb25zX25vbmUnLCAncGx1c19vbmUnLCAnc2Nob29sJywgJ3NoYXJlJywgJ3N0YXJfb3V0bGluZSdcblx0XHRdLFxuXHRcdGNvdW50ZXIgPSAwO1xuXG5cdFx0JGludGVydmFsKGZ1bmN0aW9uKCl7XG5cdFx0XHQkc2NvcGUuaWNvbiA9IGljb25zWysrY291bnRlcl07XG5cdFx0XHRpZiAoIGNvdW50ZXIgPiAxMTIgKXtcblx0XHRcdFx0Y291bnRlciA9IDA7XG5cdFx0XHR9XG5cdFx0fSwgMjAwMCk7XG5cblx0XHQkc2NvcGUudG9hc3ROb3RpZmljYXRpb24gPSBmdW5jdGlvbigpe1xuXHRcdFx0JG1kVG9hc3Quc2hvdyhcblx0XHRcdFx0JG1kVG9hc3Quc2ltcGxlKClcblx0XHRcdFx0LmNvbnRlbnQoJ1RoaXMgaXMgYSB0b2FzdCBub3RpZmljYXRpb24hJylcblx0XHRcdFx0LnBvc2l0aW9uKCd0b3AgcmlnaHQnKVxuXHRcdFx0XHQuaGlkZURlbGF5KDMwMDApXG5cdFx0XHRcdCk7XG5cdFx0fTtcblxuXHRcdCRzY29wZS5zaG93RGlhbG9nID0gZnVuY3Rpb24oIGV2ZW50ICl7XG5cdFx0XHQkbWREaWFsb2cuc2hvdyhcblx0XHRcdFx0JG1kRGlhbG9nLmFsZXJ0KClcblx0XHRcdFx0LnBhcmVudChhbmd1bGFyLmVsZW1lbnQoZG9jdW1lbnQuYm9keSkpXG5cdFx0XHRcdC50aXRsZSgnVGhpcyBpcyBhbiBhbGVydCB0aXRsZScpXG5cdFx0XHRcdC5jb250ZW50KCdZb3UgY2FuIHNwZWNpZnkgc29tZSBkZXNjcmlwdGlvbiB0ZXh0IGluIGhlcmUuJylcblx0XHRcdFx0LmFyaWFMYWJlbCgnQWxlcnQgRGlhbG9nIERlbW8nKVxuXHRcdFx0XHQub2soJ0dvdCBpdCEnKVxuXHRcdFx0XHQudGFyZ2V0RXZlbnQoZXZlbnQpXG5cdFx0XHRcdCk7XG5cdFx0fTtcblxuXHR9KTtcblxufSkoKTsiLCIoZnVuY3Rpb24gKCl7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignTG9naW5DdHJsJywgZnVuY3Rpb24gKCRzY29wZSwgUmVzdGFuZ3VsYXIsICRhdXRoLCAkc3RhdGUpe1xuXG4gICAgICAgIC8vIFVzZSBTYXRlbGxpemVyJ3MgJGF1dGggc2VydmljZSB0byBsb2dpbiBiZWNhdXNlIGl0J2xsIGF1dG9tYXRpY2FsbHkgc2F2ZSB0aGUgSldUIGluIGxvY2FsU3RvcmFnZVxuICAgICAgICAkYXV0aC5sb2dpbihjcmVkZW50aWFscykudGhlbihmdW5jdGlvbiAoZGF0YSl7XG4gICAgICAgICAgICAvLyBJZiBsb2dpbiBpcyBzdWNjZXNzZnVsLCByZWRpcmVjdCB0byB0aGUgdXNlcnMgc3RhdGVcbiAgICAgICAgICAgICRzdGF0ZS5nbygnZGFzaGJvYXJkJyk7XG4gICAgICAgIH0pO1xuXG5cbiAgICAgICAgLy8gVGhpcyByZXF1ZXN0IHdpbGwgaGl0IHRoZSBnZXREYXRhIG1ldGhvZCBpbiB0aGUgQXV0aGVudGljYXRlQ29udHJvbGxlclxuICAgICAgICAvLyBvbiB0aGUgTGFyYXZlbCBzaWRlIGFuZCB3aWxsIHJldHVybiB5b3VyIGRhdGEgdGhhdCByZXF1aXJlIGF1dGhlbnRpY2F0aW9uXG4gICAgICAgIFJlc3Rhbmd1bGFyLmFsbCgnYXBpL2F1dGhlbnRpY2F0ZS9kYXRhJykuZ2V0KCkudGhlbihmdW5jdGlvbiAocmVzcG9uc2Upe1xuXG4gICAgICAgIH0sIGZ1bmN0aW9uIChlcnJvcil7XG5cbiAgICAgICAgfSk7XG5cbiAgICB9KTtcblxufSkoKTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=