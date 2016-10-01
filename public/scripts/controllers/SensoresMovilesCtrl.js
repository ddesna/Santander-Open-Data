'use strict';

var app = angular.module('std-open-data');

app.controller('SensoresMovilesCtrl', function($scope, uiGmapGoogleMapApi, $http, $location){

  $scope.map = { center: { latitude: 43.46238, longitude: -3.80069 }, zoom: 14 };
  $scope.sensors = [];

  $scope.onClick = function(marker, eventName, model) {
    model.show = !model.show;
  };

  $http({
    method: 'GET',
    url: '/api/sensores_moviles'
  }).then(function successCallback(data) {

      for (var i = 0; i < data.data.resources.length; i++) {
        var element = angular.fromJson(data.data.resources[i]);

        var marker = {
          "id": i,
          "latitude": element["ayto:latitude"],
          "longitude": element["ayto:longitude"],
          "options": {
            "draggable": false,
            "labelClass":'marker_labels',
            "clickable": true,
            "opacity": 1.0,
            "optimized": true
          },
          "show": false,
          "datos": {
            "id": "ID: " + element["dc:identifier"],
            "particles": "Particles: " + element["ayto:particles"],
            "NO2": "NO2: " + element["ayto:NO2"],
            "temperature": "Temperature: " + element["ayto:temperature"],
            "altitude": "Altitude: " + element["ayto:altitude"],
            "speed": "Speed: " + element["ayto:speed"],
            "CO": "CO: " + element["ayto:CO"],
            "odometer": "Odometer: " + element["ayto:odometer"],
            "course": "Course: " + element["ayto:course"],
            "ozone": "Ozone: " + element["ayto:ozone"]
          }
        };
        $scope.sensors.push(marker);
      }
    }, function errorCallback(err) {
        // console.log(err);
        alert('No podemos obtener datos ahora mismo.');
    });

});
