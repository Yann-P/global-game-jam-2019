import Phaser from 'phaser'
import config from '../config'
import store from '../store'


export default class extends Phaser.Scene {
	constructor () {
		super({ key: 'EndLevel' })
	}

	init () {

	}

	preload () {
		
	}

	create () {

		const ratio = store.state.player.goodMemories / (store.state.player.goodMemories + store.state.player.badMemories);
		const key = (Math.round(ratio * 10)) * 10
		console.log(key)

		const background = new Phaser.GameObjects.Image(this, this.sys.canvas.width / 2, this.sys.canvas.height / 2, 'bg-end')
		this.add.existing(background)

		const finished = new Phaser.GameObjects.Image(this, this.sys.canvas.width / 2, this.sys.canvas.height / 8, 'finished')
		this.add.existing(finished)

		const res = new Phaser.GameObjects.Image(this, this.sys.canvas.width / 2, this.sys.canvas.height / 2, 'e'+key)
		this.add.existing(res)

		const play = new Phaser.GameObjects.Image(this, this.sys.canvas.width / 2, this.sys.canvas.height - this.sys.canvas.height / 10, 'play')
		this.add.existing(play)
		play.setOrigin(0.5, 0.5)
		play.setInteractive()
		play.on('pointerdown', () => this.scene.start('Game', config.level1Data))
	}
}