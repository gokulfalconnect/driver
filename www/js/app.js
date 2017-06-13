// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ngCordova'])

.run(function($ionicPlatform, $cordovaGeolocation) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
	
	
	var watchOptions = {
    timeout : 3000,
    enableHighAccuracy: false // may cause errors if true
  };

  var watch = $cordovaGeolocation.watchPosition(watchOptions);
  watch.then(
    null,
    function(err) {
		
      alert("error="+err);
    },
    function(position) {
		//alert("watch options="+position.coords.latitude);
		//alert("long="+position.coords.longitude);
      var lat  = position.coords.latitude;
      var long = position.coords.longitude;
  });
	
	
	
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
	
	$ionicConfigProvider.tabs.position('top');
	
  $stateProvider

    .state('app', {
		 cache: false,
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

.state('app.login', {
	 cache: false,
    url: '/login',
    views: {
      'menuContent': {
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
      }
    }
  })
  .state('app.home', {
	   cache: false,
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'templates/home.html',
        controller: 'HomeCtrl'
      }
    }
  })
  .state('app.view_order', {
	   cache: false,
    url: '/view_order:order_id',
    views: {
      'menuContent': {
        templateUrl: 'templates/view_order.html',
        controller: 'ViewOrderCtrl'
      }
    }
  })
   .state('app.map', {
	    cache: false,
    url: '/map',
    views: {
      'menuContent': {
        templateUrl: 'templates/map.html',
        controller: 'MapCtrl'
      }
    }
  })
  .state('app.rank', {
	   cache: false,
    url: '/rank',
    views: {
      'menuContent': {
        templateUrl: 'templates/rank.html',
        controller: 'RankCtrl'
      }
    }
  })
   .state('app.contact', {
	    cache: false,
    url: '/contact',
    views: {
      'menuContent': {
        templateUrl: 'templates/contact.html',
        controller: 'ContactCtrl'
      }
    }
  })
   .state('app.notification', {
	    cache: false,
    url: '/notification',
    views: {
      'menuContent': {
        templateUrl: 'templates/notification.html',
        controller: 'NotificationCtrl'
      }
    }
  })
   .state('app.myorders', {
	    cache: false,
    url: '/my_order',
    views: {
      'menuContent': {
        templateUrl: 'templates/my_order.html',
        controller: 'MyOrderCtrl'
      }
    }
  })
  .state('app.profile', {
	   cache: false,
    url: '/profile',
    views: {
      'menuContent': {
        templateUrl: 'templates/profile.html',
        controller: 'ProfileCtrl'
      }
    }
  })
  ;
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/login');
});
