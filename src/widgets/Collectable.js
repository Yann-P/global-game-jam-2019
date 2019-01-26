import Phaser from "phaser";

export class Collectable extends Phaser.Physics.Matter.Sprite {
  constructor ({ scene, x, y, key, radius = 50, fallSpeed = 1 }) {
		super(scene.matter.world, x, y, key, null, { 
			restitution: .9,
			shape: {
				type: 'circle',
				radius
			} 
		})
		this._radius = radius;
		this._fallSpeed = fallSpeed;
		this.width = this.height = radius;
	}

	get collision() {
		return new Phaser.Geom.Circle(this.x, this.y, 100);
	}
	
	collect() {
		console.log('collected!')
		this.emit('destroy');
	}

	update() {
		this.y += this._fallSpeed;
	}
}
