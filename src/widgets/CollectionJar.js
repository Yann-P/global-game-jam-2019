import Phaser from 'phaser'

export default class CollectionJar extends Phaser.GameObjects.Container {
	constructor (options) {
		super(options.scene, 0, 0)
		
		this.collectableContainer = options.collectableContainer
		
		this.memories = new Phaser.GameObjects.Container(this.scene, 0, 0)
		this.add(this.memories)
		
		this.jarContainer = new Phaser.GameObjects.Container(this.scene, 0, 0)
		this.add(this.jarContainer)
		
		this.backgroundImage = new Phaser.GameObjects.Sprite(this.scene, '', 0, 0)
		this.jarContainer.add(this.backgroundImage)
		this.jarBody = new Phaser.GameObjects.Polygon(this.scene, 0, 0, '0 0 0 350 400 350 400 0 350 0 350 300 50 300 50 0', 0x00ffff)
		
		this.scene.matter.add.gameObject(this.jarBody, {
			shape: {
				type: 'fromVerts',
				verts: '0 0 0 350 400 350 400 0 350 0 350 300 50 300 50 0',
				flagInternal: true,
			},
			isStatic: true
		})
		this.add(this.jarBody)
		
		this.collisionSize = {
			width: 400,
			height: 350
		}
		this.collisionShape = new Phaser.Geom.Polygon([])
		
		this.setTargetPosition(this.jarContainer.x)
		this.updateCollisionShape()
	}
	
	_setPosition (x, y) {
		this.jarContainer.setPosition(x, y)
		this.jarBody.setPosition(x, y)
		this.setTargetPosition(x)
		this.updateCollisionShape()
	}
	
	collide (gameObject) {
		return this.collisionShape.contains(gameObject.x, gameObject.y)
	}
	
	setTargetPosition (targetPosition) {
		this.targetPosition = targetPosition
	}
	
	update () {
		const difference = Math.max(Math.min(this.targetPosition - this.jarContainer.x, 30), -30)
		
		const previousPosition = this.jarContainer.x
		this.jarContainer.x = Math.max(Math.min(this.jarContainer.x + difference, this.scene.sys.canvas.width - this.collisionSize.width / 2), this.collisionSize.height / 2)
		this.jarBody.x = this.jarContainer.x
		this.updateCollisionShape()
		
		let markedForRemoval = []
		
		for (let gameObject of this.collectableContainer.list) {
			if (this.collide(gameObject)) {
				this.memories.add(gameObject)
				markedForRemoval.push(gameObject)
			}
		}
		
		for (let gameObject of markedForRemoval) {
			this.collectableContainer.remove(gameObject)
		}
		
		for (let gameObject of this.memories.list) {
			gameObject.update(0, 0, Math.abs(previousPosition - this.jarContainer.x) < 0.1 ? 0 : difference)
		}
	}
	
	updateCollisionShape() {
		if (this.collisionShape) {
			this.collisionShape.setTo([
				new Phaser.Geom.Point(this.jarContainer.x - this.collisionSize.width / 2, this.jarContainer.y - this.collisionSize.height / 2),
				new Phaser.Geom.Point(this.jarContainer.x - this.collisionSize.width / 2, this.jarContainer.y + this.collisionSize.height / 2),
				new Phaser.Geom.Point(this.jarContainer.x + this.collisionSize.width / 2, this.jarContainer.y + this.collisionSize.height / 2),
				new Phaser.Geom.Point(this.jarContainer.x + this.collisionSize.width / 2, this.jarContainer.y - this.collisionSize.height / 2)
			])
		}
	}
	
	_getPosition () {
		return this.jarBody.x
	}
}