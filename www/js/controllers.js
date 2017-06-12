
	server   = 'http://www.falconnect.in/restaurantdemo/public/api/';

   //    server = 'http://localhost/falconnect/falconnectwebsite/restaurantdemo/public/api/';

angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $state, $ionicLoading, $ionicHistory, $ionicSideMenuDelegate, $ionicHistory,$rootScope) {

	$rootScope.back_show = '0';
	
	$scope.driver = {};
	
	$scope.driver.text = "online";
	
	$scope.driver.status = true;

    $scope.goBack = function()
	{
		$ionicHistory.goBack();
		
	}


	$scope.logout = function()
	{
		  
	  $ionicLoading.show({
								  template: 'Logging out...'
								});
								
								 window.localStorage.setItem('user_id','');
						  						  
		 $ionicHistory.clearCache(); 
		
		$ionicHistory.clearHistory();
		
		$ionicLoading.hide();
		
		$state.go('app.login');
	}
	
	$scope.go_profile = function()
	{
		$state.go('app.profile');
		 $ionicSideMenuDelegate.toggleLeft();
	}
	
	$scope.change_toggle = function()
	{
		if($scope.driver.status == true)
		{
			
			$scope.driver.text = "online";
		}
		else
		{
			
			$scope.driver.text = "Offine";
		}
	}
	
})


