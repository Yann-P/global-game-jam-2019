import Phaser from 'phaser'

export default class CollectionJar extends Phaser.GameObjects.Container {
	constructor (options) {
		super(options.scene, 0, 0)
		
		this.collectableContainer = options.collectableContainer
		
		this.backgroundImage = new Phaser.GameObjects.Sprite(this.scene, '', 0, 0)
		this.add(this.backgroundImage)
		
		this.memories = new Phaser.GameObjects.Container(this.scene, 0, 0)
		this.add(this.memories)
		
		this.collisionSize = 100
		this.collisionShape = new Phaser.Geom.Line(0, 0, 0, 0)
		
		this.setTargetPosition(this.x)
		this.updateCollisionShape()
	}
	
	updatePosition (x, y) {
		this.setTargetPosition(this.x)
		this.updateCollisionShape()
	}
	
	collide (gameObject) {
		return Phaser.Geom.Intersects.LineToCircle(this.collisionShape, gameObject.collision)
	}
	
	setTargetPosition (targetPosition) {
		this.targetPosition = targetPosition
	}
	
	update () {
		const difference = Math.max(Math.min(this.targetPosition - this.x, 30), -30)
		
		this.x = Math.max(Math.min(this.x + difference, this.scene.sys.canvas.width - this.collisionSize / 2), this.collisionSize / 2)
		this.updateCollisionShape()
		
		let markedForRemoval = []
		
		for (let gameObject of this.collectableContainer.list) {
			if (this.collide(gameObject)) {
				this.memories.add(gameObject)
				markedForRemoval.push(gameObject)
				gameObject.setPosition(0, 0)
			}
		}
		
		for (let gameObject of markedForRemoval) {
			this.collectableContainer.remove(gameObject)
		}
	}
	
	updateCollisionShape() {
		if (this.collisionShape) {
			this.collisionShape.setTo(this.x - this.collisionSize / 2, this.y - this.collisionSize / 2, this.x + this.collisionSize / 2, this.y - this.collisionSize / 2)
		}
	}
}