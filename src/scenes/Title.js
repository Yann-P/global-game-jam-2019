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
		
		const startButton = new Phaser.GameObjects.Sprite(this, 540, 1570, 'playButton')
		startButton.setOrigin(0.5, 0.5)
		startButton.setInteractive()
		startButton.on('pointerdown', () => {
			startButton.setScale(0.8)
		})
		startButton.on('pointerup', () => {
			startButton.setScale(1)
			this.time.addEvent({
				delay: 200,
				callback: () => {
					this.scene.start('Game', config.level1Data)
				}
			})
		})
		this.add.existing(startButton)
	}
}