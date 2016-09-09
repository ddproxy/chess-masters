$(document).ready(function() {

    // ***********************************VARIABLES***************************************
    // ***********************************VARIABLES***************************************
    // ***********************************VARIABLES***************************************

    var pawnMoves = [10, 9, 11];
    var pawnMovesNegative = [-10, -9, -11];
    var rookMoves = [1, -1, 10, -10];
    var knightMoves = [8, -8, 12, -12, 19, -19, 21, -21];
    var bishopMoves = [9, -9, 11, -11];
    var queenMoves = [1, -1, 9, -9, 10, -10, 11, -11];
    var kingMoves = [1, -1, 9, -9, 10, -10, 11, -11];
    var $board = $('.board');
    var blackPieces = [];
    var whitePieces = [];
    var id = 81;
    var piecesArray = ['pawn', 'rook', 'knight', 'bishop', 'queen', 'king'];
    var turn = "white";
    var computerColor = "black";
    var odd = true;
    var dragged;
    var oldEvent;
    var Square = {};
    var gamePlays = [];

    // ***********************************VARIABLES***************************************
    // ***********************************VARIABLES***************************************
    // ***********************************VARIABLES***************************************


    // -----------------------------------------------------------------------------------------


    // ******************************DOM ELEMENT CREATION***************************************
    // ******************************DOM ELEMENT CREATION***************************************
    // ******************************DOM ELEMENT CREATION***************************************

    //create the turn banner
    $('.turn-billboard').text(turn);

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

    // *****************************DOM ELEMENT CREATION***************************************
    // *****************************DOM ELEMENT CREATION***************************************
    // *****************************DOM ELEMENT CREATION***************************************


    // -----------------------------------------------------------------------------------------


    // *********************************SQUARE OBJECT***************************************
    // *********************************SQUARE OBJECT***************************************
    // *********************************SQUARE OBJECT***************************************


    // make square object
    id = 81;
    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            Square[id] = {
                    location: $('#' + id),
                    validForOpponentArray: [],
                    validForPlayerArray: [],
                    protectedby: [];
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
        id++;
    };
    id = id - 18;
};

// *********************************SQUARE OBJECT***************************************
// *********************************SQUARE OBJECT***************************************
// *********************************SQUARE OBJECT***************************************


// -----------------------------------------------------------------------------------------


// *********************************PIECE CONSTRUCTOR***************************************
// *********************************PIECE CONSTRUCTOR***************************************
// *********************************PIECE CONSTRUCTOR***************************************

// piece constructer
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
        Square[num].piece.object = this;
        Square[num].piece.jQuery = this.id;
    };
    this.drop = function(num) {
        Square[num].status[color] = true;
        Square[num].status.empty = false;
        Square[num].piece.object = this;
        Square[num].piece.jQuery = this.id;
        this.moveCounter++;
        this.coordinates = Square[num].coordinates;
        this.sqNumber = num;

    };

    this.unDrop = function(num) {
        Square[num].status[color] = true;
        Square[num].status.empty = false;
        Square[num].piece.object = this;
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

// *********************************PIECE CONSTRUCTOR**************************************
// *********************************PIECE CONSTRUCTOR**************************************
// *********************************PIECE CONSTRUCTOR**************************************


// -----------------------------------------------------------------------------------------


// *********************************ADD PIECES***************************************
// *********************************ADD PIECES***************************************
// *********************************ADD PIECES***************************************

// add pieces to the board loop maybe wrap this in a function later
for (var i = 0; i < piecesArray.length; i++) {
    var game.chessPiece = piecesArray[i];


    // make the pawns
    if (game.chessPiece === 'pawn') {
        whtpawn1 = new Piece(whtpawn1, "white", "./images/pieces/wht-pwn.png", pawnMoves, (20 + j), "pawn");
        whtpawn2 = new Piece(whtpawn2, "white", "./images/pieces/wht-pwn.png", pawnMoves, (20 + j), "pawn");
        whtpawn3 = new Piece(whtpawn3, "white", "./images/pieces/wht-pwn.png", pawnMoves, (20 + j), "pawn");
        whtpawn4 = new Piece(whtpawn4, "white", "./images/pieces/wht-pwn.png", pawnMoves, (20 + j), "pawn");
        whtpawn5 = new Piece(whtpawn5, "white", "./images/pieces/wht-pwn.png", pawnMoves, (20 + j), "pawn");
        whtpawn6 = new Piece(whtpawn6, "white", "./images/pieces/wht-pwn.png", pawnMoves, (20 + j), "pawn");
        whtpawn7 = new Piece(whtpawn7, "white", "./images/pieces/wht-pwn.png", pawnMoves, (20 + j), "pawn");
        whtpawn8 = new Piece(whtpawn8, "white", "./images/pieces/wht-pwn.png", pawnMoves, (20 + j), "pawn");
        blkpawn1 = new Piece(blkpawn1, "black", "./images/pieces/blk-pawn.png", pawnMovesNegative, (70 + j), "pawn");
        blkpawn2 = new Piece(blkpawn2, "black", "./images/pieces/blk-pawn.png", pawnMovesNegative, (70 + j), "pawn");
        blkpawn3 = new Piece(blkpawn3, "black", "./images/pieces/blk-pawn.png", pawnMovesNegative, (70 + j), "pawn");
        blkpawn4 = new Piece(blkpawn4, "black", "./images/pieces/blk-pawn.png", pawnMovesNegative, (70 + j), "pawn");
        blkpawn5 = new Piece(blkpawn5, "black", "./images/pieces/blk-pawn.png", pawnMovesNegative, (70 + j), "pawn");
        blkpawn6 = new Piece(blkpawn6, "black", "./images/pieces/blk-pawn.png", pawnMovesNegative, (70 + j), "pawn");
        blkpawn7 = new Piece(blkpawn7, "black", "./images/pieces/blk-pawn.png", pawnMovesNegative, (70 + j), "pawn");
        blkpawn8 = new Piece(blkpawn8, "black", "./images/pieces/blk-pawn.png", pawnMovesNegative, (70 + j), "pawn");

        // make rooks
    } else if (game.chessPiece === 'rook') {
        var whtrook1 = new Piece('whtrook1', "white", "./images/pieces/wht-rook.png", rookMoves, 11, "rook");
        var whtrook2 = new Piece('whtrook2', "white", "./images/pieces/wht-rook.png", rookMoves, 18, "rook");
        var blkrook1 = new Piece('blkrook1', "black", "./images/pieces/blk-rook.png", rookMoves, 81, "rook");
        var blkrook2 = new Piece('blkrook2', "black", "./images/pieces/blk-rook.png", rookMoves, 88, "rook");
        // make knight
    } else if (game.chessPiece === 'knight') {
        var whtknight1 = new Piece('whtknight1', "white", "./images/pieces/wht-knight.png", knightMoves, 12, "knight");
        var whtknight2 = new Piece('whtknight2', "white", "./images/pieces/wht-knight.png", knightMoves, 17, "knight");
        var blkknight1 = new Piece('blkknight1', "black", "./images/pieces/blk-knight.png", knightMoves, 82, "knight");
        var blkknight2 = new Piece('blkknight2', "black", "./images/pieces/blk-knight.png", knightMoves, 87, "knight");
        // make bishops
    } else if (game.chessPiece === 'bishop') {
        var whtbishop1 = new Piece('whtbishop1', "white", "./images/pieces/wht-bishop.png", bishopMoves, 13, "bishop");
        var whtbishop2 = new Piece('whtbishop2', "white", "./images/pieces/wht-bishop.png", bishopMoves, 16, "bishop");
        var blkbishop1 = new Piece('blkbishop1', "black", "./images/pieces/blk-bishop.png", bishopMoves, 83, "bishop");
        var blkbishop2 = new Piece('blkbishop2', "black", "./images/pieces/blk-bishop.png", bishopMoves, 86, "bishop");
        // make queens
    } else if (game.chessPiece === 'queen') {
        var blkqueen = new Piece('blkqueen', "black", "./images/pieces/blk-queen.png", queenMoves, 84, "queen");
        var whtqueen = new Piece('whtqueen', "white", "./images/pieces/wht-queen.png", queenMoves, 14, "queen");
        // make kings
    } else {
        var whtking = new Piece('whtking', "white", "./images/pieces/wht-king.png", kingMoves, 15, "king");
        var blkking = new Piece('blkking', "black", "./images/pieces/blk-king.png", kingMoves, 85, "king");
        whtking.check = false;
        blkking.check = false;
    }
};

// ************************************ADD PIECES***************************************
// ************************************ADD PIECES***************************************
// ************************************ADD PIECES***************************************


// -----------------------------------------------------------------------------------------


// ************************************FUNCTION***************************************
// ************************************FUNCTION***************************************
// ************************************FUNCTION***************************************

//is a square empty or containing a different color
function emptyOrDiffColor(chkNum, orig) {
    try {
        return !(Square[chkNum].piece.object.color === Square[orig].piece.object.color);
    } catch (e) {
        return true;
    };
};

//is a square a square on the board, empty or has an opponents color on it
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

// just makes sure its a square on the board
function validSquareOnBoard(chkNum) {

    // not a square on the board return false
    if (!(chkNum > 10 && chkNum < 89 && chkNum % 10 !== 0 && (chkNum + 1) % 10 !== 0)) {
        return false;
    } else {
        return true;
    }
};

//is the piece you are targeting the same color as the turn it is
function colorChecker(e) {
    try {
        var num = parseInt(e.target.getAttribute('id'));
        var color = Square[num].piece.object.color;
        return (color === turn);

    } catch (e) {}
};

// function to clear the validForOpponentArray array for every square
var resetAllSquareArrays = function() {
    id = 81;
    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            Square[id].clear()
            id++;
        };
        id = id - 18;
    };
};

