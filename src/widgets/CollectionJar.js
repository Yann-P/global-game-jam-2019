import Phaser from 'phaser'

const JAR_GEOMETRY = '0 0 0 450 400 450 400 0 350 0 350 380 50 380 50 0';

export default class CollectionJar extends Phaser.GameObjects.Container {
	constructor (options) {
		super(options.scene, 0, 0)
		
		this.collectableContainer = options.collectableContainer
		
		this.memories = new Phaser.GameObjects.Container(this.scene, 0, 0)
		this.add(this.memories)
		
		this.jarContainer = new Phaser.GameObjects.Container(this.scene, 0, 0)
		this.add(this.jarContainer)

		
		this.backgroundImage = new Phaser.GameObjects.Image(this.scene, 0, -30, 'jar')
		this.jarContainer.add(this.backgroundImage)

		this.backgroundImageOverlay = new Phaser.GameObjects.Image(this.scene, 0, -30, 'jar-overlay')
		this.jarContainer.add(this.backgroundImageOverlay)


		this.jarBody = new Phaser.GameObjects.Polygon(this.scene, 0, 0, JAR_GEOMETRY);
		
		this.scene.matter.add.gameObject(this.jarBody, {
			shape: {
				type: 'fromVerts',
				verts: JAR_GEOMETRY,
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
	
	update (t, dt) {
		const difference = Math.max(Math.min(this.targetPosition - this.jarContainer.x, 30), -30)
		
		const previousPosition = this.jarContainer.x
		this.jarContainer.x = Math.max(Math.min(this.jarContainer.x + difference, this.scene.sys.canvas.width - this.collisionSize.width / 2), this.collisionSize.height / 2)
		this.jarBody.x = this.jarContainer.x
		this.updateCollisionShape()
		
		let markedForRemoval = []
		
		for (let collectable of this.collectableContainer.list) {
			if (this.collide(collectable)) {
				collectable.enteredTheJar();
				this.memories.add(collectable)
				this.backgroundImage.depth++;
				markedForRemoval.push(collectable)
			}
		}
		
		for (let gameObject of markedForRemoval) {
			this.collectableContainer.remove(gameObject)
		}
		
		for (let gameObject of this.memories.list) {
			gameObject.update(t, dt, Math.abs(previousPosition - this.jarContainer.x) < 0.1 ? 0 : difference)
		}

		this.backgroundImageOverlay.alpha = Math.sin((t / 1000) / 2 + .5) / 2;
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