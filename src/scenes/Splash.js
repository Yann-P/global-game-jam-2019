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
		this._makeMemoryTexture();

		this.load.image('bg-end', './assets/images/bg-end.png')
		this.load.image('finished', './assets/images/finished.png')
		this.load.image('play', './assets/images/play.png')

		for(let i = 0; i <= 100; i += 10) {
			this.load.image('e'+i, './assets/images/e'+i+'.png')

		}


		this.load.image('background', './assets/images/background.jpg')
		this.load.image('pause', './assets/images/pause.png')
		this.load.image('jar', './assets/images/jar.png')
		this.load.image('jar-overlay', './assets/images/jar-overlay.png')
		this.load.image('mem-good', './assets/images/mem-good.png')
		this.load.image('mem-bad', './assets/images/mem-bad.png')
		this.load.image('mem-trauma', './assets/images/mem-trauma.png')
		this.load.image('alzheimer', './assets/images/alzheimer.png')
		this.load.image('glow', './assets/images/glow.png')
		this.load.image('startscreen', '/assets/images/Startscreen_MemoryLane_v002.png')
		this.load.image('playButton', '/assets/images/PlayButton_MemoryLane_v001.png')

		for(let i = 1; i <= 5; i++)	this.load.image('l'+i, './assets/images/l'+i+'.png')

		this.load.image('progress-bg', './assets/images/progress-bg.png')
		this.load.image('progress-fg', './assets/images/progress-fg.png')
		this.load.image('progress-overlay', './assets/images/progress-overlay.png')
	}

	_makeMemoryTexture () {
		const placeholder = this.make.graphics({x: 0, y: 0, add: false});
		placeholder.fillStyle(0xff00ff);
		placeholder.fillCircle(50, 50, 50);
		placeholder.generateTexture('memory', 100, 100);
	}

	create () {
		this.scene.start('Title')
	}
}