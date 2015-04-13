app.controller("MainController", ['$scope', '$interval', 'cellData', function($scope, $interval, cellData) {
  $scope.cellData = cellData;
  cellData.createCells();

}]);