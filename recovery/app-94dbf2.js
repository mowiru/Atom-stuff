var electron = require('electron');
var {
  remote,
  ipcRenedere
} = electron;


//Globalevariablen
var h = 400;
var w = 400;
var grid = create(w);
var nextGrid = create(w);
//Button Menu
//Generation Start und Stop button
var g;
var g = window.requestAnimationFrame(beat);
document.getElementById('start').addEventListener('click', function() {
  g = setInterval(beat, 200);
});

document.getElementById('stop').addEventListener('click', function() {
  clearInterval(g);
});

//Clear button
document.getElementById('clear').addEventListener('click', function() {
  for (var row of grid) {
    for (var i = 0; i < row.length; i++) {
      row[i] = false;
    }
  }
});

//Choose a start
/*document.getElementById('Gleider').addEventListener('click', function() {
  grid[20][20] = 1;
  grid[21][21] = 1;
  grid[19][22] = 1;
  grid[20][22] = 1;
  grid[21][22] = 1;
});


//make your own
document.getElementById('mky').addEventListener('click', function() {
  var c = document.getElementById("myCan");
  var ctx = c.getContext("2d");
  ctx.clearRect(0, 0, 400, 400);
});*/

//Sammelfunction
function beat() {
  filler();
  newGrid();
  nextGeneration();
}

// die "rows" creieren
function create(rows) {
  var array = [];
  for (var i = 0; i < rows; i++) {
    array[i] = [];
  }
  return array;
}

//die "rows" nach einer belibigen Zahl fühlen
function filler() {
  for (var y = 0; y < h; y++) { //wenn y++ zu y += a geändert wird gibt man jeden a punkt aus
    for (var x = 0; x < w; x++) {
      var r = Math.random();
      var n = (r * 3); //alle x zellen ausgeben
      var b = Math.floor(n);
      if (b === 1) {
        grid[y][x] = 1; //Lebendig
      } else {
        grid[y][x] = 0; //Tot
      }
    }
  }
}

//die Toten oder Lebendigen Zellen wieder geben im canvas
function newGrid() {
  var c = document.getElementById("myCan");
  var ctx = c.getContext("2d");
  ctx.clearRect(0, 0, 400, 400); //canvas aufräumen
  for (var y = 0; y < h; y++) {
    for (var x = 0; x < w; x++) {
      if (grid[y][x] === 1) {
        ctx.fillStyle = '#AADD00'; //'hsl(' + 360 * Math.random() + ', 150%, 50%)'; //Farbe der Punkte
        ctx.fillRect(y, x, 1, 1);
      }
    }
  }
}

function nextGeneration() { //perform one iteration of grid update
    for (var y = 1; y < h - 1; y++) { //iterate through rows
        for (var x = 1; x < w - 1; x++) { //iterate through columns
            var s = 0;
            //add up the total values for the surrounding cells
            s += grid[y - 1][x - 1]; //top left
            s += grid[y - 1][x]; //top center
            s += grid[y - 1][x + 1]; //top right

            s += grid[y][x - 1]; //middle left
            s += grid[y][x + 1]; //middle right

            s += grid[y + 1][x - 1]; //bottom left
            s += grid[y + 1][x]; //bottom center
            s += grid[y + 1][x + 1]; //bottom right


            //apply the rules to each cell
            if (grid[y][x] === 0) {
                switch (s) {
                    case 3:
                        nextGrid[y][x] = 1; //if cell is dead and has 3 neighbours, switch it on
                        break;
                    default:
                        nextGrid[y][x] = 0; //otherwise leave it dead
                }
            } else if (grid[y][x] === 1) { //apply rules to living cell
                switch (s) {
                    case 0:
                    case 1:
                        nextGrid[y][x] = 0; //die of lonelines
                        break;
                    case 2:
                    case 3:
                        nextGrid[y][x] = 1; //carry on living
                        break;
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                    case 8:
                        nextGrid[y][x] = 0; //die of overcrowding
                        break;
                    default:
                        nextGrid[y][x] = 0; //

                }

            }
        }
    }

    for (var y = 0; y < h; y++) { //iterate through rows
        for (var x = 0; x < w; x++) { //iterate through columns
            grid[y][x] = nextGrid[y][x];

        }
    }


}