//functions to check all squares that have validForOpponentArray arrays




//function that creates an array on every square that lets it know which pieces it is in the validForOpponentArray of
//and an array on each piece saying which piece it can take and which squares it can enter
var validForOpponent = function(piece) {
    piece.threatining = [];

    var loc = piece.sqNumber;

    try {

        piece.validIncrements.forEach(function(val, i) {
            var sqChkNum = loc + val;
            while (validSquareOnBoard(sqChkNum)) {
                if (piece.type === "king" || piece.type === "knight") {
                    if (!(emptyOrDiffColor(sqChkNum, loc))) {
                        Square[sqChkNum].protection.protectedby.push(Square[loc].piece.object);
                        Square[loc].protection.protecting.push(Square[sqChkNum].piece.object);
                        sqChkNum = 100;
                    } else if (validSquare(sqChkNum, loc) && Square[sqChkNum].status.empty) {
                        Square[sqChkNum].validForOpponentArray.push(piece);
                        sqChkNum = 100;
                    } else {
                        piece.threatining.push(Square[sqChkNum].piece.object);
                        Square[sqChkNum].validForOpponentArray.push(piece);
                        sqChkNum = 100;
                    }

                } else if (piece.type === "pawn" && val % 10 === 0) {
                    sqChkNum = 100;

                } else if (piece.type === "pawn" && val % 10 !== 0) {
                    if (!(emptyOrDiffColor(sqChkNum, loc))) {
                        Square[sqChkNum].protection.protectedby.push(Square[loc].piece.object);
                        Square[loc].protection.protecting.push(Square[sqChkNum].piece.object);
                        sqChkNum = 100;
                    } else if (validSquare(sqChkNum, loc)) {
                        if (!(Square[sqChkNum].status.empty)) {
                            piece.threatining.push(Square[sqChkNum].piece.object);
                            Square[sqChkNum].validForOpponentArray.push(piece);
                            sqChkNum = 100;
                        } else {
                            Square[sqChkNum].validForOpponentArray.push(piece);
                            sqChkNum = 100;
                        }
                    } else {
                        sqChkNum = 100;
                    }
                } else {
                    if (!(emptyOrDiffColor(sqChkNum, loc))) {
                        Square[sqChkNum].protection.protectedby.push(Square[loc].piece.object);
                        Square[loc].protection.protecting.push(Square[sqChkNum].piece.object);
                        sqChkNum = 100;
                    } else if (validSquare(sqChkNum, loc) && Square[sqChkNum].status.empty) {
                        Square[sqChkNum].validForOpponentArray.push(piece);
                        sqChkNum += val;
                    } else {
                        piece.threatining.push(Square[sqChkNum].piece.object[0]);
                        Square[sqChkNum].validForOpponentArray.push(piece);
                        sqChkNum = 100;
                    }
                }
            }

        });

    } catch (e) {}


};


