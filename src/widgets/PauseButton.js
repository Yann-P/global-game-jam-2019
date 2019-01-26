import Phaser from 'phaser'

export default class PauseButton extends Phaser.GameObjects.Image {
	constructor ({scene, x, y}) {
		super(scene, x, y, 'pause')
		this.setOrigin(0.5, 0.5)
		this.setInteractive();
	}
}
