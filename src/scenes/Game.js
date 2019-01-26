/* globals __DEV__ */
import Phaser from 'phaser'
import lang from '../lang'
import config from '../config'
import TextButton from '../widgets/TextButton'
import store from '../store'

export default class extends Phaser.Scene {
	constructor () {
		super({
			key: 'Game'
		})
	}
	
	initialize () {
	}
	
	preload () {
	}
	
	create () {
		const button = new TextButton({
			scene: this,
			text: 'Click Me!',
			style: {
				fontFamily: 'Bangers',
				fontSize: 100,
				color: '#ff0000'
			},
			x: this.sys.canvas.width / 2,
			y: this.sys.canvas.height / 2,
			width: 500,
			height: 200,
			onDown: () => {
				store.dispatch('ressources/add', 100)
			}
		})
		this.add.existing(button)
		
		const scoreText = new Phaser.GameObjects.Text(this, 0, 0, store.state.ressources.coins, {
			fontSize: 100,
			color: '#0000ff',
			fontFamily: 'Bangers'
		})
		this.add.existing(scoreText)
		
		store.watch(
			(state) => {
				return state.ressources.coins
			},
			(newValue) => {
				scoreText.setText(newValue)
			}
		)
	}
	
	update () {
	}
}