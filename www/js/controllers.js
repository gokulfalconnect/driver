
		server   = 'http://www.falconnect.in/restaurantdemo/public/api/';

 //  server = 'http://localhost/falconnect/falconnectwebsite/restaurantdemo/public/api/';

angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $state, $ionicLoading, $ionicHistory, $ionicSideMenuDelegate, $ionicHistory,$rootScope,$http ,$ionicPopup) {
	
	

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
		$scope.driver.deliverboy_id = window.localStorage.getItem('user_id');
		
		if($scope.driver.status == true)
		{
			
			
			$scope.driver.text = "online";
			
			$scope.driver.present_status =1;
			
			$ionicLoading.show();
			
	$http({
								url: server+'doDeliveryboyChangestatus',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.driver),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
								
								//alert(JSON.stringify(response.message));
								
											
								
														
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error="+data);
									//alert("Network error. Please try after some time");
									var alertPopup = $ionicPopup.alert({
										 title: 'Network Error',
										 template: 'Please try after some time'
									  });
							
									
								});
		 
		}
		else
		{
			
			
			$scope.driver.text = "Offine";
			
			$scope.driver.present_status = '0';
			
			$ionicLoading.show();
			
	$http({
								url: server+'doDeliveryboyChangestatus',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.driver),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
								
								//alert(JSON.stringify(response.message));
								
											
								
														
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error="+data);
									//alert("Network error. Please try after some time");
									var alertPopup = $ionicPopup.alert({
									 title: 'Network Error',
									 template: 'Please try after some time'
								  });
							
									
								});
		}
		
		
		
	}
	
})

	
.controller('LoginCtrl', function($scope, $ionicSideMenuDelegate,$ionicModal,$state, $rootScope, $ionicLoading, $http ,$ionicPopup ){
	
	$rootScope.back_show = '0';
	
	$ionicSideMenuDelegate.canDragContent(false);
	
	$scope.logindata = {};
	  
	  $scope.registerdata = {};
	  
	  $scope.driver_data = {};
	  
	  $scope.frgtpwd = {};
	  
	  $scope.user_login = function()
	  {
		  
		  
		  if($scope.logindata.emailid == undefined || $scope.logindata.password == undefined)
		  {
			 // alert("Please Enter username and password");
			 var alertPopup = $ionicPopup.alert({
         title: 'Required Fields',
         template: 'Please enter Username and Password'
      });
		  }
		  
		  else
		  {
			  
			 $scope.logindata.app_id = window.localStorage.getItem('app_id');
			 
			 $scope.logindata.device_type = window.localStorage.getItem('deviceType');
			 
			// alert("app="+ $scope.logindata.app_id);
			 
			//alert("dev="+  $scope.logindata.device_type);
		$scope.logindata.app_id  = 'KmP9qeRMCp8Fuhsuns4XEH509Fytg8iHDOgvC2BAUKkrbhJhyFBk4unAdFGuPo8HMl9Evl5VYeATFcK5aNBuSX869AzY85uRmJwSg78a3O22w9zfTlLofTWzVmoNFqUl4a';
			
			$scope.logindata.device_type = 'Android';
				
			  $ionicLoading.show();
			
	$http({
								url: server+'doDeliveryboyLogin',
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
									//alert(JSON.stringify(response.message));
									var alertPopup = $ionicPopup.alert({
										 title: '',
										 template: JSON.stringify(response.message)
									  });
								}
							else
							{
									$scope.driver_data = response.deliveryboydetails;
									
									//alert(JSON.stringify($scope.driver_data));
									
									//alert("re="+$scope.driver_data[0].phone);
									
									window.localStorage.setItem('user_id', $scope.driver_data[0].id);
									
									window.localStorage.setItem('name', $scope.driver_data[0].email);
									
									//window.localStorage.setItem('phone', $scope.driver_data[0].phone);
									
								
								$state.go('app.home');
							}
							
							
								
														
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error="+data);
									//alert("Network error. Please try after some time");
									var alertPopup = $ionicPopup.alert({
										 title: 'Network Error',
										 template: 'Please try after some time'
									  });
							
									
								});
		  }
		 
		  
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
	 
	 $scope.forgot_pwd = function()
	 {
		if($scope.frgtpwd.email == undefined)
		{
			//alert("Please enter a valid email and proceed");
			var alertPopup = $ionicPopup.alert({
         title: '',
         template: 'Please enter a valid email and proceed'
      });
		}
		else
		{
			//alert("Please check you mail for password");
			var alertPopup = $ionicPopup.alert({
         title: '',
         template: 'Please check your mail for password'
      });
			
			$scope.closeModal();
		}
		 
		 
	 }
	
}).controller('HomeCtrl', function($scope, $rootScope, $ionicLoading, $http ,$ionicPopup,$cordovaGeolocation){
	
	$rootScope.back_show = '0';
	
	$rootScope.show_home = '0';
	
	$scope.user_data = {};
	
	$scope.order_details = {};
	
	$scope.user_data.deliverboy_id = window.localStorage.getItem('user_id');
	
	//$scope.user_data.deliverboy_id = 5;
	
	
	  $ionicLoading.show();
			
	$http({
								url: server+'doGetDeliveryboyOrders',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.user_data),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
								
							//	alert(JSON.stringify(response));
							
							$scope.order_details = response.orderlist;
							
							
									
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error="+data);
									//alert("Network error. Please try after some time");
									var alertPopup = $ionicPopup.alert({
										 title: 'Network Error',
										 template: 'Please try after some time'
									  });
							
									
								});
	
	
	
}).controller('ProfileCtrl', function($scope,$rootScope,$ionicLoading,$http,$ionicPopup){
	
	$rootScope.back_show = '1';
	
	$rootScope.show_home = '1';
	
	$scope.profileinfo = {};
	
	$scope.profiledata = {};
	
	$scope.profileinfo.deliverboy_id = window.localStorage.getItem('user_id');
	
		$ionicLoading.show();
			
	$http({
								url: server+'doDeliveryboyViewProfile',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.profileinfo),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
								
							$scope.profiledata = response.deliveryprofile;
							
														
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error="+data);
									//alert("Network error. Please try after some time");
									var alertPopup = $ionicPopup.alert({
											 title: 'Network Error',
											 template: 'Please try after some time'
										  });
							
									
								});
		 
	
	
}).controller('ViewOrderCtrl', function($scope, $ionicModal,  $ionicActionSheet,$rootScope,$ionicLoading,$http,$stateParams,$state,$ionicPopup,$cordovaGeolocation,$window,$ionicSideMenuDelegate, $ionicHistory){
	
	$ionicSideMenuDelegate.canDragContent(true);
	
	$rootScope.back_show = '1';
	
	$scope.delivery_status = {};
	
	$scope.delivery_status = 'Picked';
	
	$scope.order_data = {};
	
	$scope.order_cust_details = {};
	
	$scope.order_details = {};
	
	$scope.lastView = $ionicHistory.backView();
	
	$scope.lasturl= $scope.lastView.url;
	
		if($scope.lasturl == '/app/my_order')
								{
									$rootScope.del_status = 1;

								}
								
								else
								{
									$rootScope.del_status = 0;
								}
	
	$scope.order_data.deliverboy_id = window.localStorage.getItem('user_id');
	
	$scope.order_data.order_id = $stateParams.order_id;
	
	window.localStorage.setItem('order_id', $stateParams.order_id);
	
	
	
	$ionicLoading.show();
			
	$http({
								url: server+'doGetDeliveryboyOrderitems',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.order_data),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
								
							$scope.order_cust_details = response.orderlist[0];
							
							$scope.order_details = response.orderlist;
							
							$scope.total_amount = response.Ordersamount;
							
							//alert("11");
							
							window.localStorage.setItem('cust_lat',$scope.order_cust_details.latitude);
							window.localStorage.setItem('cust_long', $scope.order_cust_details.longitude);
							
							
	 
				
									var watchOptions = {
    timeout : 3000,
    enableHighAccuracy: false // may cause errors if true
  };
	  
	  
	   var options = {maximumAge:100000, timeout:5000, enableHighAccuracy:true};
							
							$cordovaGeolocation.getCurrentPosition(options).then(function(position){
	  
 
    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	
	//alert("222");
	
	//alert(position.coords.latitude);

	//alert(position.coords.longitude);
	
	//alert("cl="+position.coords.latitude);
	
	//alert("clon="+position.coords.longitude);
	
	//alert("derl="+window.localStorage.getItem('cust_lat'));
	
	//alert("derl="+window.localStorage.getItem('cust_long'));
	
	var markers = [
								{
									"lat":position.coords.latitude,
									"lng": position.coords.longitude,
									

								},
								
								{
									"lat":window.localStorage.getItem('cust_lat'),
									"lng":window.localStorage.getItem('cust_long'),
									
									
								}
								
							];
	
    
     var mapOptions = {
       center: new google.maps.LatLng(markers[0].lat, markers[0].lng),
      zoom: 11,
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
        //var poly = new google.maps.Polyline({ map: map, strokeColor: '#4986E7',strokeOpacity: 1.0, strokeWeight: 2 });
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
				
				 //Loop and Draw Path Route between the Points on MAP
				
				 for (var i = 0; i < lat_lng.length; i++) {
					 
            if ((i + 1) < lat_lng.length) {
                var src = lat_lng[i];
                var des = lat_lng[i + 1];
                path.push(src);
				
                poly.setPath(path);
               
            }
        }
  
  }, function(error){
	  alert("error loc");
    console.log("Could not get location="+error);
  });
					
						/* google.maps.event.addListenerOnce($scope.map, 'idle', function(){
		  
		  alert("aa");
 
				  var marker = new google.maps.Marker({
					  map: $scope.map,
					  animation: google.maps.Animation.DROP,
					  position: latLng
				  });      
				 
				});*/
														
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error="+data);
									//alert("Network error. Please try after some time");
									var alertPopup = $ionicPopup.alert({
									 title: 'Network Error',
									 template: 'Please try after some time'
								  });
														
									
								});
	
	
	
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
		 { text: 'Not delivered' }
			
				
		
        
      ],
	  
	 
     
      cancelText: 'Cancel',
      cancel: function() {
		  
       
      },
	  
      buttonClicked: function(index) {
		  
       switch (index){
			case 0 :
				$scope.delivery_status = 'Delivered';
				$scope.order_deliver();
				return true;
			case 1 :
				$scope.delivery_status = 'Not Delivered';
				$scope.order_not_deliver();
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
	 
	 $scope.view_items = function()
	 {
		 $ionicModal.fromTemplateUrl('templates/view_items.html', {
						scope: $scope
					  }).then(function(modal) {
						  
							
							$scope.modal = modal;
							$scope.modal.show();
														
					  });
		 
	 }
	 
	 
	 
	 $scope.order_deliver = function()
	 {
		 $state.go('app.deliver_sucess');
	 }
	 
	 $scope.order_not_deliver = function()
	 {
		 
		$scope.openmodal();
	 }
	 
	  $scope.openmodal = function()
	{
		$ionicModal.fromTemplateUrl('templates/not_delivered.html', {
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
	 
	 $scope.reason_submit = function(result)
	 {
		 if(result == undefined)
		 {
			// alert("Select any of the option and proceed");
			var alertPopup = $ionicPopup.alert({
				 title: '',
				 template: 'Select any of the option and proceed'
			  });
		 }
		 else
		 {
			 
		   $scope.modal.remove();
		 $scope.deliver_data = {};

		$scope.deliver_data.deliverboy_id = window.localStorage.getItem('user_id');

		$scope.deliver_data.orderid = window.localStorage.getItem('order_id');

		$scope.deliver_data.delivered_status = '0';

		$scope.deliver_data.remarks = result;
		   
			$ionicLoading.show();
	 
	$http({
								url: server+'doDeliveryboyDeliveredstatus',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.deliver_data),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
							
									//alert(JSON.stringify(response));	
									
									$state.go('app.home');
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error="+data);
									//alert("Network error. Please try after some time");
									var alertPopup = $ionicPopup.alert({
										 title: 'Network Error',
										 template: 'Please try after some time'
									  });
							
									
								});
	
		   
		 }
		 
	 }
	
}).controller('MapCtrl', function($scope, $ionicLoading, $cordovaGeolocation ,$ionicPopup,$http,){

  $scope.user_data = {};
  
	$scope.user_data.deliverboy_id = window.localStorage.getItem('user_id');
	
	//$scope.user_data.deliverboy_id = 5;
	
	
	  $ionicLoading.show();
			
	$http({
								url: server+'doGetDeliveryboyOrders',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.user_data),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
								
							
  $cordovaGeolocation.getCurrentPosition(options).then(function(position){
	  
 
    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	
	//alert(position.coords.latitude);

	//alert(position.coords.longitude);
	
	//alert("cl="+position.coords.latitude);
	
	//alert("clon="+position.coords.longitude);
	
	//alert("derl="+window.localStorage.getItem('cust_lat'));
	//alert("derl="+window.localStorage.getItem('cust_lat'));
	
	var markers = [
								{
									"lat":position.coords.latitude,
									"lng": position.coords.longitude,
									

								},
								
								{
									"lat":window.localStorage.getItem('cust_lat'),
									"lng":window.localStorage.getItem('cust_long'),
									
									
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
        //var poly = new google.maps.Polyline({ map: map, strokeColor: '#4986E7' });
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
	  alert("error loc");
    console.log("Could not get location="+error);
  });
							
									
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error="+data);
									//alert("Network error. Please try after some time");
									var alertPopup = $ionicPopup.alert({
										 title: 'Network Error',
										 template: 'Please try after some time'
									  });
							
									
								});

	  
	  
				
									var watchOptions = {
    timeout : 3000,
    enableHighAccuracy: false // may cause errors if true
  };
	  
	  
	   var options = {maximumAge:100000, timeout:5000, enableHighAccuracy:true};
  
 
	  
	  
	/* google.maps.event.addListenerOnce($scope.map, 'idle', function(){
		  
		  alert("aa");
 
				  var marker = new google.maps.Marker({
					  map: $scope.map,
					  animation: google.maps.Animation.DROP,
					  position: latLng
				  });      
				 
				});
	  	*/

	  
	

   

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
	
	/*  $scope.countDown = 0; // number of seconds remaining
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
	*/
	
	$scope.accept_order = function()
	{
		$state.go('app.home');
		
	}
	
	$scope.reject_order = function()
	{
		
		
	}
	
}).controller('MyOrderCtrl', function($scope,$ionicLoading,$http,$state ,$ionicPopup){
	
	$scope.order_data = {};
	
	$scope.driver_data = {};
	
	$scope.driver_data.deliverboy_id = window.localStorage.getItem('user_id');
	
	$ionicLoading.show();
	 
	$http({
								url: server+'doDeliveryboyOrderHistory',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.driver_data),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
							
								//alert("qqq="+JSON.stringify(response));	
								
								$scope.order_data	= response.trackinfo;	

									
									
								//	$state.go('app.history_view');
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error="+data);
									//alert("Network error. Please try after some time");
									var alertPopup = $ionicPopup.alert({
											 title: 'Network Error',
											 template: 'Please try after some time'
										  });
							
									
								});


}).controller('DeliverSucessCtrl' , function($scope,$stateParams, $ionicLoading, $http,$state ,$ionicPopup, $ionicSideMenuDelegate){
	
	 

$scope.deliver_data = {};



$scope.deliver_data.deliverboy_id = window.localStorage.getItem('user_id');

$scope.deliver_data.orderid = window.localStorage.getItem('order_id');

$scope.deliver_data.delivered_status = 1;

$scope.deliver_data.remarks = '';

$scope.deliver_submit = function()
{
	$ionicLoading.show();
	 
	$http({
								url: server+'doDeliveryboyDeliveredstatus',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.deliver_data),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
							
									//alert(JSON.stringify(response));	
									
									$state.go('app.home');
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									alert("error="+data);
									//alert("Network error. Please try after some time");
									var alertPopup = $ionicPopup.alert({
									 title: 'Network Error',
									 template: 'Please try after some time'
								  });
							
									
								});
	
	
	
	
}
	
}).controller('HistoryViewCtrl', function($scope, $ionicLoading,$http, $stateParams ,$ionicPopup){
	
	$scope.order_data = {};
	
	$scope.order_details = {};
	
	$scope.order_cust_details = {};
	
	$scope.total_amount = {};
	
	$scope.order_data.deliverboy_id = window.localStorage.getItem('user_id');
	
	$scope.order_data.order_id = $stateParams.order_id;
	
	
	
	$ionicLoading.show();
	 
	$http({
								url: server+'doGetDeliveryboyOrderitems',
								method: "POST",
								headers : {
									
									'Content-Type': 'application/json'
									
									
								},
								//timeout : 4500,
								data: JSON.stringify($scope.order_data),
							})
							.success(function(response) {
										
								$ionicLoading.hide();
							
									//alert(JSON.stringify(response));	
									
								$scope.order_cust_details = response.orderlist[0];
							
								$scope.order_details = response.orderlist;
							
								$scope.total_amount = response.Ordersamount;	
									
									
							}, 
						
							function(response) { // optional
							
								$ionicLoading.hide();  
								  
							}).error(function(data)
								{
									$ionicLoading.hide();
									//alert("error="+data);
								//	alert("Network error. Please try after some time");
								var alertPopup = $ionicPopup.alert({
									 title: 'Network Error',
									 template: 'Please try after some time'
								  });
							
									
								});
	
});
