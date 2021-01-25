class Head {
	constructor(TILE_SIZE, HEIGHT) {
		this.size = TILE_SIZE;
		this.pos = { x: HEIGHT / 2, y: HEIGHT / 2 };
		this.v = { x: 0, y: 0 };
		this.colour = 0;
	}

	update() {
		this.pos.x += this.v.x;
		this.pos.y += this.v.y;
	}

	show() {
		noStroke();
		rect(this.pos.x * this.size, this.pos.y * this.size, this.size, this.size);
	}

	changeDir(d) {
		this.v.x = d[0];
		this.v.y = d[1];
	}
}
