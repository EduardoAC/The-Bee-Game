
function Hive() {
    this.bees = [];
    this.population = {
        queens: 1,
        workers: 5,
        drones: 8
    };
}

Hive.prototype.createHive = function () {
    var BeePosition = [];
    var i, temp;

    /**
     * Populate the hive with N queens
     */
    for (i = 0; i < this.population.queens; i++) {
        temp = new QueenBee();
        BeePosition.push(temp);
    }

    /**
     * Populate the hive with M workers
     */
    for (i = 0; i < 5; i++) {
        var temp = new WorkerBee();
        temp.position[0] = i * 35 + 70;
        BeePosition.push(temp);
    }

    for (i = 0; i < 8; i++) {
        var temp = new DroneBee();
        temp.position[0] = i * 25 + 50;
        BeePosition.push(temp);
    }

    this.bees = this.mixBees(BeePosition);
};

Hive.prototype.drawHexGrid = function (opts, c) {

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
    return mapGridCanvas;
};
Hive.prototype.mixBees = function (array) {
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


