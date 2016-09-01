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
                    piece: undefined
                }
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
