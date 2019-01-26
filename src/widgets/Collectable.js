import Phaser from "phaser";

export class Collectable extends Phaser.GameObjects.Image {
  constructor ({ scene, x, y, key, radius, fallSpeed }) {
		super(scene, x, y, key)
		this._radius = radius;
		this._fallSpeed = fallSpeed;
	}

	get collision() {
		return new Phaser.Geom.Circle(this.x, this.y, 100);
	}
	
	collect() {
		console.log('collected!')
		this.emit('destroy');
	}

	update() {
		this.y++;
	}
}
