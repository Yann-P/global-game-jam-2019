/* globals __DEV__ */
import Phaser from 'phaser'
import lang from '../lang'
import config from '../config'
import TextButton from '../widgets/TextButton'
import CollectionJar from '../widgets/CollectionJar'
import store from '../store'
import { CollectableContainer } from '../widgets/CollectableContainer';
import { Memory } from '../widgets/Collectable';

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

		this.collectableContainer = new CollectableContainer({ scene: this });
		this.add.existing(this.collectableContainer);
		this.collectableContainer.makeMemory({x: 100, y: 100});

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
		
		this.collectionJar = new CollectionJar({
			scene: this,
			collectableContainer: this.collectableContainer
		})
		this.collectionJar.setPosition(this.sys.canvas.width / 2, this.sys.canvas.height - 100)
		this.collectionJar.updatePosition()
		
		this.add.existing(this.collectionJar)
		
		this.input.on('pointermove', this.onPointerEvent.bind(this))
		this.input.on('pointerdown', this.onPointerEvent.bind(this))
	}
	
	onPointerEvent (pointer) {
		this.collectionJar.setTargetPosition(pointer.x)
	}
	
	update () {
		this.collectableContainer.update();
		this.collectionJar.update()
	}
}