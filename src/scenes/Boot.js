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
	}
	
	preload () {
		if (config.webfonts.length) {
			WebFont.load({
				google: {
					families: config.webfonts
				},
				active: this.fontsLoaded.bind(this)
			})
		}
		
		let text = this.add.text(config.width / 2, config.height / 2, 'loading fonts', { font: '16px Arial', fill: '#dddddd', align: 'center' })
		text.setOrigin(0.5, 0.5)

		this.load.image('loaderBg', './assets/images/loader-bg.png')
		this.load.image('loaderBar', './assets/images/loader-bar.png')
	}
	
	update () {
		if (config.webfonts && config.webfonts.length > 0 && this.fontsReady) {
			this.scene.start('Splash')
		}
		if (!config.webfonts || config.webfonts.length <= 0) {
			this.scene.start('Splash')
		}
	}
	
	fontsLoaded () {
		this.fontsReady = true
	}
}