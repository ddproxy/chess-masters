$(document).ready(function() {
  // make the board
    var $board = $('.board');
    var id = 81;
    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            $board.append('<div class="square" id="' + id + '"> ' + id + ' </div>');
            id++;
        };
        id = id - 18;
    };

    // give it the right backgrounds
    id = 81;
    var odd = true;
    for (var i = 0; i < 8; i++) {
        odd = !odd;
        for (var j = 0; j < 8; j++) {
            if (odd) {
                $('#' + id).css({
                    "background-image": "url('/images/dark-bg.jpeg')"
                });
                odd = false;
            } else {
                $('#' + id).css({
                    "background-image": "url('/images/light-bg.jpeg')"
                });
                odd = true;
            }
            id++;
        };
        id = id - 18;
    };
    // make piece object
    var piecesArray = ['pawn', 'rook', 'knight', 'bishop', 'queen', 'king'];
    // piece constructer
    var Piece = function (piece, svg, arr, color, start){
      this.id = piece;
      this.img = svg;
      this.validIncrements = undefined;
      this.moves = function (x){
        this.validIncrements = x;
      };
      this.color = color;
      this.start = function () {
        Square[start].location.append($ '<img class="chess-piece" src="' + this.img + '" id="' + this.id + '" />')
      };

      this.moves(arr);
      this.start();
    }

    // loop for making instances object structure
    for (var i = 0; i < piecesArray.length; i++) {
      var chessPiece = piecesArray[i];
      if(chessPiece === 'pawn'){
        for (var j = 1; j < 9; j++) {
          
        }
      }
    }
    // valid increment arrays
    var pawnMoves = [10];
    var pawnCaptureMoves = [9, 11];
    var pawnFirstMoves = [20];
    var rookMoves = [1, -1, 10, -10];
    var knightMoves = [8, -8, 12, -12, 19, -19, 21, -21];
    var bishopMoves = [9, -9, 11, -11];
    var queenMoves = [1, -1, 9, -9, 10, -10, 11, -11];
    var kingMoves = [1, -1, 9, -9, 10, -10, 11, -11];



    console.log(Piece);



    // make square object
    var Square = {};
    id = 81;
    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            Square[id] = {
                location: $('#' + id),
                status: {
                    empty: true,
                    black: false,
                    white: false,
                    piece: {
                        name: undefined,
                        img: undefined
                    }
                },
                coordinates: '' + String.fromCharCode((0-i) + 104 ) + (j+1) + ''
            };
            id++;
        };
        id = id - 18;
    };

    console.log(Square);








});

// loop for the whole board
// for (var i = 0; i < 8; i++) {
//         something for the row
//     for (var j = 0; j < 8; j++) {
//         something for each square in the row
//
//         id++;
//     };
//     id = id - 18;
// };
