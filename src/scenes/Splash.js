import Phaser from 'phaser'
import config from '../config'

export default class extends Phaser.Scene {
	constructor () {
		super({ key: 'Splash' })
	}

	initialize () {
	}

	preload () {
		this.loaderBg = this.add.sprite(config.width / 2, config.height / 2, 'loaderBg')
		this.loaderBar = this.add.sprite(config.width / 2, config.height / 2, 'loaderBar')

		//
		// load your assets
		//
		this.load.image('mushroom', 'assets/images/mushroom2.png')
	}

	create () {
		this.scene.start('Game')
	}
}
