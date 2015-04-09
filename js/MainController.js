app.controller("MainController", ['$scope', '$interval', 'cellData', function($scope, $interval, cellData) {
  $scope.cellData = cellData;
  cellData.createCells();
  $scope.cellWidth = cellData.width;
  $scope.cellHeight = cellData.height;

  var stop;
  $scope.step = function() {
    if (angular.isDefined(stop) == false) {
        stop = $interval(function() {
          if (cellData.alive_count > 0) {
            cellData.step();
          }
          else {
            $scope.stopStep();
          }
        }, 500);
    }
  };

  $scope.stopStep = function() {
    if (angular.isDefined(stop)) {
      $interval.cancel(stop)
      stop = undefined;
    }
  };

}]);