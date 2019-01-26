import Phaser from "phaser";
import config from '../config'

export class Collectable extends Phaser.Physics.Matter.Sprite {
  constructor ({ scene, x, y, key, radius = 50, fallSpeed = 10 }) {
		super(scene.matter.world, x, y, key, null, { 
			restitution: 0,
			shape: {
				type: 'circle',
				radius
			} 
		})
		this._radius = radius;
		this.width = this.height = radius;
		this._fallSpeed = fallSpeed
		this.setVelocity(0, this._fallSpeed)
		this.setBounce(0)
		this.setFrictionAir(0)
		this.setFriction(0)
	}

	get collision() {
		return new Phaser.Geom.Circle(this.x, this.y, 100);
	}
	
	collect() {
		console.log('collected!')
		this.emit('destroy');
	}

	update() {
		this.setVelocity(0, this._fallSpeed)
		if (this.y > config.height + config.physicsSpacing / 2) {
			this.destroy()
		}
	}
}
