var data = function (){

this.pawnMoves = [10, 9, 11];
this.pawnMovesNegative = [-10, -9, -11];
this.rookMoves = [1, -1, 10, -10];
this.knightMoves = [8, -8, 12, -12, 19, -19, 21, -21];
this.bishopMoves = [9, -9, 11, -11];
this.queenMoves = [1, -1, 9, -9, 10, -10, 11, -11];
this.kingMoves = [1, -1, 9, -9, 10, -10, 11, -11];
this.$board = $('.board');
this.blackPieces = [];
this.whitePieces = [];
this.squareCounter = 81;
this.piecesArray = ['pawn', 'rook', 'knight', 'bishop', 'queen', 'king'];
this.turn = "white";
this.computerColor = "black";
this.odd = true;
this.dragged;
this.oldEvent;
this.Square = {};
this.gamePlays = [];


}