// function that gives a square an array of pieces that can be in it
var validFor = function(piece) {
    var loc = piece.sqNumber;

    try {

        piece.validIncrements.forEach(function(val, i) {
            var sqChkNum = loc + val;
            while (validSquareOnBoard(sqChkNum)) {
                if (piece.type === "king" || piece.type === "knight") {
                    if (!(emptyOrDiffColor(sqChkNum, loc))) {
                        Square[sqChkNum].protection.protectedby.push(Square[loc].piece.object);
                        Square[loc].protection.protecting.push(Square[sqChkNum].piece.object);
                        sqChkNum = 100;
                    } else
                    if (validSquare(sqChkNum, loc) && Square[sqChkNum].status.empty) {
                        Square[sqChkNum].validForPlayerArray.push(piece)
                        sqChkNum = 100;
                    } else {
                        Square[sqChkNum].validForPlayerArray.push(piece)
                        sqChkNum = 100;
                    }

                } else if (piece.type === "pawn" && val % 10 === 0) {
                    if (piece.moveCounter < 1 && validSquare(sqChkNum, loc) && validSquare((sqChkNum + (val)), loc) && Square[sqChkNum].status.empty) {
                        Square[sqChkNum].validForPlayerArray.push(piece)
                        Square[(sqChkNum + (val))].validForPlayerArray.push(piece)
                        sqChkNum = 100;
                    } else if (validSquare(sqChkNum, loc) && Square[sqChkNum].status.empty) {
                        Square[sqChkNum].validForPlayerArray.push(piece)
                        sqChkNum = 100;
                    } else {
                        sqChkNum = 100;
                    }

                } else if (piece.type === "pawn" && val % 10 !== 0) {
                    if (!(emptyOrDiffColor(sqChkNum, loc))) {
                        Square[sqChkNum].protection.protectedby.push(Square[loc].piece.object);
                        Square[loc].protection.protecting.push(Square[sqChkNum].piece.object);
                        sqChkNum = 100;
                    } else
                    if (validSquare(sqChkNum, loc)) {
                        if (!(Square[sqChkNum].status.empty)) {
                            Square[sqChkNum].validForPlayerArray.push(piece)
                            sqChkNum = 100;
                        } else {
                            sqChkNum = 100;
                        }
                    } else {
                        sqChkNum = 100;
                    }
                } else {
                    if (!(emptyOrDiffColor(sqChkNum, loc))) {
                        Square[sqChkNum].protection.protectedby.push(Square[loc].piece.object);
                        Square[loc].protection.protecting.push(Square[sqChkNum].piece.object);
                        sqChkNum = 100;
                    } else
                    if (validSquare(sqChkNum, loc) && Square[sqChkNum].status.empty) {
                        Square[sqChkNum].validForPlayerArray.push(piece)
                        sqChkNum += val;
                    } else {
                        Square[sqChkNum].validForPlayerArray.push(piece)
                        sqChkNum = 100;
                    }
                }
            }
        });

    } catch (e) {}

};

