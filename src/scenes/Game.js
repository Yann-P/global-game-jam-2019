/* globals __DEV__ */
import Phaser from 'phaser'
import CollectionJar from '../widgets/CollectionJar'
import store from '../store'
import config from '../config'
import { CollectableContainer } from '../widgets/CollectableContainer';
import PauseButton from '../widgets/PauseButton';
import ScrollingBackground from '../widgets/ScrollingBackground';
import LevelProgressBar from '../widgets/LevelProgressBar';
import LevelNumberBadge from '../widgets/LevelNumberBadge';
import Projectile from '../widgets/Projectile'

const HUD_Y = 150;

export default class extends Phaser.Scene {
	constructor () {
		super({
			key: 'Game'
		})
		this._paused = false;
		this.lastTap = null
		this.lastPointer = null
		this.projectiles = []
	}
	
	init (data) {
		this.levelData = data
	}
	
	preload () {
	}
	

	create ({ scrollSpeed = .1, levelHeight = 10000 }) {
		this.matter.world.setBounds(-config.physicsSpacing, -this.levelData.physicsOffscreenSize - config.physicsSpacing, config.width + 2 * config.physicsSpacing, config.height + this.levelData.physicsOffscreenSize + config.physicsSpacing * 2)

		this._addScrollingBackground(scrollSpeed);
		this._addProgressBar(levelHeight);
		this._addLevelNumberBadge(1);
		this._addPauseButton();
		this._setupLevel()
		this._addJar()
	}
	
	onPointerEvent (pointer) {
		this.collectionJar.setTargetPosition(pointer.x)
	}
	
	update (t,dt) {
		this._background.update(t,dt);
		this._progressBar.update(t,dt);
		this.collectableContainer.update(t,dt);
		this.collectionJar.update(t,dt)
		for (let projectile of this.projectiles) {
			projectile.update(t, dt)
		}
	}

	_addLevelNumberBadge(levelNumber) {
		const badge = new LevelNumberBadge({ scene: this, x: 150, y: HUD_Y, levelNumber /* TODO */})
	  this.add.existing(badge);
	}

	_addPauseButton() {
		const pauseButton = new PauseButton({ scene: this, x: config.width - 150, y: HUD_Y})
	  this.add.existing(pauseButton);
		pauseButton.on('pointerup', this._pause.bind(this));
	}

	_pause() {
		this.scene.pause();
		this.scene.launch('PauseOverlay');
	}

	_addScrollingBackground(scrollSpeed) {
		this._background = new ScrollingBackground(this, scrollSpeed);
		this.add.existing(this._background);
	}

	_addProgressBar(totalLevelHeight) {
		this._progressBar = new LevelProgressBar(this, 100, HUD_Y, totalLevelHeight);
		this.add.existing(this._progressBar);
	}


	_setupLevel () {
		this.collectableContainer = new CollectableContainer({ scene: this });
		this.add.existing(this.collectableContainer);
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
		this.input.on('pointerdown', this.onDoubleTap.bind(this))
	}
	
	onDoubleTap (pointer) {
		if (this.lastTap === null || this.lastPointer !== pointer) {
			this.lastTap = Date.now()
		} else {
			if (Date.now() - this.lastTap < config.maxDoubleTapDelay) {
				const projectile = new Projectile({
					scene: this,
					x: this.collectionJar._getPosition(),
					y: this.sys.canvas.height - 400
				})
				this.add.existing(projectile)
				this.projectiles.push(projectile)
				this.lastTap = null
			} else {
				this.lastTap = Date.now()
			}
		}
		
		this.lastPointer = pointer
	}
}