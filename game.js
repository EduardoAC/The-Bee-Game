/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var domReady = function (callback) {
    document.readyState === "interactive" || document.readyState === "complete" ? callback() : document.addEventListener("DOMContentLoaded", callback);
};

var beeNest;

var initializeGame = function () {
    beeNest = new Hive("game-console");
    beeNest.createHive();
    beeNest.events();
    beeNest.render();
};

var resetGame = function () {
    //Build the Nest with 5 workers, 8 Drones and one Queen
    initializeGame();
};
var removeItem = function (array, index) {
    array.splice(index, 1);
};

var initialize = function () {

    //Build the Nest with 5 workers, 8 Drones and one Queen
    initializeGame();
};

domReady(initialize);