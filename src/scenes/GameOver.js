import Phaser from 'phaser'
import config from '../config'
import store from '../store'


export default class extends Phaser.Scene {
	constructor () {
		super({ key: 'GameOver' })
	}

	init () {

	}

	preload () {
		
	}

	create () {


		const background = new Phaser.GameObjects.Image(this, this.sys.canvas.width / 2, this.sys.canvas.height / 2, 'gameover')
		this.add.existing(background)


		const play = new Phaser.GameObjects.Image(this, this.sys.canvas.width / 2, this.sys.canvas.height - this.sys.canvas.height / 10, 'play')
		this.add.existing(play)
		play.setOrigin(0.5, 0.5)
		play.setInteractive()
		play.on('pointerdown', () => this.scene.start('Game', config.level1Data))
	}
}