// function to call validForOpponent() on every single piece
var allPieceCheck = function() {
    resetAllSquareArrays();
    for (var i = 0; i < 16; i++) {
        var bpiece = blackPieces[i];
        var wpiece = whitePieces[i];
        if (turn === "white") {
            validFor(wpiece);
            validForOpponent(bpiece);
        } else if (turn === 'black') {
            validFor(bpiece);
            validForOpponent(wpiece);
        }
    };
};

var checkForCheck = function() {
    for (var id in Square) {
        if (Square[id].hasKing() === turn && Square[id].validForOpponentArray.length > 0) {
            if (turn === "white") {
                whtking.check === true;
                alert("CHECK!");
            } else {
                blkking.check === true;
                alert("CHECK!");
            }
        } else if (Square[id].hasKing() === "white" || Square[id].hasKing() === "black") {
            if (Square[id].validForPlayerArray.length > 0) {
                throw "You've put yourself in check"
            }
        }
    }
};

// ************************************FUNCTIONS***************************************
// ************************************FUNCTIONS***************************************
// ************************************FUNCTIONS***************************************


// -----------------------------------------------------------------------------------------


// ********************************EVENT LISTENERS***************************************
// ********************************EVENT LISTENERS***************************************
// ********************************EVENT LISTENERS***************************************

