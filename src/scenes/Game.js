/* globals __DEV__ */
import Phaser from 'phaser'
import Mushroom from '../sprites/Mushroom'
import lang from '../lang'
import config from '../config'

export default class extends Phaser.Scene {
	constructor () {
		super({ key: 'Game' })
	}

	initialize () {
	}

	preload () {
	}

	create () {
		const bannerText = lang.text('welcome')
		let banner = this.add.text(config.width / 2, config.height / 2 - 80, bannerText, {
			font: '40px Bangers',
			fill: '#77BFA3',
			smoothed: false
		})

		banner.setPadding(10, 16, 10, 16)
		banner.setOrigin(0.5, 0.5)

		this.mushroom = new Mushroom({
			scene: this,
			x: config.width / 2,
			y: config.height / 2,
			asset: 'mushroom'
		})

		this.add.existing(this.mushroom)
	}

	update () {
		this.mushroom.update()
	}
}
