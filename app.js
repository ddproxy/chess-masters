$(document).ready(function() {
    var $board = $('.board');
    var id = 81;
// make the board
    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            $board.append('<div class="square" id="' + id + '"> ' + id + ' </div>');
            id++;
        };
        id = id - 18;
    };

// give it the right background












});
