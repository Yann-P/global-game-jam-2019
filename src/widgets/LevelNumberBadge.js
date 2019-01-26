import Phaser from 'phaser'

export default class extends Phaser.GameObjects.Image {
	constructor ({scene, x, y, levelNumber}) {
		super(scene, x, y, 'l' + levelNumber)
		this.setOrigin(0.5, 0.5)
	}
}
