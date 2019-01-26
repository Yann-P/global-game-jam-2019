import Phaser from 'phaser'
import config from '../config'
import TextButton from '../widgets/TextButton'


export default class extends Phaser.Scene {
	constructor () {
		super({ key: 'Title' })
	}

	initialize () {
	}

	preload () {
		
	}

	create () {
		const button = new TextButton({
			scene: this,
			text: 'Start',
			style: {
				fontSize: 200,
				color: '#000000'
			},
			x: this.sys.canvas.width / 2,
			y: this.sys.canvas.height / 2,
			width: 900,
			height: 300,
			onDown: () => this.scene.start('Game')
		})
		this.add.existing(button);
	}
}