app.factory('cellData', ['$interval', function($interval) {
  var _ = require('underscore');
  var cellData = {
    is_running: false,
    alive_count: 0,
    width: 20,
    height: 20,
    cells: [],
    copy: []
  };

  var neighbors = [[-1, -1], [-1, 0], [-1, 1],
                     [0, -1], [0, 1],
                     [1, -1], [1, 0], [1, 1]];

  cellData.start = function() {
    if (cellData.is_running == false) {
        cellData.is_running = true;
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
    if (cellData.is_running) {
      $interval.cancel(stop)
      cellData.is_running = false;
    }
  }

  cellData.createCells = function() {
    cellData.cells = _.times(cellData.height, function() {
      return _.times(cellData.width, cellData.createCell)
    });
  };

  cellData.createCell = function() {
    var cell = { is_alive: false };
    if (Math.random() > 0.85) {
      cell.is_alive = true;
      cellData.alive_count += 1;
    }
    return cell;
  }

  cellData.clicked = function(cell) {
    if (cellData.is_running == false) {
      cell.is_alive = !cell.is_alive;
    }
  };

  cellData.clear = function() {
    _.each(cellData.cells, function(row) {
      _.each(row, function(cell) {
        cell.is_alive = false;
      })
    });
    cellData.stopGame();
  }

  cellData.step = function() {
    angular.copy(cellData.cells, cellData.copy);
    _.each(cellData.cells, function(row, i) {
      _.each(row, function(cell, j) {
        cellData.checkNeighbors(i, j);
      })
    });
  };

  cellData.checkNeighbors = function(row, col) {
    var total = 0;

    _.each(neighbors, function(n) {
      total += cellData.cellAlive(row + n[0], col + n[1]);
    });

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

  cellData.cellAlive = function(row, col) {
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