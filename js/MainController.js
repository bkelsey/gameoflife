app.controller("MainController", ['$scope', function($scope) {
  $scope.cells = [];
  for (var i = 0; i < 20; i++) {
    row = [];
    for (var j = 0; j < 20; j++) {
      cell = {
        index: j,
        row: i,
        is_alive: false,
        display: ''
      }
      if (Math.random() > 0.90) {
        cell.display = 'X';
        cell.is_alive = true;
      }
      row.push(cell);
    }
    $scope.cells.push(row);
  }

  $scope.copy = [];

  $scope.step = function() {
    angular.copy($scope.cells, $scope.copy);
    for (var i = 0; i < 20; i++) {
      for (var j = 0; j < 20; j++) {
        $scope.check_cells(i, j);
      }
    }
  }

  $scope.check_cells = function(row, col) {
    total = 0;
    // Check above
    total += $scope.cell_alive(row-1, col-1) ? 1 : 0;
    total += $scope.cell_alive(row-1, col) ? 1 : 0;
    total += $scope.cell_alive(row-1, col+1) ? 1 : 0;

    // Check same row
    total += $scope.cell_alive(row, col-1) ? 1 : 0;
    total += $scope.cell_alive(row, col+1) ? 1 : 0;

    // Check below
    total += $scope.cell_alive(row+1, col-1) ? 1 : 0;
    total += $scope.cell_alive(row+1, col) ? 1 : 0;
    total += $scope.cell_alive(row+1, col+1) ? 1 : 0;

    if ($scope.cells[row][col].is_alive) {
      if (total < 2 || total > 3) {
        $scope.cells[row][col].is_alive = false;
        $scope.cells[row][col].display = '';
      }
    }
    else {
      if (total === 3) {
        $scope.cells[row][col].is_alive = true;
        $scope.cells[row][col].display = 'X';
      }
    }
  }

  $scope.cell_alive = function(row, col) {
    if (row < 0 || row >= 20) {
      return false;
    }
    else if (col < 0 || col >= 20) {
      return false;
    }
    else {
      return $scope.copy[row][col].is_alive
    }
  }
}]);