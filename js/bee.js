/**
 * 
 * Class Bee represents an insect that collect polen and make honey
 * @returns {Bee}
 */
function Bee() {
    this.HP;
    this.damageInjured;
    this.position = [0, 0];
    this.name = "Bee";
    this.imageRef = false;
    this.imageUrl = "images/bee.png";
}

/**
 * function attacked
 * When a bee is attacked lose life based in them resistante to injures
 */
Bee.prototype.attacked = function () {
    if (this.HP >= 0) {
        this.HP -= this.damageInjured;
    }
};

/**
 * function isAlive
 * Return true if the bee still alive
 * @returns {Boolean}
 */
Bee.prototype.isAlive = function () {
    return this.HP > 0;
};

/**
 * function render
 * Render the bee on the screen representen by a Canvas context
 * @param {Canvas Context} context
 */
Bee.prototype.render = function (context) {
    var _this = this;
    var base_image = new Image();
    base_image.src = this.imageUrl;
    var callback = function (_this) {
        _this.imageRef = base_image;
        context.drawImage(base_image, _this.position[0], _this.position[1]);
    }
    base_image.onload = callback.bind(null, _this);
};

/**
 * function whereIAm
 * Return the current position where the bee is in the Canvas
 * @returns {Array}
 */
Bee.prototype.whereIAm = function () {
    return this.position;
};

/**
 * function whoIAm
 * Return unique id based in the type of bee.
 * Types allowed: {Queen | Worker | Drone }
 * @returns {String}
 */
Bee.prototype.whoIAm = function () {
    return this.name;
};

/**
 * function printStatus
 * Print Bee status based in remaining life.
 * @param {function} printStatus Print on screen message with a specific class
 * @returns {undefined}
 */
Bee.prototype.printStatus = function (printStatus) {
    var statusText, className;
    if (this.isAlive()) {
        statusText = "You hit the " + this.name + " Bee still have " + this.HP;
        className = "info"
    } else {
        statusText = "Great job you killed a " + this.name + " bee";
        className = "success";
    }
    printStatus(statusText, className);
};

/**
 * Create a child from Bee class to allow us inheritance
 * @type Bee
 */
QueenBee.prototype = new Bee();
QueenBee.prototype.constructor = QueenBee;
function QueenBee() {
    this.HP = 100;
    this.damageInjured = 8;
    this.position = [135, 0];
    this.name = "Queen";
    this.imageUrl = 'images/queen-bee.png';
}

/**
 * Create a child from Bee class to allow us inheritance
 * @type Bee
 */
WorkerBee.prototype = new Bee();
WorkerBee.prototype.constructor = WorkerBee;
function WorkerBee() {
    this.HP = 75;
    this.damageInjured = 10;
    this.position = [0, 50];
    this.name = "Worker";
    this.imageUrl = 'images/worker-bee.png';
}

/**
 * Create a child from Bee class to allow us inheritance
 * @type Bee
 */
DroneBee.prototype = new Bee();
DroneBee.prototype.constructor = DroneBee;
function DroneBee() {
    this.HP = 50;
    this.damageInjured = 12;
    this.position = [0, 100];
    this.name = "Drone";
    this.imageUrl = 'images/drone-bee.png';
}
