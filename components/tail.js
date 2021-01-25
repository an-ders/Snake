class Tail {
	constructor(x, y, TILE_SIZE) {
		this.pos = { x: 0, y: 0 };
		this.pos.x = x;
		this.pos.y = y;
	}

	update(x, y) {
		this.pos.x = x;
		this.pos.y = y;
	}

	show() {
		noStroke();
		rect(this.pos.x * TILE_SIZE, this.pos.y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
	}
}