// highlight valid moves
$('.board').on('mouseenter', '.square', function(event) {
    try {
        var loc = parseInt(event.target.getAttribute('id'));
        var piece = Square[loc].piece.object;
        $(".square").removeClass('highlighted');
        $(".square").removeClass('capture');
        if (colorChecker(event)) {
            if (blkking.check || whtking.check) {
                if (piece.type === "king") {

                    if (turn === "white") {
                        whtking.validIncrements.forEach(function(val, i) {
                            var sqChkNum = loc + val;
                            while (validSquare(sqChkNum, loc)) {
                                if (validSquare(sqChkNum, loc) && Square[sqChkNum].status.empty) {
                                    Square[sqChkNum].location.addClass("highlighted");
                                    sqChkNum = 100;
                                } else {
                                    Square[sqChkNum].location.addClass("capture");
                                    sqChkNum = 100;
                                }
                            }
                        });
                    } else if (turn === "black") {

                        blkking.validIncrements.forEach(function(val, i) {

                            var sqChkNum = loc + val;
                            while (validSquare(sqChkNum, loc)) {
                                if (validSquare(sqChkNum, loc) && Square[sqChkNum].status.empty) {
                                    Square[sqChkNum].location.addClass("highlighted");
                                    sqChkNum = 100;
                                } else {
                                    Square[sqChkNum].location.addClass("capture");
                                    sqChkNum = 100;
                                }
                            }
                        });

                    }

                } else {}
            } else if (blkking.check === false && whtking.check === false) {
                piece.validIncrements.forEach(function(val, i) {
                    var sqChkNum = loc + val;
                    while (validSquare(sqChkNum, loc)) {
                        if (piece.type === "king" || piece.type === "knight") {
                            if (validSquare(sqChkNum, loc) && Square[sqChkNum].status.empty) {
                                Square[sqChkNum].location.addClass("highlighted");
                                sqChkNum = 100;
                            } else {
                                Square[sqChkNum].location.addClass("capture");
                                sqChkNum = 100;
                            }

                        } else if (piece.type === "pawn" && val % 10 === 0) {
                            if (piece.moveCounter < 1 && validSquare(sqChkNum, loc) && validSquare((sqChkNum + (val)), loc) && Square[sqChkNum].status.empty) {
                                Square[sqChkNum].location.addClass("highlighted");
                                Square[(sqChkNum + (val))].location.addClass("highlighted");
                                sqChkNum = 100;
                            } else if (validSquare(sqChkNum, loc) && Square[sqChkNum].status.empty) {
                                Square[sqChkNum].location.addClass("highlighted");
                                sqChkNum = 100;
                            } else {
                                sqChkNum = 100;
                            }

                        } else if (piece.type === "pawn" && val % 10 !== 0) {
                            if (validSquare(sqChkNum, loc)) {
                                if (!(Square[sqChkNum].status.empty)) {
                                    Square[sqChkNum].location.addClass("capture");
                                    sqChkNum = 100;
                                } else {
                                    sqChkNum = 100;
                                }
                            } else {
                                sqChkNum = 100;
                            }
                        } else {
                            if (validSquare(sqChkNum, loc) && Square[sqChkNum].status.empty) {
                                Square[sqChkNum].location.addClass("highlighted");
                                sqChkNum += val;
                            } else {
                                Square[sqChkNum].location.addClass("capture");
                                sqChkNum = 100;
                            }
                        }
                    }
                });
            }
        }
    } catch (e) {
        $(".square").removeClass('highlighted');
        $(".square").removeClass('capture');
    }
});

