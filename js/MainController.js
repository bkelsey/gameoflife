app.controller("MainController", ['$scope', '$interval', 'cellData', function($scope, $interval, cellData) {
  $scope.cellData = cellData;
  cellData.createCells();

  $scope.newGame = function() {
    cellData.stopGame();
    cellData.createCells();
  }

}]);