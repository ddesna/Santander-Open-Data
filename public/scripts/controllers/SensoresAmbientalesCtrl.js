'use strict';

var app = angular.module('std-open-data');

app.controller("SensoresAmbientalesCtrl", function($scope, uiGmapGoogleMapApi, $http, $location) {

  $scope.map = { center: { latitude: 43.46238, longitude: -3.80069 }, zoom: 14 };
  $scope.sensors = [];

  $scope.onClick = function(marker, eventName, model) {
    model.show = !model.show;
  };

  $http({
    method: 'GET',
    url: '/api/sensores_smart_env_monitoring'
  }).then(function successCallback(data) {

      for (var i = 0; i < data.data.resources.length; i++) {
        var element = angular.fromJson(data.data.resources[i]);

        var marker = {
          "id": element["dc:identifier"],
          "latitude": element["ayto:latitude"],
          "longitude": element["ayto:longitude"],
          "options": {
            "draggable": false,
            "labelClass":'marker_labels',
            // "labelContent": element["ayto:light"],
            "clickable": true,
            "opacity": 1.0,
            "optimized": true,
            "cursor": element["ayto:light"]
          },
          "show": false,
          "datos": {
            "id": "ID: " + element["dc:identifier"],
            "noise": "Noise: " + element["ayto:noise"],
            "light": "Light: " + element["ayto:light"],
            "temperature": "Temperature: " + element["ayto:temperature"],
            "battery": "Battery: " +  element["ayto:battery"],
          }
        };
        $scope.sensors.push(marker);
      }
    }, function errorCallback(err) {
        // console.log(err);
        alert('No podemos obtener datos ahora mismo.');
    });

  uiGmapGoogleMapApi.then(function(maps) {
    // console.log('Google Maps ready');
  });

});
