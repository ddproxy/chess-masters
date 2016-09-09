$(document).ready(function() {

    var Square = {};
    var pawnMoves = [10, 9, 11];
    var pawnMovesNegative = [-10, -9, -11];
    var rookMoves = [1, -1, 10, -10];
    var knightMoves = [8, -8, 12, -12, 19, -19, 21, -21];
    var bishopMoves = [9, -9, 11, -11];
    var queenMoves = [1, -1, 9, -9, 10, -10, 11, -11];
    var kingMoves = [1, -1, 9, -9, 10, -10, 11, -11];
    var blackPieces = [];
    var whitePieces = [];
    var squareCounter = 81;
    var piecesArray = ['pawn', 'rook', 'knight', 'bishop', 'queen', 'king'];
    var turn = "white";
    var computerPlay = false;
    var odd = true;
    var dragged;
    var oldEvent;
    var gamePlays = [];
    var errorCount = 0;

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

        this.place = function(num, old) {
            Square[num].location.append($('<img class="chess-piece" draggable="true" src="' + this.img + '" id="' + num + '" />'));
            Square[num].status.empty = false;
            Square[num].piece.object = this;
            this.coordinates = Square[num].coordinates;
            this.sqNumber = num;
            this.previousSquares.push(old);
            Square[old].piece.history.push(this);
            Square[old].setToEmpty()
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

        };


        this.start(start);
        this.previousSquares = [];
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
            odd = !(odd);
            for (var j = 0; j < 8; j++) {
                if (odd) {
                    $('#' + num).css({
                        "background-image": "url('./images/dark-bg.jpeg')"
                    });
                    odd = false;
                } else {
                    $('#' + num).css({
                        "background-image": "url('./images/light-bg.jpeg')"
                    });
                    odd = true;
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
                        empty: true
                    },
                    piece: {
                        object: undefined,
                        history: []
                    },
                    coordinates: '' + String.fromCharCode((0 - i) + 104) + (j + 1) + '',
                    setToEmpty: function() {
                        this.status.empty = true;
                        this.piece.object = undefined;
                        this.location.empty();
                    },
                    clear: function() {
                        this.validForOpponentArray = [];
                        this.validForPlayerArray = [];
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

    };
    makeBoard(81);

    for (var i = 0; i < piecesArray.length; i++) {
        var chessPiece = piecesArray[i];


        // make the pawns
        if (chessPiece === 'pawn') {
            whtpawn1 = new Piece('whtpawn1', "white", "./images/pieces/wht-pwn.png", pawnMoves, 21, "pawn");
            whtpawn2 = new Piece('whtpawn2', "white", "./images/pieces/wht-pwn.png", pawnMoves, 22, "pawn");
            whtpawn3 = new Piece('whtpawn3', "white", "./images/pieces/wht-pwn.png", pawnMoves, 23, "pawn");
            whtpawn4 = new Piece('whtpawn4', "white", "./images/pieces/wht-pwn.png", pawnMoves, 24, "pawn");
            whtpawn5 = new Piece('whtpawn5', "white", "./images/pieces/wht-pwn.png", pawnMoves, 25, "pawn");
            whtpawn6 = new Piece('whtpawn6', "white", "./images/pieces/wht-pwn.png", pawnMoves, 26, "pawn");
            whtpawn7 = new Piece('whtpawn7', "white", "./images/pieces/wht-pwn.png", pawnMoves, 27, "pawn");
            whtpawn8 = new Piece('whtpawn8', "white", "./images/pieces/wht-pwn.png", pawnMoves, 28, "pawn");
            blkpawn1 = new Piece('blkpawn1', "black", "./images/pieces/blk-pawn.png", pawnMovesNegative, 71, "pawn");
            blkpawn2 = new Piece('blkpawn2', "black", "./images/pieces/blk-pawn.png", pawnMovesNegative, 72, "pawn");
            blkpawn3 = new Piece('blkpawn3', "black", "./images/pieces/blk-pawn.png", pawnMovesNegative, 73, "pawn");
            blkpawn4 = new Piece('blkpawn4', "black", "./images/pieces/blk-pawn.png", pawnMovesNegative, 74, "pawn");
            blkpawn5 = new Piece('blkpawn5', "black", "./images/pieces/blk-pawn.png", pawnMovesNegative, 75, "pawn");
            blkpawn6 = new Piece('blkpawn6', "black", "./images/pieces/blk-pawn.png", pawnMovesNegative, 76, "pawn");
            blkpawn7 = new Piece('blkpawn7', "black", "./images/pieces/blk-pawn.png", pawnMovesNegative, 77, "pawn");
            blkpawn8 = new Piece('blkpawn8', "black", "./images/pieces/blk-pawn.png", pawnMovesNegative, 78, "pawn");

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
            // make kings
        } else {
            var whtking = new Piece('whtking', "white", "./images/pieces/wht-king.png", kingMoves, 15, "king");
            var blkking = new Piece('blkking', "black", "./images/pieces/blk-king.png", kingMoves, 85, "king");
            whtking.check = false;
            blkking.check = false;
        }
    };




    $('.turn-billboard').text(turn);

    function validSquareOnBoard(num) {

        // not a square on the board return false
        if (!(num > 10 && num < 89 && num % 10 !== 0 && (num + 1) % 10 !== 0)) {
            return false;
        } else {
            return true;
        }
    };

    function colorChecker(e) {
        try {
            var num = parseInt(e.target.getAttribute('id'));
            var color = Square[num].piece.object.color;
            return (color === turn);

        } catch (e) {}
    };

    function rewindCapture(fromSquare, toSquare) {
        var pieceArr = Square[fromSquare].piece.history
        var lastPiece = pieceArr[pieceArr.length - 1]
        lastPiece.place(fromSquare, toSquare)
        pieceArr.pop();
        pieceArr.pop();
        lastPiece.previousSquares.pop();
        lastPiece.previousSquares.pop();

        pieceArr = Square[toSquare].piece.history
        lastPiece = pieceArr[pieceArr.length - 2]
        lastPiece.start(toSquare);
        pieceArr.pop();
        pieceArr.pop();
        lastPiece.previousSquares.pop();
        lastPiece.previousSquares.pop();
    };

    function rewind(fromSquare, toSquare) {
        var pieceArr = Square[fromSquare].piece.history
        var lastPiece = pieceArr[pieceArr.length - 1]
        lastPiece.place(fromSquare, toSquare)
        pieceArr.pop();
        pieceArr.pop();
        lastPiece.previousSquares.pop();
        lastPiece.previousSquares.pop();
    };

    function emptyOrDiffColor(chkNum, orig) {
        try {
            return !(Square[chkNum].piece.object.color === Square[orig].piece.object.color);
        } catch (e) {
            return true;
        };
    };

    var validForOpponent = function(piece) {
        piece.threatining = [];

        var loc = piece.sqNumber;
        piece.validIncrements.forEach(function(val, i) {
            var sqChkNum = loc + val;

            while (validSquareOnBoard(sqChkNum)) {
                if (piece.type === "king" || piece.type === "knight") {
                    if (!(emptyOrDiffColor(sqChkNum, loc))) {
                        Square[sqChkNum].protection.protectedby.push(Square[loc].piece.object);
                        Square[loc].protection.protecting.push(Square[sqChkNum].piece.object);
                        sqChkNum = 100;
                    } else if (validSquareOnBoard(sqChkNum) && Square[sqChkNum].status.empty) {
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
                    } else if (validSquareOnBoard(sqChkNum)) {
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
                    } else if (validSquareOnBoard(sqChkNum) && Square[sqChkNum].status.empty) {

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


    };

    var validFor = function(piece) {
        var loc = piece.sqNumber;

        piece.validIncrements.forEach(function(val, i) {
            var sqChkNum = loc + val;
            while (validSquareOnBoard(sqChkNum)) {
                if (piece.type === "king" || piece.type === "knight") {
                    if (!(emptyOrDiffColor(sqChkNum, loc))) {
                        Square[sqChkNum].protection.protectedby.push(Square[loc].piece.object);
                        Square[loc].protection.protecting.push(Square[sqChkNum].piece.object);
                        sqChkNum = 100;
                    } else
                    if (validSquareOnBoard(sqChkNum) && Square[sqChkNum].status.empty) {
                        Square[sqChkNum].validForPlayerArray.push(piece);
                        sqChkNum = 100;
                    } else {
                        Square[sqChkNum].validForPlayerArray.push(piece)
                        sqChkNum = 100;
                    }

                } else if (piece.type === "pawn" && val % 10 === 0) {
                    if (piece.moveCounter < 1 && validSquareOnBoard(sqChkNum) && validSquare((sqChkNum + (val)), loc) && Square[sqChkNum].status.empty) {

                        Square[sqChkNum].validForPlayerArray.push(piece);
                        Square[(sqChkNum + (val))].validForPlayerArray.push(piece);
                        sqChkNum = 100;
                    } else if (validSquareOnBoard(sqChkNum) && Square[sqChkNum].status.empty) {
                        Square[sqChkNum].validForPlayerArray.push(piece);
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
                    if (validSquareOnBoard(sqChkNum)) {
                        if (!(Square[sqChkNum].status.empty)) {

                            Square[sqChkNum].validForPlayerArray.push(piece);
                            if (emptyOrDiffColor(sqChkNum, loc)) {
                                piece.validSquares.push(sqChkNum);
                            }
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
                    if (validSquareOnBoard(sqChkNum) && Square[sqChkNum].status.empty) {
                        Square[sqChkNum].validForPlayerArray.push(piece);
                        sqChkNum += val;
                    } else {
                        Square[sqChkNum].validForPlayerArray.push(piece);
                        sqChkNum = 100;
                    }
                }
            }
        });



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

        }
    };

    var checkForCheck = function(callback) {
        for (var id in Square) {
            if (Square[id].hasKing() === turn && Square[id].validForOpponentArray.length > 0) {
                if (turn === "white") {
                    whtking.check === true;
                    alert("CHECK!")
                } else {
                    blkking.check === true;
                    alert("CHECK!")
                    computerPlay = false;
                    $('.game-mode').text("Playing A Friend");
                    alert("I don't know how to get myself out of check can you please help?")
                }

            } else if (Square[id].hasKing() === "white" || Square[id].hasKing() === "black") {
                if (Square[id].validForPlayerArray.length > 0) {
                    throw "You've put yourself in check"
                }
            }
        }
    };

    function checkmate() {
        if (errorCount > 5) {
            var x = confirm("I think you are in Checkmate, click cancel to continue");
            if (x === true) {
                location.reload();
            } else {
              errorCount = 0
            }
        }
    }

    function validMoveFiller() {
        for (var i = 0; i < blackPieces.length; i++) {
            var piece = blackPieces[i];
            piece.validSquares = [];
            piece.validIncrements.forEach(function(val, i) {
                var oldSq = piece.sqNumber
                var newSq = oldSq + val;
                while (validSquareOnBoard(newSq)) {
                    if (piece.type === "king" || piece.type === "knight") {
                        if (emptyOrDiffColor(newSq, oldSq)) {
                            piece.validSquares.push(newSq);
                            newSq = 100;
                        } else {
                            newSq = 100;
                        }
                    } else if (piece.type === "pawn" && val % 10 === 0) {
                        if (emptyOrDiffColor(newSq, oldSq)) {
                            piece.validSquares.push(newSq);
                            piece.validSquares.push(newSq + val);
                            newSq = 100;
                        } else {
                            newSq = 100;
                        }

                    } else if (piece.type === "pawn" && val % 10 !== 0) {
                        if (emptyOrDiffColor(newSq, oldSq) && Square[newSq].status.empty === false) {
                            piece.validSquares.push(newSq);
                            newSq = 100;
                        } else {
                            newSq = 100;
                        }

                    } else {
                        if (emptyOrDiffColor(newSq, oldSq)) {
                            piece.validSquares.push(newSq);
                            newSq += val;
                        } else {
                            newSq = 100;
                        }

                    }
                }
            });
        }
    }

    function BlackMoves() {
      $(".square").removeClass('starting');
      $(".square").removeClass('going');
        validMoveFiller();
        var movable = [];
        for (var i = 0; i < 16; i++) {
            var bpiece = blackPieces[i];
            if (bpiece.validSquares.length > 0) {
                movable.push(bpiece);
            }
        }
        var piecePicker = Math.floor(Math.random() * (movable.length));
        var selectPiece = movable[piecePicker];
        setTimeout(function() {
            Square[selectPiece.sqNumber].location.addClass('going');
        }, 400)

        var SquarePicker = Math.floor(Math.random() * (selectPiece.validSquares.length));
        var selectSquare = selectPiece.validSquares[SquarePicker];
        setTimeout(function() {
            try {

                if (selectPiece.threatining.length > 0) {
                    selectPiece.place(selectPiece.threatining[0].sqNumber, selectPiece.sqNumber);
                    allPieceCheck();
                    checkForCheck();
                } else if (emptyOrDiffColor(selectSquare, selectPiece.sqNumber)) {
                    if (Square[selectSquare].status.empty === false) {
                        Square[selectSquare].piece.history.push(Square[selectSquare].piece.object);
                        Square[selectSquare].piece.object.previousSquares.push(selectSquare);
                        Square[selectSquare].setToEmpty();
                        selectPiece.place(selectSquare, selectPiece.sqNumber);
                        allPieceCheck();
                        checkForCheck();
                    } else {
                        selectPiece.place(selectSquare, selectPiece.sqNumber);
                        allPieceCheck();
                        checkForCheck();
                    }
                } else {
                    throw "computer made a bad move its trying again"
                }
            } catch (e) {
                alert(e);
                errorCount++
                console.log(errorCount);

                    rewind(selectPiece.sqNumber, selectSquare);


            }
        }, 1200)
    }





    $('.board').on('mouseenter', '.square', function(event) {
        var loc = parseInt(event.target.getAttribute('id'));
        var piece = Square[loc].piece.object;
        $(".square").removeClass('highlighted');
        $(".square").removeClass('capture');
        $(".square").removeClass('protected');
        $(".square").removeClass('starting');
        $(".square").removeClass('going');

        if (Square[loc].status.empty === false && colorChecker(event)) {
            piece.validIncrements.forEach(function(val, i) {
                var sqChkNum = loc + val;
                while (validSquareOnBoard(sqChkNum)) {
                    if (piece.type === "king" || piece.type === "knight") {
                        if (validSquareOnBoard(sqChkNum) && Square[sqChkNum].status.empty) {
                            Square[sqChkNum].location.addClass("highlighted");
                            sqChkNum = 100;
                        } else {
                            if (Square[sqChkNum].piece.object.color === turn) {
                                Square[sqChkNum].location.addClass("protected");
                                sqChkNum = 100;
                            } else {
                                Square[sqChkNum].location.addClass("capture");
                                sqChkNum = 100;
                            }
                        }
                    } else if (piece.type === "pawn" && val % 10 === 0) {
                        if (piece.previousSquares.length < 1 && validSquareOnBoard(sqChkNum) && validSquareOnBoard((sqChkNum + (val))) && Square[sqChkNum].status.empty) {
                            Square[sqChkNum].location.addClass("highlighted");
                            Square[(sqChkNum + (val))].location.addClass("highlighted");
                            sqChkNum = 100;
                        } else if (validSquareOnBoard(sqChkNum) && Square[sqChkNum].status.empty) {
                            Square[sqChkNum].location.addClass("highlighted");
                            sqChkNum = 100;
                        } else {
                            sqChkNum = 100;
                        }
                    } else if (piece.type === "pawn" && val % 10 !== 0) {
                        if (validSquareOnBoard(sqChkNum)) {
                            if (!(Square[sqChkNum].status.empty)) {
                                if (Square[sqChkNum].piece.object.color === turn) {
                                    Square[sqChkNum].location.addClass("protected");
                                    sqChkNum = 100;
                                } else {
                                    Square[sqChkNum].location.addClass("capture");
                                    sqChkNum = 100;
                                }
                            } else {
                                sqChkNum = 100;
                            }
                        } else {
                            sqChkNum = 100;
                        }
                    } else {
                        if (validSquareOnBoard(sqChkNum) && Square[sqChkNum].status.empty) {
                            Square[sqChkNum].location.addClass("highlighted");
                            sqChkNum += val;
                        } else {
                            if (Square[sqChkNum].piece.object.color === turn) {
                                Square[sqChkNum].location.addClass("protected");
                                sqChkNum = 100;
                            } else {
                                Square[sqChkNum].location.addClass("capture");
                                sqChkNum = 100;
                            }
                        }
                    }
                }
            });
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
                    Square[oldLoc].piece.object.place(newLoc, oldLoc);

                } else if (event.target == dragged) {
                    dragged.style.opacity = 1;
                } else if (event.target.classList.contains('chess-piece') && event.target.parentNode.classList.contains('capture')) {
                    Square[newLoc].piece.history.push(Square[newLoc].piece.object);
                    Square[newLoc].piece.object.previousSquares.push(newLoc);
                    Square[newLoc].setToEmpty();
                    Square[oldLoc].piece.object.place(newLoc, oldLoc);

                }
            } else {
                $('.turn-billboard').text("Not Your Turn");
                $('.turn-billboard').css({
                    'background-color': 'red',
                    'color': 'black',
                    'text-shadow': '3px -3px 10px white'
                });
            }
            allPieceCheck();
            checkForCheck();
            if (computerPlay === true) {
                BlackMoves();
            }

        } catch (e) {
            alert(e);

            errorCount+=2
            console.log(errorCount);
            if (event.target.classList.contains('chess-piece')) {
                rewindCapture(oldLoc, newLoc);
            } else {
                rewind(oldLoc, newLoc);
            }

        }
        // this is the closing tag of the drop event
        checkmate();
    });

    $('.game-mode').on('click', function() {
        if (computerPlay) {
            computerPlay = false;
            $(this).text("Playing A Friend");
            if (confirm("Would you like to start a new game? Click OK to start a new game or cancel to have a friend pick up where the computer left off")) {
                location.reload();
            }
        } else {
            computerPlay = true;
            $(this).text("Playing Computer");
            alert("The Computer will continue playing for Black")
            if (turn === "black") {
                BlackMoves();
            }
        }

    });









    // this is the closing tag
});
