/* globals __DEV__ */
import Phaser from 'phaser'
import CollectionJar from '../widgets/CollectionJar'
import store from '../store'
import config from '../config'
import { CollectableContainer } from '../widgets/CollectableContainer';
import PauseButton from '../widgets/PauseButton';

export default class extends Phaser.Scene {
	constructor () {
		super({
			key: 'Game'
		})
		this._paused = false;
	}
	
	initialize () {
	}
	
	preload () {
	}
	
	create () {

		//this._addLevelNumberBadge(); // TODO IMPLEMENT
		this._addPauseButton();
		//this._addProgressBar();  // TODO IMPLEMENT

		this.matter.world.setBounds();
		

		this.collectableContainer = new CollectableContainer({ scene: this });
		this.add.existing(this.collectableContainer);

		for (let i = 0 ; i < 100; i++) {
			this.collectableContainer.makeMemory({x: Math.random() * 100, y: Math.random() * 100});
		}
		
		const scoreText = new Phaser.GameObjects.Text(this, 0, 0, store.state.ressources.coins, {
			fontSize: 100,
			color: '#0000ff',
			fontFamily: 'Bangers'
		})
		this.add.existing(scoreText)
		
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

	_addPauseButton() {
		const pauseButton = new PauseButton({ scene: this, x: config.width - 50, y: 50})
	  this.add.existing(pauseButton);
		pauseButton.on('pointerup', this._pause.bind(this));
	}

	_pause() {
		this.scene.pause();
		this.scene.launch('PauseOverlay');
	}

}