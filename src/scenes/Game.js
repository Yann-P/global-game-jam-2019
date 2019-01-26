/* globals __DEV__ */
import Phaser from 'phaser'
import CollectionJar from '../widgets/CollectionJar'
import store from '../store'
import config from '../config'
import { CollectableContainer } from '../widgets/CollectableContainer';
import PauseButton from '../widgets/PauseButton';
import ScrollingBackground from '../widgets/ScrollingBackground';

export default class extends Phaser.Scene {
	constructor () {
		super({
			key: 'Game'
		})
		this._paused = false;
	}
	
	init (data) {
		this.levelData = data
	}
	
	preload () {
	}
	
	create ({ scrollSpeed = 10 }) {
		this.matter.world.setBounds(-config.physicsSpacing, -this.levelData.physicsOffscreenSize - config.physicsSpacing, config.width + 2 * config.physicsSpacing, config.height + this.levelData.physicsOffscreenSize + config.physicsSpacing * 2)

		//this._addLevelNumberBadge(); // TODO IMPLEMENT
		this._addScrollingBackground(scrollSpeed);
		this._addPauseButton();
		//this._addProgressBar();  // TODO IMPLEMENT
		this._setupLevel()
		this._addJar()
	}
	
	onPointerEvent (pointer) {
		this.collectionJar.setTargetPosition(pointer.x)
	}
	
	update (t,dt) {
		this._background.update(t,dt);
		this.collectableContainer.update(t,dt);
		this.collectionJar.update(t,dt)
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
	
	_setupLevel () {
		this.collectableContainer = new CollectableContainer({ scene: this });
		this.add.existing(this.collectableContainer);

<<<<<<< HEAD
	_addScrollingBackground(scrollSpeed) {
		this._background = new ScrollingBackground(this, scrollSpeed);
		this.add.existing(this._background);
	}

=======
		for (let spawn of this.levelData.spawns) {
			this.collectableContainer.makeMemory(spawn);
		}
	}

	_addJar () {
		this.collectionJar = new CollectionJar({
			scene: this,
			collectableContainer: this.collectableContainer
		})
		this.collectionJar._setPosition(this.sys.canvas.width / 2, this.sys.canvas.height - 150)
		
		this.add.existing(this.collectionJar)
		
		this.input.on('pointermove', this.onPointerEvent.bind(this))
		this.input.on('pointerdown', this.onPointerEvent.bind(this))
	}
>>>>>>> feat/c4-spawning
}