Skip to content
This repository
Search
Pull requests
Issues
Gist
 @gokulfalconnect
 Sign out
 Watch 22
  Star 147
  Fork 64 driftyco/ionic-starter-maps
 Code  Issues 4  Pull requests 4  Projects 0  Wiki  Pulse  Graphs
Branch: master Find file Copy pathionic-starter-maps/js/directives.js
3c76a3c  on Aug 18 2014
@wmh wmh Update directives.js
2 contributors @wmh @mlynch
RawBlameHistory     
35 lines (30 sloc)  909 Bytes
angular.module('starter.directives', [])

.directive('map', function() {
  return {
    restrict: 'E',
    scope: {
      onCreate: '&'
    },
    link: function ($scope, $element, $attr) {
      function initialize() {
        var mapOptions = {
          center: new google.maps.LatLng(43.07493, -89.381388),
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map($element[0], mapOptions);
  
        $scope.onCreate({map: map});

        // Stop the side bar from dragging when mousedown/tapdown on the map
        google.maps.event.addDomListener($element[0], 'mousedown', function (e) {
          e.preventDefault();
          return false;
        });
      }

      if (document.readyState === "complete") {
        initialize();
      } else {
        google.maps.event.addDomListener(window, 'load', initialize);
      }
    }
  }
});
Contact GitHub API Training Shop Blog About
© 2017 GitHub, Inc. Terms Privacy Security Status Help