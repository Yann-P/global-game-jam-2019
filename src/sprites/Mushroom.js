import Phaser from 'phaser'

export default class extends Phaser.GameObjects.Sprite {
	constructor ({ scene, x, y, asset }) {
		super(scene, x, y, asset)
		this.setOrigin(0.5, 0.5)
	}

	update () {
		this.angle += 1
	}
}