.controller('LoginCtrl', function($scope, $ionicSideMenuDelegate,$ionicModal,$state, $rootScope, $ionicLoading, $http ){
	
	$rootScope.back_show = '0';
	
	$ionicSideMenuDelegate.canDragContent(false);
	
	$scope.logindata = {};
	  
	  $scope.registerdata = {};
	  
	  $scope.driver_data = {};
	  
	  $scope.frgtpwd = {};
	  
	  $scope.user_login = function()
	  {
		  
		  
		$ionicLoading.show();
			
	$http({
								url: server+'doEmployeeLogin',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.logindata),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
								
								
								
								if(response.Result == 0)
								{
									alert(JSON.stringify(response.message));
								}
							else
							{
									$scope.driver_data = response.employeedetails;
									
									//alert(JSON.stringify($scope.driver_data));
									
									//alert("re="+$scope.driver_data[0].phone);
									
									window.localStorage.setItem('user_id', $scope.driver_data[0].id);
									
									window.localStorage.setItem('name', $scope.driver_data[0].employee_name);
									
									window.localStorage.setItem('phone', $scope.driver_data[0].phone);
									
								
								$state.go('app.home');
							}
							
							
								
														
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error="+data);
									alert("Network error. Please try after some time");
							
									
								});
		 
		  
	  }
	  
	    $scope.open_forget_pwd = function()
	  {
		  $scope.openmodal();
	  }
	  
	 $scope.openmodal = function()
	{
		$ionicModal.fromTemplateUrl('templates/forgot_password.html', {
						scope: $scope
					  }).then(function(modal) {
						  
							
							$scope.modal = modal;
							$scope.modal.show();
														
					  });
	}
	
	$scope.closeModal =  function()
	 {
		  $scope.modal.remove();
	 }
	 
	 $scope.pwd_data = function()
	 {
		if($scope.frgtpwd.email == undefined)
		{
			alert("Please enter a valid email and proceed");
		}
		else
		{
			alert("Please check you mail for password");
			
			$scope.closeModal();
		}
		 
		 
	 }
	
}).controller('HomeCtrl', function($scope, $rootScope){
	
	$rootScope.back_show = '0';
	
	$rootScope.show_home = '0';
	
	
}).controller('ProfileCtrl', function($scope,$rootScope,$ionicLoading,$http){
	
	$rootScope.back_show = '1';
	
	$rootScope.show_home = '1';
	
	$scope.profileinfo = {};
	
	$scope.profiledata = {};
	
	$scope.profileinfo.employee_id = window.localStorage.getItem('user_id');
	
		$ionicLoading.show();
			
	$http({
								url: server+'doEmployeeViewProfile',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.profileinfo),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
								
							$scope.profiledata = response.employeedetails;
							
														
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error="+data);
									alert("Network error. Please try after some time");
							
									
								});
		 
	
	
}).controller('ViewOrderCtrl', function($scope, $ionicModal,  $ionicActionSheet,$rootScope){
	
	$rootScope.back_show = '1';
	
	$scope.delivery_status = {};
	
	$scope.delivery_status = '';
	
	$scope.modal_direction = function()
	{
		$ionicModal.fromTemplateUrl('templates/map.html', {
						scope: $scope
					  }).then(function(modal) {
						  
							
							$scope.modal = modal;
							$scope.modal.show();
														
					  });
	}
	
	$scope.closeModal =  function()
	 {
		  $scope.modal.remove();
	 }
	 
	  $scope.show_actionsheet = function()
	 {
		 
		 
		 $ionicActionSheet.show({
      titleText: 'Delivery Status',
      buttons: [
	  { text: 'Delivered' },
        { text: 'In Traffic' },	
		  { text: 'On the way' },
		    { text: 'Picked' },
		
        
      ],
	  
	 
     
      cancelText: 'Cancel',
      cancel: function() {
		  
       
      },
	  
      buttonClicked: function(index) {
		  
       switch (index){
			case 0 :
				$scope.delivery_status = 'Delivered';
				return true;
			case 1 :
				$scope.delivery_status = 'In Traffic';
				return true;
			case 2 :
				$scope.delivery_status = 'On the way';
				return true;
			case 3 :
				$scope.delivery_status = 'Picked';
				return true;
		}
        return true;
      },
     
	  
    });
	 }
	 
	 //*****************map**************************
	 
	  
	  $scope.toggleGroup = function(group) {
			if ($scope.isGroupShown(group)) {
			  $scope.shownGroup = null;
			} else {
			  $scope.shownGroup = group;
			}
  }
  $scope.isGroupShown = function(group) {
    return $scope.shownGroup === group;
  }
	 
	
}).controller('MapCtrl', function($scope, $ionicLoading, $cordovaGeolocation){

  

	angular.element(document).ready(function () {
	  
	  
	  

	  
	  var watchOptions = {
    timeout : 3000,
    enableHighAccuracy: false // may cause errors if true
  };
	  
	  
	   var options = {maximumAge:100000, timeout:5000, enableHighAccuracy:true};
  
 
  $cordovaGeolocation.getCurrentPosition(options).then(function(position){
	  
 alert("111");
    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	
	//alert(position.coords.latitude);
	
	//alert(position.coords.longitude);
	
	
	var markers = [
								{
									"lat":position.coords.latitude,
									"lng": position.coords.longitude,
									

								},
								
								{
									"lat":13.106745,
									"lng": 80.096951,
									

								}
								
							];
	
    
     var mapOptions = {
       center: new google.maps.LatLng(markers[0].lat, markers[0].lng),
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
	
	 
	var map = new google.maps.Map(document.getElementById("map"), mapOptions);
	 var infoWindow = new google.maps.InfoWindow();
        var lat_lng = new Array();
        var latlngbounds = new google.maps.LatLngBounds();
		
		
			var data = markers[0]
            var myLatlng = new google.maps.LatLng(data.lat, data.lng);
            lat_lng.push(myLatlng);
            var marker = new google.maps.Marker({
                position: myLatlng, 
                map: map,
                title: data.victim_address,
				icon : 'https://maps.google.com/mapfiles/kml/shapes/man.png'
            });
            latlngbounds.extend(marker.position);
            ;
		 data = markers[1]
             myLatlng = new google.maps.LatLng(data.lat, data.lng);
            lat_lng.push(myLatlng);
             marker1 = new google.maps.Marker({
                position: myLatlng,
                map: map,
                title: data.victim_address,
				icon : 'https://maps.google.com/mapfiles/kml/shapes/motorcycling.png'
            });
            latlngbounds.extend(marker1.position);
 
    //***********ROUTING****************//
	
	
		 var path = new google.maps.MVCArray();
 
        //Initialize the Direction Service
        var service = new google.maps.DirectionsService();
 
        //Set the Path Stroke Color
        var poly = new google.maps.Polyline({ map: map, strokeColor: '#4986E7' });
 
		service.route({
                    origin: lat_lng[0],
                    destination: lat_lng[1],
                    travelMode: google.maps.DirectionsTravelMode.DRIVING
                }, function (result, status) {
                    if (status == google.maps.DirectionsStatus.OK) {
                        for (var i = 0, len = result.routes[0].overview_path.length; i < len; i++) {
                            path.push(result.routes[0].overview_path[i]);
                        }
                    }
                });
				
				 for (var i = 0; i < lat_lng.length; i++) {
            if ((i + 1) < lat_lng.length) {
                var src = lat_lng[i];
                var des = lat_lng[i + 1];
                path.push(src);
                poly.setPath(path);
                
            }
        }
 
  }, function(error){
    console.log("Could not get location");
  });
	  
	  
	  google.maps.event.addListenerOnce($scope.map, 'idle', function(){
		  
		  alert("aa");
 
				  var marker = new google.maps.Marker({
					  map: $scope.map,
					  animation: google.maps.Animation.DROP,
					  position: latLng
				  });      
				 
				});
	  	

	  
	
});
   

/*  var watch = $cordovaGeolocation.watchPosition(watchOptions);
  watch.then(
    null,
    function(err) {
		
      alert("error="+err);
    },
    function(position) {
		alert("watch options="+position.coords.latitude);
		alert("long="+position.coords.longitude);
      var lat  = position.coords.latitude;
      var long = position.coords.longitude;
  });*/
  
 
	  
	 
	  
	  
  
}).controller('RankCtrl', function($scope){
	
	
}).controller('ContactCtrl', function($scope){
	
}).controller('NotificationCtrl', function($scope, $interval,$ionicPopup, $state){
	
	  $scope.countDown = 0; // number of seconds remaining
    var stop;

   
      // set number of seconds until the pizza is ready
      $scope.countDown =10;

      // start the countdown
      stop = $interval(function() {
        // decrement remaining seconds
        $scope.countDown--;
        // if zero, stop $interval and show the popup
        if ($scope.countDown === 0){
          $interval.cancel(stop);
          var alertPopup = $ionicPopup.alert({
             title: 'Your Time Expires!',
             template: ''});
        }
      },1000,0);
	
	
	$scope.accept_order = function()
	{
		$state.go('app.home');
		
	}
	
	$scope.reject_order = function()
	{
		
		
	}
	
});