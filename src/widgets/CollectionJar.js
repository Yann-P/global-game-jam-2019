import Phaser from 'phaser'
import { Alzheimer } from './Memory';

const JAR_GEOMETRY = '0 0 0 450 380 450 380 0 350 0 350 320 70 320 70 0';
const JAR_OFFSET = -30

export default class CollectionJar extends Phaser.GameObjects.Container {
	constructor (options) {
		super(options.scene, 0, 0)
		
		this.collectableContainer = options.collectableContainer
		
		this.memories = new Phaser.GameObjects.Container(this.scene, 0, 0)
		this.add(this.memories)
		
		this.jarContainer = new Phaser.GameObjects.Container(this.scene, 0, 0)
		this.add(this.jarContainer)


		this._addBackgroundImage();
		this._addGraphicalOverlay();


		this.jarBody = new Phaser.GameObjects.Polygon(this.scene, 0, 0, JAR_GEOMETRY); //, 0x00ffff)
		
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
			height: 450
		}
		this.collisionShape = new Phaser.Geom.Polygon([])
		this._overlayIsBeingAnimated = false;
		
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
	}
	
	updateCollisionShape() {
		if (this.collisionShape) {
			this.collisionShape.setTo([
				new Phaser.Geom.Point(this.jarContainer.x - this.collisionSize.width / 2, this.jarContainer.y - this.collisionSize.height / 2 + JAR_OFFSET),
				new Phaser.Geom.Point(this.jarContainer.x - this.collisionSize.width / 2, this.jarContainer.y + this.collisionSize.height / 2 + JAR_OFFSET),
				new Phaser.Geom.Point(this.jarContainer.x + this.collisionSize.width / 2, this.jarContainer.y + this.collisionSize.height / 2 + JAR_OFFSET),
				new Phaser.Geom.Point(this.jarContainer.x + this.collisionSize.width / 2, this.jarContainer.y - this.collisionSize.height / 2 + JAR_OFFSET)
			])
		}
	}

	selectRandomNonAlzheimerCollectableInJar() {
		let collectable = null;
		let attempt = 0;
		if(!this.memories.length) return null;
		while(collectable == null || !(collectable.body) || collectable._busy || collectable instanceof Alzheimer) {
			collectable = this.memories.getRandom();
			if(attempt++ > 50) return null;
		}
		return collectable;
	}

	deleteCollectableInJar(c) {
		this.memories.remove(c)
	}
	
	_getPosition () {
		return this.jarBody.x
	}

	_handsGlow() {

		if(this._overlayIsBeingAnimated) return;
		this._overlayIsBeingAnimated = true;
		const tween = this.scene.tweens.add({
			targets: [this.backgroundImageOverlay],
			alpha:.5,
			ease: 'Quad.easeOut',
			duration: 200,
			repeat: 0,
			yoyo: true,
			onComplete: () => { tween.stop();  this._overlayIsBeingAnimated = false; },
		});
	}

	_addGraphicalOverlay() {
		this.backgroundImageOverlay = new Phaser.GameObjects.Image(this.scene, 0, JAR_OFFSET, 'jar-overlay')
		this.backgroundImageOverlay.alpha = 0;
		this.jarContainer.add(this.backgroundImageOverlay)
	}

	_addBackgroundImage() {
		this.backgroundImage = new Phaser.GameObjects.Image(this.scene, 0, JAR_OFFSET, 'jar')
		this.jarContainer.add(this.backgroundImage)
	}
}
