var head;
var food;
var tail = [];

const HEIGHT = 20;
const PERCENT_HEIGHT = 0.8;

var state;
var SCREEN_SIZE;
var TILE_SIZE;
var TEXT_SIZE;

var lastKey;
var moves = [];
var highscore;

/* TO DO LIST
	-add highscore
	-fix end screen DONE
	-fix pause colour DONE
	-put colour variables into head and food DONE
	-add window resize DONE
*/

function setup() {
	TILE_SIZE = floor((windowHeight * PERCENT_HEIGHT) / HEIGHT);
	SCREEN_SIZE = TILE_SIZE * HEIGHT;
	TEXT_SIZE = TILE_SIZE * 4;
	createCanvas(SCREEN_SIZE, SCREEN_SIZE);
	head = new Head(TILE_SIZE, HEIGHT);
	food = new Food(TILE_SIZE, HEIGHT);
	frameRate(10);
	state = 0;
	font = loadFont("/Snake/components/American Captain.ttf");
	textFont(font);
}

function draw() {
	if (state == 0) {
		startState();
	} else if (state == 1) {
		runningState();
	} else if (state == 2) {
		endState();
	} else if (state == 3) {
		pausedState();
	}
}

// START(0) RUNNING(1) END (2) PAUSED (3)
function keyPressed() {
	if (state == 0) {
		state = 1;
	} else if (state == 1) {
		if (key === "w" && lastKey != "s") {
			moves.push([0, -1]);
			lastKey = "w";
		} else if (key === "a" && lastKey != "d") {
			moves.push([-1, 0]);
			lastKey = "a";
		} else if (key === "s" && lastKey != "w") {
			moves.push([0, 1]);
			lastKey = "s";
		} else if (key === "d" && lastKey != "a") {
			moves.push([1, 0]);
			lastKey = "d";
		} else if (key === "p" || keyCode == 27) {
			state = 3;
		}
	} else if (state == 2) {
		// START(0) RUNNING(1) END (2) PAUSED (3)
		state = 0;
		food = new Food(TILE_SIZE, HEIGHT);
		head = new Head(TILE_SIZE, HEIGHT);
		tail = [];
	} else if (state == 3) {
		if (key === "p") {
			state = 1;
		} else if (keyCode === 27) {
			state = 1;
		}
	}
}

function windowResized() {
	TILE_SIZE = floor((windowHeight * PERCENT_HEIGHT) / HEIGHT);
	SCREEN_SIZE = TILE_SIZE * HEIGHT;
	TEXT_SIZE = TILE_SIZE * 4;
	createCanvas(SCREEN_SIZE, SCREEN_SIZE);
	head.size = TILE_SIZE;
	food.size = TILE_SIZE;
}

function startState() {
	background(130, 130, 130);
	textAlign(CENTER);
	fill(90, 150, 200);
	textSize(TEXT_SIZE);

	text("PRESS ANY", SCREEN_SIZE / 2, TILE_SIZE + SCREEN_SIZE / 4);
	text("KEY", SCREEN_SIZE / 2, TILE_SIZE + SCREEN_SIZE / 2);
	text("START", SCREEN_SIZE / 2, TILE_SIZE + (3 * SCREEN_SIZE) / 4);
}

function endState() {
	background(130, 130, 130);
	textAlign(CENTER);
	fill(90, 150, 200);
	textSize(TEXT_SIZE);
	text("GAME OVER", SCREEN_SIZE / 2, TILE_SIZE + SCREEN_SIZE / 3);
	text(
		"SCORE: " + tail.length,
		SCREEN_SIZE / 2,
		TILE_SIZE + (2 * SCREEN_SIZE) / 3
	);
}

function runningState() {
	background(130, 130, 130);
	var lastLoc = { x: head.pos.x, y: head.pos.y };
	var temp;

	if (moves.length > 0) {
		head.changeDir(moves[0]);
		moves.shift();
	}
	head.update();
	for (var i = tail.length - 1; i > -1; i--) {
		temp = { x: tail[i].pos.x, y: tail[i].pos.y };
		tail[i].update(lastLoc.x, lastLoc.y);
		lastLoc = temp;
	}

	checkDied(head, tail);

	if (food.update(head)) {
		head.colour = head.colour + 1 == 7 ? 0 : (head.colour += 1);
		food.colour = food.colour + 1 == 7 ? 0 : (food.colour += 1);
		tail.push(new Tail(head.pos.x, head.pos.y, TILE_SIZE));
	}
	setColour(head.colour);
	head.show();
	tail.forEach((object) => object.show());
	setColour(food.colour);
	food.show();
}

function pausedState() {
	background(130, 130, 130);
	textAlign(CENTER);
	fill(90, 150, 200);
	textSize(TEXT_SIZE);
	text("PAUSED", SCREEN_SIZE / 2, TILE_SIZE + SCREEN_SIZE / 2);
}

function checkDied() {
	tail.forEach(function (object) {
		if (object.pos.x == head.pos.x && object.pos.y == head.pos.y) {
			state = 2;
		}
	});
	if (
		0 > head.pos.x ||
		head.pos.x >= HEIGHT ||
		0 > head.pos.y ||
		head.pos.y >= HEIGHT
	) {
		state = 2;
	}
}

function setColour(n) {
	switch (n) {
		case 0:
			fill(225, 81, 81);
			break;
		case 1:
			fill(224, 150, 81);
			break;
		case 2:
			fill(245, 226, 15);
			break;
		case 3:
			fill(180, 245, 15);
			break;
		case 4:
			fill(15, 203, 245);
			break;
		case 5:
			fill(57, 15, 245);
			break;
		case 6:
			fill(122, 15, 245);
			break;
	}
}
