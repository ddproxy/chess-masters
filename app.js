$(document).ready(function() {
    var pawnMoves = [10];
    var pawnMovesNegative = [-10];
    var pawnCaptureMoves = [9, 11];
    var pawnCaptureMovesNegative = [-9, -11];
    var pawnFirstMoves = [20];
    var rookMoves = [1, -1, 10, -10];
    var knightMoves = [8, -8, 12, -12, 19, -19, 21, -21];
    var bishopMoves = [9, -9, 11, -11];
    var queenMoves = [1, -1, 9, -9, 10, -10, 11, -11];
    var kingMoves = [1, -1, 9, -9, 10, -10, 11, -11];
    var $board = $('.board');
    var id = 81;
    var piecesArray = ['pawn', 'rook', 'knight', 'bishop', 'queen', 'king'];
    var playerColor = "white";
    var computerColor = "black";
    var preMoveMode = false;
    var dragged;


    // make the board
    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            $board.append('<div class="square" id="' + id + '" </div>');
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
                    "background-image": "url('./images/dark-bg.jpeg')"
                });
                odd = false;
            } else {
                $('#' + id).css({
                    "background-image": "url('./images/light-bg.jpeg')"
                });
                odd = true;
            }
            id++;
        };
        id = id - 18;
    };



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
                },
                piece: {
                    object: undefined,
                    jQuery: undefined,
                },
                coordinates: '' + String.fromCharCode((0 - i) + 104) + (j + 1) + '',
                setToEmpty: function() {
                    this.status.empty = true;
                    this.status.black = false;
                    this.status.white = false;
                    this.piece.object = undefined;
                    this.piece.jQuery = undefined;
                }
            };
            id++;
        };
        id = id - 18;
    };

    // piece constructer
    var Piece = function(id, color, svg, arr, start, pieceType) {
        this.name = id;
        this.type = pieceType;
        this.color = color;
        this.id = $('#' + id);
        this.img = svg;
        this.validIncrements = arr;
        this.start = function() {
            Square[start].location.append($('<img class="chess-piece" draggable="true" src="' + this.img + '" id="' + start + '" />'));
            Square[start].status[color] = true;
            Square[start].status.empty = false;
            Square[start].piece.object = this;
            Square[start].piece.jQuery = this.id;
        };
        this.drop = function (num) {
          Square[num].status[color] = true;
          Square[num].status.empty = false;
          Square[num].piece.object = this;
          Square[num].piece.jQuery = this.id;
          this.moveCounter++;
          this.coordinates = Square[num].coordinates;
        }
        this.start();
        this.moveCounter = 0;
        this.coordinates = Square[start].coordinates;
    };

    // add pieces to the board loop maybe wrap this in a function later
    for (var i = 0; i < piecesArray.length; i++) {
        var chessPiece = piecesArray[i];


        // make the pawns
        if (chessPiece === 'pawn') {
            for (var j = 1; j < 9; j++) {
                var name = 'whtpawn-' + j;
                name = new Piece(name, "white", "./images/pieces/wht-pwn.png", pawnMoves, (20 + j), "pawn");
            };
            for (var j = 1; j < 9; j++) {
                var name = 'blkpawn-' + j;
                name = new Piece(name, "black", "./images/pieces/blk-pawn.png", pawnMovesNegative, (70 + j), "pawn");
            };

            // make rooks
        } else if (chessPiece === 'rook') {
            var whtrook1 = new Piece('whtrook1', "white", "./images/pieces/wht-rook.png", rookMoves, 11, "rook");
            var whtrook2 = new Piece('whtrook2', "white", "./images/pieces/wht-rook.png", rookMoves, 18, "rook");
            var blkrook1 = new Piece('blkrook1', "black", "./images/pieces/blk-rook.png", rookMoves, 81, "rook");
            var blkrook2 = new Piece('blkrook2', "black", "./images/pieces/blk-rook.png", rookMoves, 88, "rook");
            // make knight
        } else if (chessPiece === 'knight') {
            var whtknight1 = new Piece('whtknight1', "white", "./images/pieces/wht-knight.png", knightMoves, 12, "knight");
            var whtknight2 = new Piece('whtknight2', "white", "./images/pieces/wht-knight.png", knightMoves, 17, "knight");
            var blkknight1 = new Piece('blkknight1', "black", "./images/pieces/blk-knight.png", knightMoves, 82, "knight");
            var blkknight2 = new Piece('blkknight2', "black", "./images/pieces/blk-knight.png", knightMoves, 87, "knight");
            // make bishops
        } else if (chessPiece === 'bishop') {
            var whtbishop1 = new Piece('whtbishop1', "white", "./images/pieces/wht-bishop.png", bishopMoves, 13, "bishop");
            var whtbishop2 = new Piece('whtbishop2', "white", "./images/pieces/wht-bishop.png", bishopMoves, 16, "bishop");
            var blkbishop1 = new Piece('blkbishop1', "black", "./images/pieces/blk-bishop.png", bishopMoves, 83, "bishop");
            var blkbishop2 = new Piece('blkbishop2', "black", "./images/pieces/blk-bishop.png", bishopMoves, 86, "bishop");
            // make queens
        } else if (chessPiece === 'queen') {
            var blkqueen = new Piece('blkqueen', "black", "./images/pieces/blk-queen.png", queenMoves, 84, "queen");
            var whtqueen = new Piece('whtqueen', "white", "./images/pieces/wht-queen.png", queenMoves, 14, "queen");
            // make queens
        } else {
            var whtking = new Piece('whtking', "white", "./images/pieces/wht-king.png", kingMoves, 15, "king");
            var blkking = new Piece('blkking', "black", "./images/pieces/blk-king.png", kingMoves, 85, "king");
        }
    };

    function emptyOrDiffColor(chkNum, orig) {
        try {
            return !(Square[chkNum].piece.object.color === Square[orig].piece.object.color);
        } catch (e) {
            return true;
        };
    };




    function validSquare(chkNum, orig) {

        // not a square on the board return false
        if (!(chkNum > 10 && chkNum < 89 && chkNum % 10 !== 0 && (chkNum + 1) % 10 !== 0)) {
            return false;
            // square contains a piece that is the same color as the clicked color

        } else if (!(emptyOrDiffColor(chkNum, orig))) {
            return false;
        } else {
            return true;
        }
    };

    // highlight valid moves
    $('.board').on('mouseenter', '.square', function(event) {
        try {
            var loc = parseInt(event.target.getAttribute('id'));
            var square = Square[loc].location;
            var piece = Square[loc].piece.object;
            var color = Square[loc].piece.object.color
            $(".square").removeClass('highlighted');

            piece.validIncrements.forEach(function(val, i) {
                var sqChkNum = loc + val;
                while (validSquare(sqChkNum, loc)) {
                    if (piece.type === "pawn" || piece.type === "king" || piece.type === "knight") {
                        if (validSquare(sqChkNum)) {
                            Square[sqChkNum].location.addClass("highlighted");
                            sqChkNum = 100;
                        }
                    } else {
                        Square[sqChkNum].location.addClass("highlighted");
                        sqChkNum += val;
                    }
                }
            });

        } catch (e) {
        }
    });

    $('.board').on('dragstart', function(event) {
      dragged = event.target;
      console.log(dragged);
      dragged.style.opacity = .5

    });
    $('.board').on('dragend', function(event) {
      dragged.style.opacity = .5
    });
    $('.board').on('dragover', function(event) {
      event.preventDefault();
    });

    $('.square').on('drop', function(event) {
      event.preventDefault();
      console.log(event.target);
      console.log(newloc);
      console.log(oldLoc);

      if (event.target.classList.contains('highlighted') === true){
        dragged.parentNode.removeChild(dragged);
        event.target.appendChild(dragged);
      }
    });







    // this is the closing tag
});
// (sqChkNum > 10 && sqChkNum < 89 && sqChkNum % 10 !== 0 && (sqChkNum + 1) % 10 !== 0) square number on the board

// try {
//   console.log(Square[(loc + val)]);
//
// } catch (e) {
//   console.log("square" + (loc + val) + "doesn't exist");
//
// } finally {
//
// }









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
