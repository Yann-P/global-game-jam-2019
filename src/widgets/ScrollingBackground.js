import Phaser from 'phaser'

export default class extends Phaser.GameObjects.Container {
	constructor (scene, scrollSpeed) {
		super(scene, 0, 0)
		
		this.part1 = new Phaser.GameObjects.Sprite(this.scene, 0, -4000 + 1920, 'background1')
		this.part1.setOrigin(0, 0)
		this.add(this.part1)
		this.part2 = new Phaser.GameObjects.Sprite(this.scene, 0, -8000 + 1920, 'background2')
		this.part2.setOrigin(0, 0)
		this.add(this.part2)
		this.part3 = new Phaser.GameObjects.Sprite(this.scene, 0, -10000 + 1920, 'background3')
		this.part3.setOrigin(0, 0)
		this.add(this.part3)
		
		this._scrollSpeed = scrollSpeed
	}


	update(t, dt) {
		this.part1.y += this._scrollSpeed * dt;
		this.part2.y += this._scrollSpeed * dt;
		this.part3.y += this._scrollSpeed * dt;
		
		if (this.part1.y > 2000) {
			this.part1.y -= 10000
		}
		
		if (this.part2.y > 2000) {
			this.part2.y -= 10000
		}
		
		if (this.part3.y > 2000) {
			this.part3.y -= 10000
		}
	}
}