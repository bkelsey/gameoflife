app.controller("MainController", ['$scope', '$interval', 'cellData', function($scope, $interval, cellData) {
  $scope.cellData = cellData;
  cellData.createCells();
  $scope.cellWidth = cellData.width;
  $scope.cellHeight = cellData.height;

  $scope.setCellWidth = function(width) {
    $scope.cellWidth = width;
  };

  $scope.setCellHeight = function(height) {
    $scope.cellHeight = height;
  };

  $scope.newGame = function() {
    cellData.setWidth($scope.cellWidth);
    cellData.setHeight($scope.cellHeight);
    cellData.stopGame();
    cellData.createCells();
  }

}]);