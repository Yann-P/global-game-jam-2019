import Phaser from 'phaser'

const PROGRESSBAR_WIDTH = 794; 

export default class extends Phaser.GameObjects.Container {
	constructor (scene, x, y, maxLevelHeight) {
		super(scene, x, y);
		this._maxLevelHeight = maxLevelHeight;

		this._bg = scene.add.sprite(0, 0, 'progress-bg');
		this._fg = scene.add.tileSprite(0, 0, PROGRESSBAR_WIDTH, 123, 'progress-overlay');
		this._bg.setOrigin(0, 0.5)
		this._fg.setOrigin(0, 0.5)


		this.add(this._bg);
		this.add(this._fg);

	}

	// v between 0 and 1
	_setProgress(v) {
		const w = PROGRESSBAR_WIDTH * v;
		this._fg.tilePositionX = w;
		this._fg.width = PROGRESSBAR_WIDTH- w;
	}


	update(t, dt) {
		this._setProgress(Math.sin(t / 1000) / 2 + .5)
	}
}