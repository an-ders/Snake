class Food {
	constructor(TILE_SIZE, HEIGHT) {
		this.size = TILE_SIZE;
		this.pos = {
			x: int(random(HEIGHT)),
			y: int(random(HEIGHT)),
		};
		this.eaten = false;
		this.colour = 1;
	}

	update(head) {
		if (head.pos.x === this.pos.x && head.pos.y === this.pos.y) {
			var overlap = true;
			while (overlap) {
				overlap = false;
				var newX = int(random(HEIGHT));
				var newY = int(random(HEIGHT));
				tail.forEach((object) => {
					if (newX == object.pos.x && newY == object.pos.y) {
						overlap = true;
					}
				});
				if (newX == head.x && newY == head.y) {
					overlap = true;
				}
			}
			this.pos = { x: newX, y: newY };
			return true;
		}
		return false
	}

	show() {
		noStroke();
		///fill(180,220,80);
		rect(this.pos.x * this.size, this.pos.y * this.size, this.size, this.size);
	}

}
