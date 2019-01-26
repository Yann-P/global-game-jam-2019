import Phaser from 'phaser'

export default class TextButton extends Phaser.GameObjects.Container {
	constructor (options) {
		super(options.scene, options.x, options.y)
		
		this.buttonText = new Phaser.GameObjects.Text(options.scene, 0, 0, options.text, options.style)
		this.buttonText.setOrigin(0.5, 0.5)
		this.add(this.buttonText)
		
		const clickAreaWidth = options.width !== undefined ? options.width : this.buttonText.width
		const clickAreaHeight = options.height !== undefined ? options.height : this.buttonText.height
		
		this.clickArea = new Phaser.GameObjects.Zone(options.scene, 0, 0, clickAreaWidth, clickAreaHeight)
		this.clickArea.setOrigin(0.5, 0.5)
		this.clickArea.setInteractive()
		this.clickArea.on('pointerup', () => {
			if (typeof options.onDown === 'function') {
				options.onDown()
			}
		})
		this.add(this.clickArea)
	}
}
