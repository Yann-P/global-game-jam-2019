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

		this._makeMemoryTexture();

		this.load.image('background', './assets/images/background.jpg')
		this.load.image('pause', './assets/images/pause.png')
		this.load.image('jar', './assets/images/jar.png')
		this.load.image('jar-overlay', './assets/images/jar-overlay.png')


		for(let i = 1; i <= 5; i++)	this.load.image('l'+i, './assets/images/l'+i+'.png')


		this.load.image('progress-bg', './assets/images/progress-bg.png')
		this.load.image('progress-fg', './assets/images/progress-fg.png')
		this.load.image('progress-overlay', './assets/images/progress-overlay.png')
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

	_makeMemoryTexture () {
		const placeholder = this.make.graphics({x: 0, y: 0, add: false});
		placeholder.fillStyle(0xff00ff);
		placeholder.fillCircle(50, 50, 50);
		placeholder.generateTexture('memory', 100, 100);
	}
}