$(document).ready(function() {
  var pawnMoves = [10];
  var pawnCaptureMoves = [9, 11];
  var pawnFirstMoves = [20];
  var rookMoves = [1, -1, 10, -10];
  var knightMoves = [8, -8, 12, -12, 19, -19, 21, -21];
  var bishopMoves = [9, -9, 11, -11];
  var queenMoves = [1, -1, 9, -9, 10, -10, 11, -11];
  var kingMoves = [1, -1, 9, -9, 10, -10, 11, -11];
  var $board = $('.board');
  var id = 81;
  var piecesArray = ['pawn', 'rook', 'knight', 'bishop', 'queen', 'king'];


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
                coordinates: '' + String.fromCharCode((0 - i) + 104) + (j + 1) + ''
              };
              id++;
            };
            id = id - 18;
          };

          // piece constructer
          var Piece = function(id, color, svg, arr, start) {
            this.name = id;
            this.color = color;
            this.id = $('#' + id);
            this.img = svg;
            this.validIncrements = arr;
            this.start = function() {
              Square[start].location.append($('<img class="chess-piece" src="' + this.img + '" id="' + start + '" />'));
              Square[start].status[color] = true;
              Square[start].status.empty = false;
              Square[start].piece.object = this;
              Square[start].piece.jQuery = this.id;
            };
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
                name = new Piece(name, "white", "./images/pieces/wht-pwn.png", pawnMoves, (20 + j));
              };
              for (var j = 1; j < 9; j++) {
                var name = 'blkpawn-' + j;
                name = new Piece(name, "black", "./images/pieces/blk-pawn.png", pawnMoves, (70 + j));
              };

              // make rooks
            } else if (chessPiece === 'rook') {
              var whtrook1 = new Piece('whtrook1', "white", "./images/pieces/wht-rook.png", rookMoves, 11);
              var whtrook2 = new Piece('whtrook2', "white", "./images/pieces/wht-rook.png", rookMoves, 18);
              var blkrook1 = new Piece('blkrook1', "black", "./images/pieces/blk-rook.png", rookMoves, 81);
              var blkrook2 = new Piece('blkrook2', "black", "./images/pieces/blk-rook.png", rookMoves, 88);
              // make knight
            } else if (chessPiece === 'knight') {
              var whtknight1 = new Piece('whtknight1', "white", "./images/pieces/wht-knight.png", knightMoves, 12);
              var whtknight2 = new Piece('whtknight2', "white", "./images/pieces/wht-knight.png", knightMoves, 17);
              var blkknight1 = new Piece('blkknight1', "black", "./images/pieces/blk-knight.png", knightMoves, 82);
              var blkknight2 = new Piece('blkknight2', "black", "./images/pieces/blk-knight.png", knightMoves, 87);
              // make bishops
            } else if (chessPiece === 'bishop') {
              var whtbishop1 = new Piece('whtbishop1', "white", "./images/pieces/wht-bishop.png", bishopMoves, 13);
              var whtbishop2 = new Piece('whtbishop2', "white", "./images/pieces/wht-bishop.png", bishopMoves, 16);
              var blkbishop1 = new Piece('blkbishop1', "black", "./images/pieces/blk-bishop.png", bishopMoves, 83);
              var blkbishop2 = new Piece('blkbishop2', "black", "./images/pieces/blk-bishop.png", bishopMoves, 86);
              // make queens
            } else if (chessPiece === 'queen') {
              var blkqueen = new Piece('blkqueen', "black", "./images/pieces/blk-queen.png", queenMoves, 84);
              var whtqueen = new Piece('whtqueen', "white", "./images/pieces/wht-queen.png", queenMoves, 14);
              // make queens
            } else {
              var whtking = new Piece('whtking', "white", "./images/pieces/wht-king.png", kingMoves, 15);
              var blkking = new Piece('blkking', "black", "./images/pieces/blk-king.png", kingMoves, 85);
            }
          };


















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
