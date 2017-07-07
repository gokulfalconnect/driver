// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ngCordova'])

.run(function($ionicPlatform, $cordovaGeolocation,$ionicLoading,$http ,$ionicPopup) {
  $ionicPlatform.ready(function() {
	  
	  
	  
	  
	  
	var deviceType = (navigator.userAgent.match(/iPad/i))  == "iPad" ? "iPad" : (navigator.userAgent.match(/iPhone/i))  == "iPhone" ? "iPhone" : (navigator.userAgent.match(/Android/i)) == "Android" ? "Android" : (navigator.userAgent.match(/BlackBerry/i)) == "BlackBerry" ? "BlackBerry" : "null";
	window.localStorage.setItem('deviceType',deviceType);
	
	//alert("device="+deviceType);
		
	 if(deviceType=='Android')
	 {
		 
		
		
		
		var pushNotification = window.plugins.pushNotification; 
	pushNotification. register(successHandler,errorHandler,{"senderID":"644543420118","ecb":"onNotificationGCM"}); 


	function successHandler(result) { 
	
	}
	function errorHandler(error) { 
	
	}
	 }
	else
	{
		//alert("else");
	 	
	}
	

	onNotificationGCM = function(result) {
		
        // alert("gcm="+JSON.stringify(result));
		
		 switch( result.event )
       {
           case 'registered':
               if ( result.regid.length > 0 )
               {
                 window.localStorage.setItem('app_id',result.regid);
				// alert("app id="+result.regid);
               }
           break;

           case 'message':
		 // alert("11");
             // this is the actual push notification. its format depends on the data model from the push server
			//alert("res="+JSON.stringify(result));
			
			
			
			var myMedia = new Media('/android_asset/www/music/beep-2.mp3');
				myMedia.play();
				
				//alert(result.message);
				
				var alertPopup = $ionicPopup.alert({
						 title: 'DelBoy',
						 template: result.message
					  });
				$state.go('app.view_order',{'order_id':result.payload.order_id});
           
           break;
		   

           case 'error':
             alert('GCM error = '+result.msg);
			 
           break;

           default:
             alert('An unknown GCM event has occurred');
             break;
       }
			
     }
	  
	  
	  
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
    enableHighAccuracy: true // may cause errors if true
  };

  var watch = $cordovaGeolocation.watchPosition(watchOptions);
  watch.then(
    null,
    function(err) {
		
      alert("error="+err);
    },
    function(position) {
		//alert("pos");
	//	alert("a="+window.localStorage.getItem('user_id'));
		if(window.localStorage.getItem('user_id')!= null)
		{
			var location_info={};
			
			location_info.deliverboy_id = window.localStorage.getItem('user_id');
			
			location_info.latitude  = position.coords.latitude;
			location_info.longitude  = position.coords.longitude;
			
			//alert("watch options="+position.coords.latitude);
			//alert("long="+position.coords.longitude);
			
			$http({
								url: server+'doDeliveryboyUpdatelocation',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify(location_info),
							})
							.success(function(response) {
										
								//$ionicLoading.hide();
									//alert(JSON.stringify(response));					
							}, 
						
							function(response) { // optional
							
								//$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									//$ionicLoading.hide();
									//alert("error="+data);
									alert("Network error. Please try after some time");
							
									
								});
			
		}
		
		
		//alert("watch options="+position.coords.latitude);
		//alert("long="+position.coords.longitude);
      
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
  .state('app.deliver_sucess', {
	    cache: false,
    url: '/deliver_sucess',
    views: {
      'menuContent': {
        templateUrl: 'templates/deliver_sucess.html',
		
        controller: 'DeliverSucessCtrl'
      }
    }
  })
   .state('app.history_view', {
	    cache: false,
    url: '/history_view:order_id',
    views: {
      'menuContent': {
        templateUrl: 'templates/history_view.html',
		
        controller: 'HistoryViewCtrl'
      }
    }
  })

   .state('app.coupons', {
      cache: false,
    url: '/coupons',
    views: {
      'menuContent': {
        templateUrl: 'templates/coupons.html'
      }
    }
  })

   
  .state('app.feedback', {
      cache: false,
    url: '/feedback',
    views: {
      'menuContent': {
        templateUrl: 'templates/feedback.html'
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
 
  if(window.localStorage.getItem('user_id')!=null&&window.localStorage.getItem('user_id')!=''){
		
	
			$urlRouterProvider.otherwise('/app/home');
			
			
  }else{
	 
	  $urlRouterProvider.otherwise('/app/login');
  }
  // if none of the above states are matched, use this as the fallback
  
});
