"use strict";
exports.__esModule = true;
var tableauReduction = [
    0, 0, 5, 10, 20, 25
];
exports.prixPanier = function (cart) {
    var nb_books = cart.tome1 + cart.tome2 + cart.tome3 + cart.tome4 + cart.tome5;
    var nb_different_books = 0;
    Object.keys(cart).forEach(function (tome) {
        if (cart[tome] >= 1)
            nb_different_books++;
    });
    return exports.prixLivres(nb_books, nb_different_books);
};
exports.prixLivres = function (nb_books, nb_different_books) {
    if (nb_different_books === void 0) { nb_different_books = 1; }
    var total = nb_books * 8;
    return total - (total / 100 * tableauReduction[nb_different_books]);
};
