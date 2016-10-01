'use strict';

var app = angular.module('std-open-data');

app.controller('IrregationCtrl', function($scope, uiGmapGoogleMapApi, $http, $location){

  $scope.map = { center: { latitude: 43.46238, longitude: -3.80069 }, zoom: 14 };
  $scope.sensors = [];

  $scope.onClick = function(marker, eventName, model) {
    model.show = !model.show;
  };

  $http({
    method: 'GET',
    url: '/api/sensores_smart_irrigation'
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
            "clickable": true,
            "opacity": 1.0,
            "optimized": true
          },
          "show": false,
          "datos": {
            "id": "ID: " + element["dc:identifier"],
            "temperature": "Temperatura: " + element["ayto:temperature"],
            "windDirection": "Wind direction: " + element["ayto:windDirection"],
            "rainfall": "Rainfall: " + element["ayto:rainfall"],
            "radiationPAR": "Radiation PAR: " + element["ayto:radiationPAR"],
            "solarRadiation": "Solar radiation: " + element["ayto:solarRadiation"],
            "windSpeed": "Wind speed: " + element["ayto:windSpeed"],
            "groundTemperature": "Ground temperature: " + element["ayto:groundTemperature"],
            "atmosphericPressure": "Atmh. pressure: " + element["ayto:atmosphericPressure"],
            "battery": "Battery: " + element["ayto:battery"],
            "relativeHumidity": "Relative humidity: " + element["ayto:relativeHumidity"]
          }

        };
        $scope.sensors.push(marker);
      }
    }, function errorCallback(err) {        
        alert('No podemos obtener datos ahora mismo.');
    });

});
