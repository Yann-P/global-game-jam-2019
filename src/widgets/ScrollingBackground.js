import Phaser from 'phaser'

export default class extends Phaser.GameObjects.TileSprite {
	constructor (scene, scrollSpeed) {
		super(scene, 0, 0, scene.width, scene.height, 'background')
		this.setOrigin(0, 0)
		this._scrollSpeed = scrollSpeed
	}


	update(t, dt) {
		this.tilePositionY -= this._scrollSpeed * dt;
	}
}