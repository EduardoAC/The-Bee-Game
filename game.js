/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function Bee() {
    this.HP;
    this.damageInjured;
    this.position = [0, 0];
    this.name = "Bee";
}

Bee.prototype.attacked = function () {
    if (this.HP >= 0) {
        this.HP -= this.damageInjured;
    }
};

Bee.prototype.isAlive = function () {
    return this.HP > 0;
};

Bee.prototype.render = function () {

};
Bee.prototype.whereIAm = function () {
    return this.position;
};

Bee.prototype.whoIAm = function(){
    return this.name;
};

Bee.prototype.printStatus = function(){
    var statusText, className;
    if(this.isAlive()){
        statusText = "You hit the " + this.name + " Bee still have " + this.HP;
        className = "info"
    }else{
        statusText = "Great job you killed a " + this.name + " bee";
        className = "success";
    }
    printStatus(statusText, className);
};

QueenBee.prototype = new Bee();
QueenBee.prototype.constructor = QueenBee;
function QueenBee() {
    this.HP = 100;
    this.damageInjured = 8;
    this.position = [0, 0];
    this.name = "Queen";
}

WorkerBee.prototype = new Bee();
WorkerBee.prototype.constructor = WorkerBee;
function WorkerBee() {
    this.HP = 75;
    this.damageInjured = 10;
    this.position = [0, 0];
    this.name = "Worker";
}

DroneBee.prototype = new Bee();
DroneBee.prototype.constructor = DroneBee;
function DroneBee() {
    this.HP = 50;
    this.damageInjured = 12;
    this.position = [0, 0];
    this.name = "Drone";
}


var drawHexGrid = function(opts, c) {

    var alpha = opts.alpha || 1;
    var color = opts.color || '#1e1e1e';
    var lineWidth = opts.lineWidth || 1;
    var radius = opts.radius || 20;


    var mapGridCanvas = c.getContext("2d");
    mapGridCanvas.clearRect(0, 0, c.width, c.height);
    mapGridCanvas.globalAlpha = alpha;
    mapGridCanvas.strokeStyle = color;
    mapGridCanvas.lineWidth = lineWidth;

    //length of line
    var i, x, y, r = radius;
    var part = 60;
    var hexSize = r * Math.sqrt(3);
    var yHexSize = r * Math.sqrt(2.25);
    var xHexes = 2000 / hexSize;
    var yHexes = 2000 / yHexSize;
    var shiftX;
    
    mapGridCanvas.beginPath();

    //loop through hex "rows" and every other row shift
    for (var xGrid = 0; xGrid <= xHexes; xGrid++) {
        for (var yGrid = 0; yGrid <= yHexes; yGrid++) {
            if (yGrid % 2 == 0) {
                //even row
                shiftX = hexSize / 2;
            } else {
                //odd row
                shiftX = 0;
            }
            for (i = 0; i <= 6; i++) {
                var a = i * part - 90;
                x = r * Math.cos(a * Math.PI / 180) + xGrid * hexSize + shiftX;
                y = r * Math.sin(a * Math.PI / 180) + yGrid * yHexSize;
                if (i == 0) {
                    mapGridCanvas.moveTo(x, y);
                } else {
                    mapGridCanvas.lineTo(x, y);
                }
            }
        }
    }
    mapGridCanvas.stroke();

    return c;
};

var grid = function(container) {
    drawHexGrid({}, container);
};


var getRandomMinMax = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

var printStatus = function(statusText, className){
    var logGame = document.getElementById("log-game");
    var status = document.createElement("LI");
    var statusNodeText = document.createTextNode(statusText);
    status.appendChild(statusNodeText);
    status.className = className;
    logGame.appendChild(status);

};
var mixBees = function (array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};
  
var domReady = function(callback) {
    document.readyState === "interactive" || document.readyState === "complete" ? callback() : document.addEventListener("DOMContentLoaded", callback);
};

var beeNest;
var initializeGame = function(){
    var queenBee = new QueenBee();
    var BeePosition = [];
    var i;

    BeePosition.push( queenBee);

    for (i = 0; i < 5; i++) {
        BeePosition.push(new WorkerBee());
    }
    
    for (i = 0; i < 8; i++) {
        BeePosition.push(new DroneBee());
    }

    beeNest = mixBees(BeePosition);    
    
    //Draw Game layout
    grid(document.getElementById("game-console"));
};
var resetGame = function(){
    //Build the Nest with 5 workers, 8 Drones and one Queen
    initializeGame();
};
var removeItem = function(array, index){
    array.splice(index, 1);
};

var initialize = function(){

    //Build the Nest with 5 workers, 8 Drones and one Queen
    initializeGame();
    
    //Manage the firing button to kill he Nest
    document.getElementById("fire-start-game-btn").addEventListener("click", function(event){
        if(event.target.firstChild.data == "START A NEW GAME"){
            event.target.firstChild.data = "FIRE!!";
            resetGame();
            return;
        }
        var beeAttackedIndex = getRandomMinMax(0, beeNest.length - 1);
        var beeAttacked = beeNest[beeAttackedIndex];
        
        beeAttacked.attacked();
        beeAttacked.printStatus();
        if(!beeAttacked.isAlive()){
            removeItem(beeNest,beeAttackedIndex);
            if(beeAttacked.whoIAm() == "Queen"){
                printStatus("Great job you destroy the Nest","success");
                printStatus("Press start to reset the game","success");
                event.target.firstChild.data = "START A NEW GAME";
            }
        }
    });
};

domReady(initialize);