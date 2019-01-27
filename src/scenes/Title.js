import Phaser from 'phaser'
import config from '../config'

export default class extends Phaser.Scene {
	constructor () {
		super({ key: 'Title' })
	}

	initialize () {
	}

	preload () {
		
	}

	create () {
		const background = new Phaser.GameObjects.Image(this, this.sys.canvas.width / 2, this.sys.canvas.height / 2, 'startscreen')
		this.add.existing(background)
		
		const startButton = new Phaser.GameObjects.Zone(this, 540, 1570, 300, 300)
		startButton.setOrigin(0.5, 0.5)
		startButton.setInteractive()
		startButton.on('pointerdown', () => this.scene.start('EndLevel', config.level1Data))
		this.add.existing(startButton)
	}
}