//dragging pieces
$('.board').on('dragstart', '.chess-piece', function(event) {
    oldEvent = event;
    oldSquare = event.target.parentNode;
    dragged = event.target;
    if (colorChecker(event)) {
        dragged.style.opacity = .5;
    }
});

//original opacity when dropped
$('.board').on('dragend', function(event) {
    event.preventDefault();
    dragged.style.opacity = 1;
});

//dim while dragging
$('.board').on('dragover', function(event) {
    event.preventDefault();
});


//dropping the piece is the event that changes most of the game state
$('.board').on('drop', function(event) {
    event.preventDefault();
    var oldLoc = parseInt(dragged.getAttribute('id'));
    var newLoc = parseInt(event.target.getAttribute('id'));

    try {
        if (colorChecker(oldEvent)) {
            if (event.target.classList.contains('highlighted')) {
                dragged.parentNode.removeChild(dragged);
                event.target.appendChild(dragged);
                dragged.setAttribute('id', newLoc)
                Square[oldLoc].piece.object.drop(newLoc);
                Square[oldLoc].setToEmpty();
                $(".square").removeClass('highlighted');
                $(".square").removeClass('capture');
                if (turn === 'white') {
                    turn = 'black';
                    $('.turn-billboard').text(turn);
                    $('.turn-billboard').css({
                        'background-color': 'gray',
                        'color': 'black',
                        'text-shadow': '3px -3px 10px white'
                    });
                } else {
                    turn = 'white';
                    $('.turn-billboard').text(turn);
                    $('.turn-billboard').css({
                        'background-color': 'gray',
                        'color': 'white',
                        'text-shadow': '3px -3px 10px black'
                    });
                }
            } else if (event.target == dragged) {
                dragged.style.opacity = 1;
            } else if (event.target.classList.contains('chess-piece') && event.target.parentNode.classList.contains('capture')) {
                dragged.parentNode.removeChild(dragged);
                $(event.target).hide();
                event.target.parentNode.appendChild(dragged);
                $(event.target).remove();
                dragged.setAttribute('id', newLoc);
                Square[oldLoc].piece.object.drop(newLoc);
                Square[oldLoc].setToEmpty();
                $(".square").removeClass('highlighted');
                $(".square").removeClass('capture');
                if (turn === 'white') {
                    turn = 'black';
                    $('.turn-billboard').text(turn);
                    $('.turn-billboard').css({
                        'background-color': 'gray',
                        'color': 'black',
                        'text-shadow': '3px -3px 10px white'
                    });
                } else {
                    turn = 'white';
                    $('.turn-billboard').text(turn);
                    $('.turn-billboard').css({
                        'background-color': 'gray',
                        'color': 'white',
                        'text-shadow': '3px -3px 10px black'
                    });
                }

            }
            allPieceCheck();
            checkForCheck();

        } else {
            $('.turn-billboard').text("Not Your Turn");
            $('.turn-billboard').css({
                'background-color': 'red',
                'color': 'black',
                'text-shadow': '3px -3px 10px white'
            });
        }
    } catch (e) {
        alert(e);
        console.log(dragged);
        console.log(event.target);
        console.log(oldSquare);
        event.target.removeChild(dragged);
        oldSquare.appendChild(dragged);
        dragged.setAttribute('id', oldLoc);
        Square[newLoc].piece.object.unDrop(oldLoc);
        Square[newLoc].setToEmpty();
        $(".square").removeClass('highlighted');
        $(".square").removeClass('capture');
        if (turn === 'white') {
            turn = 'black';
            $('.turn-billboard').text(turn);
            $('.turn-billboard').css({
                'background-color': 'gray',
                'color': 'black',
                'text-shadow': '3px -3px 10px white'
            });
        } else {
            turn = 'white';
            $('.turn-billboard').text(turn);
            $('.turn-billboard').css({
                'background-color': 'gray',
                'color': 'white',
                'text-shadow': '3px -3px 10px black'
            });
        }


    }

});
// ************************************EVENT LISTENERS***************************************
// ************************************EVENT LISTENERS***************************************
// ************************************EVENT LISTENERS***************************************



});
