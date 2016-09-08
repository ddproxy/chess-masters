$(document).ready(function() {

  var Square = {};

    var game = function() {

        this.pawnMoves = [10, 9, 11];
        this.pawnMovesNegative = [-10, -9, -11];
        this.rookMoves = [1, -1, 10, -10];
        this.knightMoves = [8, -8, 12, -12, 19, -19, 21, -21];
        this.bishopMoves = [9, -9, 11, -11];
        this.queenMoves = [1, -1, 9, -9, 10, -10, 11, -11];
        this.kingMoves = [1, -1, 9, -9, 10, -10, 11, -11];
        this.blackPieces = [];
        this.whitePieces = [];
        this.squareCounter = 81;
        this.piecesArray = ['pawn', 'rook', 'knight', 'bishop', 'queen', 'king'];
        this.turn = "white";
        this.computerColor = "black";
        this.odd = true;
        this.dragged;
        this.oldEvent;
        this.gamePlays = [];

    };

    var Piece = function(id, color, svg, arr, start, pieceType) {
        this.sqNumber = start;
        this.name = id;
        this.type = pieceType;
        this.color = color;
        this.id = $('#' + id);
        this.img = svg;
        this.validIncrements = arr;
        this.start = function(num) {
            Square[num].location.append($('<img class="chess-piece" draggable="true" src="' + this.img + '" id="' + num + '" />'));
            Square[num].status[color] = true;
            Square[num].status.empty = false;
            Square[num].piece = this;
            Square[num].piece.jQuery = this.id;
        };
        this.drop = function(num) {
            Square[num].status[color] = true;
            Square[num].status.empty = false;
            Square[num].piece = this;
            Square[num].piece.jQuery = this.id;
            this.moveCounter++;
            this.coordinates = Square[num].coordinates;
            this.sqNumber = num;

        };

        this.unDrop = function(num) {
            Square[num].status[color] = true;
            Square[num].status.empty = false;
            Square[num].piece = this;
            Square[num].piece.jQuery = this.id;
            this.moveCounter--;
            this.coordinates = Square[num].coordinates;
            this.sqNumber = num;

        };
        this.start(start);
        this.moveCounter = 0;
        this.coordinates = Square[start].coordinates;
        this.threatining = [];
        this.validSquares = [];
        if (this.color === "white") {
            whitePieces.push(this);
        } else {
            blackPieces.push(this);
        };
    };

    function makeBoard(num) {
        // make the board
        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 8; j++) {
                $('.board').append('<div class="square" id="' + num + '" </div>');
                num++;
            };
            num = num - 18;
        };

        // give it the right backgrounds
        num = 81;
        for (var i = 0; i < 8; i++) {
            game.odd = !(game.odd);
            for (var j = 0; j < 8; j++) {
                if (game.odd) {
                    $('#' + num).css({
                        "background-image": "url('./images/dark-bg.jpeg')"
                    });
                    game.odd = false;
                } else {
                    $('#' + num).css({
                        "background-image": "url('./images/light-bg.jpeg')"
                    });
                    game.odd = true;
                }
                num++;
            };
            num = num - 18;
        };

        // make objects
        num = 81;
        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 8; j++) {
                Square[num] = {
                    location: $('#' + num),
                    validForOpponentArray: [],
                    validForPlayerArray: [],
                    protection: {
                        protecting: [],
                        protectedby: [],
                    },
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
                        this.location.empty();
                    },
                    clear: function() {
                        this.validForOpponentArray = [];
                        this.validForPlayerArray = [];
                        this.protection.protectedby = [];
                        this.protection.protecting = [];
                    },
                    hasKing: function() {
                        if (this.status.empty === false) {
                            if (this.piece.object.type === 'king') {
                                return this.piece.object.color;
                            } else {
                                return false;
                            }
                        }

                    },
                };
                num++;
            };
            num = num - 18;
        };

    }
    makeBoard(81);
    function makePieces()







    // this is the closing tag
});
