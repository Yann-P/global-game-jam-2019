import Phaser from 'phaser'
import WebFont from 'webfontloader'
import config from '../config'

export default class extends Phaser.Scene {
	constructor () {
		super({ key: 'Boot' })
	}

	initialize () {
		this.stage.backgroundColor = '#EDEEC9'
		this.fontsReady = false
		this.fontsLoaded = this.fontsLoaded.bind(this)
	}

	preload () {
		if (config.webfonts.length) {
			WebFont.load({
				google: {
					families: config.webfonts
				},
				active: this.fontsLoaded
			})
		}

		let text = this.add.text(config.width / 2, config.height / 2, 'loading fonts', { font: '16px Arial', fill: '#dddddd', align: 'center' })
		text.setOrigin(0.5, 0.5)

		this.load.image('loaderBg', './assets/images/loader-bg.png')
		this.load.image('loaderBar', './assets/images/loader-bar.png')
	}

	update () {
		this.scene.start('Splash')

		if (config.webfonts.length && this.fontsReady) {
			this.scene.start('Splash')
		}
		if (!config.webfonts.length) {
			this.scene.start('Splash')
		}
	}

	fontsLoaded () {
		this.fontsReady = true
	}
}
