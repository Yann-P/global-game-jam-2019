import Phaser from 'phaser'

export default class Projectile extends Phaser.GameObjects.Sprite {
	constructor (options) {
		super(options.scene, options.x, options.y, '')
		
		this.destroyed = false
	}
	
	update () {
		if (!this.destroyed) {
			this.y -= 20
			if (this.y < -100) {
				this.destroyed = true
				this.destroy()
			}
		}
	}
}