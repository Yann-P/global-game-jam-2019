import Phaser from "phaser";
import config from '../config'
import { timingSafeEqual } from "crypto";

export class Collectable extends Phaser.Physics.Matter.Sprite { // ABSTRACT
  constructor ({ scene, x, y, key, radius, fallSpeed }) {
		super(scene.matter.world, x, y, key, null, { 
			restitution: 0,
			shape: {
				type: 'circle',
				radius: 50
			} 
		})
		this._inJar = false;
		this._radius = radius;
		this.width = this.height = radius * .7;
		this._fallSpeed = fallSpeed
		this.setVelocity(0, this._fallSpeed)
		this.setBounce(0)
		this.setMass(0.001)
		this.setDensity(0.001)

		this.setFrictionAir(0)
		this.setFriction(0)
		this.destroyed = false
		this.setScale(radius / 50)

		this.collisionPoint = new Phaser.Geom.Point(this.x, this.y);
		this.collisionShapeCache = new Phaser.Geom.Circle(this.x, this.y, this._radius);

		this._tween = scene.tweens.add({
			targets: [this],
			rotation: Math.PI * 2, 
			duration: Math.random() * 1000 + 3000,
			delay: Math.random() * 1000,
			ease: 'Quad.easeInOut',
			repeat: -1
		});

		this._glow = this._addGlow(scene, radius);
		this.depth++;

		this._glowTween = scene.tweens.add({
			targets: [this._glow],
			scaleX:1.5,
			scaleY:1.5,
			duration: Math.random() * 1000 + 3000,
			delay: Math.random() * 5000,
			yoyo: true,
			repeat: -1
		});



		scene.add.existing(this._glow);

	}

	_addGlow(scene, radius) { // ABSTRACT
		throw new Error('Hey you! This is supposed to be overriden in subclasses!');
	}

	enteredTheJar() {
		if(this._inJar) return;
		this.emit('enterjar')
		this._inJar = true;
		this.stopTween();
	}

	stopTween() {
		this._tween.stop();
		this._glowTween.stop();
	}

	destroy() {
		this._glow && this._glow.destroy();
		this.stopTween();
		super.destroy();
		
	}

	get collision() {
		this.collisionPoint.x = this.x, this.collisionPoint.y = this.y;
		return this.collisionPoint;
	}
	
	get collisionShape() {
		this.collisionShapeCache.setPosition(this.x, this.y)
		return this.collisionShapeCache;
	}
	
	collect() {
		console.log('collected!')
		this.emit('destroy');
	}

	update(t, dt, horizontalSpeed) {
		if (!this.destroyed) {
			if(this._glow) {
				this._glow.setPosition(this.x, this.y)
			}

			this.setVelocity(horizontalSpeed || 0, this._fallSpeed)
			if (this.y > config.height + config.physicsSpacing / 2) {
				this.destroyed = true
				this.destroy()
			}

			
		}
	}
}
