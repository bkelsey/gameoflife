app.factory('cellData', ['$http', '$interval', function($http, $interval) {
  var stop;
  var cellData = {
    alive_count: 0,
    width: 20,
    height: 20,
    cells: [],
    copy: []
  };

  cellData.setWidth = function(width) {
    cellData.width = width;
  };

  cellData.setHeight = function(height) {
    cellData.height = height;
  };

  cellData.start = function() {
    if (angular.isDefined(stop) == false) {
        stop = $interval(function() {
          if (cellData.alive_count > 0) {
            cellData.step();
          }
          else {
            cellData.stopGame();
          }
        }, 500);
    }
  };

  cellData.stopGame = function() {
    if (angular.isDefined(stop)) {
      $interval.cancel(stop)
      stop = undefined;
    }
  }

  cellData.createCells = function() {
    cellData.cells = [];
    for (var i = 0; i < cellData.height; i++) {
      var row = [];
      for (var j = 0; j < cellData.width; j++) {
        var cell = {
          is_alive: false
        }
        if (Math.random() > 0.90) {
          cell.is_alive = true;
          cellData.alive_count += 1;
        }
        row.push(cell);
      }
      cellData.cells.push(row);
    }
  };


  cellData.step = function() {
    angular.copy(cellData.cells, cellData.copy);
    for (var i = 0; i < cellData.height; i++) {
      for (var j = 0; j < cellData.width; j++) {
        cellData.check_cells(i, j);
      }
    }
  };

  cellData.check_cells = function(row, col) {
    var total = 0;
    // Check above
    total += cellData.cell_alive(row-1, col-1) ? 1 : 0;
    total += cellData.cell_alive(row-1, col) ? 1 : 0;
    total += cellData.cell_alive(row-1, col+1) ? 1 : 0;

    // Check same row
    total += cellData.cell_alive(row, col-1) ? 1 : 0;
    total += cellData.cell_alive(row, col+1) ? 1 : 0;

    // Check below
    total += cellData.cell_alive(row+1, col-1) ? 1 : 0;
    total += cellData.cell_alive(row+1, col) ? 1 : 0;
    total += cellData.cell_alive(row+1, col+1) ? 1 : 0;

    if (cellData.cells[row][col].is_alive) {
      if (total < 2 || total > 3) {
        cellData.cells[row][col].is_alive = false;
        cellData.alive_count -= 1;
      }
    }
    else {
      if (total === 3) {
        cellData.cells[row][col].is_alive = true;
        cellData.alive_count += 1;
      }
    }
  };

  cellData.cell_alive = function(row, col) {
    if (row < 0 || row >= cellData.height) {
      return false;
    }
    else if (col < 0 || col >= cellData.width) {
      return false;
    }
    else {
      return cellData.copy[row][col].is_alive
    }
  };

  return cellData;
}]);