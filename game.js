/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */




var getRandomMinMax = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

var printStatus = function (statusText, className) {
    var logGame = document.getElementById("log-game");
    var status = document.createElement("LI");
    var statusNodeText = document.createTextNode(statusText);
    status.appendChild(statusNodeText);
    status.className = className;
    logGame.appendChild(status);

};

var domReady = function (callback) {
    document.readyState === "interactive" || document.readyState === "complete" ? callback() : document.addEventListener("DOMContentLoaded", callback);
};

var beeNest;

var repaint = function () {
    //Draw Game layout
    var canvas = document.getElementById("game-console");
    var context = drawHexGrid({}, canvas);
    var length = beeNest.length;

    for (var i = 0; i < length; i++) {
        beeNest[i].render(context);
    }
};

var initializeGame = function () {
    beeNest = new Hive();
    beeNest.createHive();
    repaint();
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

    //Manage the firing button to kill he Nest
    document.getElementById("fire-start-game-btn").addEventListener("click", function (event) {
        if (event.target.firstChild.data == "START A NEW GAME") {
            event.target.firstChild.data = "FIRE!!";
            resetGame();
            return;
        }
        var beeAttackedIndex = getRandomMinMax(0, beeNest.length - 1);
        var beeAttacked = beeNest[beeAttackedIndex];

        beeAttacked.attacked();
        beeAttacked.printStatus(printStatus);
        if (!beeAttacked.isAlive()) {
            removeItem(beeNest, beeAttackedIndex);
            repaint();
            if (beeAttacked.whoIAm() == "Queen") {
                printStatus("Great job you destroy the Nest", "success");
                printStatus("Press start to reset the game", "success");
                event.target.firstChild.data = "START A NEW GAME";
            }
        }
    });
};

domReady(initialize);