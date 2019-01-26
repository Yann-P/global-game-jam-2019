import Phaser from 'phaser'
import config from '../config'

export default class extends Phaser.Scene {
	constructor () {
		super({ key: 'PauseOverlay' })
	}

	initialize () {
	}

	preload () {

	}

	create () {
		const w = config.width, h = config.height;

		const overlay = this.add.graphics();
		overlay.width = w, overlay.height = h;
		overlay.fillStyle(0x000000, 0.3);
		overlay.fillRect(0, 0, w, h);

		overlay.fillStyle(0xffffff, 1);
		overlay.fillRect(2*w/7, h/3, w/7, h/3);
		overlay.fillRect(4*w/7, h/3, w/7, h/3);


		overlay.setInteractive();
		overlay.on('pointerup', () => {
			this.scene.stop();
			this.scene.resume('Game');
		});
	}
}