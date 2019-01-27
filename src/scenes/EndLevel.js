import Phaser from 'phaser'
import config from '../config'

export default class extends Phaser.Scene {
	constructor () {
		super({ key: 'EndLevel' })
	}

	init (endData) {
	}

	preload () {
		
	}

	create () {
		const background = new Phaser.GameObjects.Image(this, this.sys.canvas.width / 2, this.sys.canvas.height / 2, 'bg-end')
		this.add.existing(background)

		const finished = new Phaser.GameObjects.Image(this, this.sys.canvas.width / 2, this.sys.canvas.height / 8, 'finished')
		this.add.existing(finished)

		const res = new Phaser.GameObjects.Image(this, this.sys.canvas.width / 2, this.sys.canvas.height / 2, 'e10')
		this.add.existing(res)

		const play = new Phaser.GameObjects.Image(this, this.sys.canvas.width / 2, this.sys.canvas.height - this.sys.canvas.height / 10, 'play')
		this.add.existing(play)
		play.setOrigin(0.5, 0.5)
		play.setInteractive()
		play.on('pointerdown', () => this.scene.start('Title'))
	}
}