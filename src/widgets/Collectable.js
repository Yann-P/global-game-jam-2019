import Phaser from "phaser";
import config from '../config'

export class Collectable extends Phaser.Physics.Matter.Sprite {
  constructor ({ scene, x, y, key, radius, fallSpeed }) {
		super(scene.matter.world, x, y, key, null, { 
			restitution: 0,
			shape: {
				type: 'circle',
				radius: 50
			} 
		})
		this._radius = radius;
		this.width = this.height = radius;
		this._fallSpeed = fallSpeed
		this.setVelocity(0, this._fallSpeed)
		this.setBounce(0)
		this.setFrictionAir(0)
		this.setFriction(0)
		this.destroyed = false
		this.setScale(radius / 100)
	}

	get collision() {
		return new Phaser.Geom.Point(this.x, this.y);
	}
	
	collect() {
		console.log('collected!')
		this.emit('destroy');
	}

	update(t, dt) {
		if (!this.destroyed) {
			this.setVelocity(0, this._fallSpeed)
			if (this.y > config.height + config.physicsSpacing / 2) {
				this.destroyed = true
				this.destroy()
			}
		}
	}
}
