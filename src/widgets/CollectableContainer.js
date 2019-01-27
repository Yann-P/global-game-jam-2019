import Phaser from "phaser";
import { GoodMemory, BadMemory, Trauma, Alzheimer } from "./Memory";

export class CollectableContainer extends Phaser.GameObjects.Container {

	constructor({ scene, x = 0, y = 0 }) {
		super(scene, x, y)
		this._scene = scene;
	}


	makeMemory({ x, y, fallSpeed, radius, type = 'g'}) {
		console.log(type)

		type = type[0].toLowerCase();
		if(['a', 'g', 'b', 't'].indexOf(type)===-1) type = 'a';

		const memory = new ({
			g: GoodMemory,
			b: BadMemory,
			a: Alzheimer,
			t: Trauma
		})[type]({ scene: this._scene, x, y, fallSpeed, radius });
		this._addChild(memory);
		return memory;
	}

	update(t,dt) {
		for (const child of this.list) {
			child.update(t,dt);
		}
	}

	_addChild(c) {
		this.parentContainer.addAt(c._glow, 0)
		this.add(c);
	}
	
	_getMinimumY () {
		let minimumY = Number.POSITIVE_INFINITY
		
		for (const child of this.list) {
			minimumY = Math.min(minimumY, child.y)
		}
		
		return minimumY
	}
	
	_destroyAlzheimers (x, y) {
		const markedForRemoval = []
		const tapCircle = new Phaser.Geom.Circle(x, y, 75)
		
		for (let child of this.list) {
			if (child._type === 'alzheimer' && Phaser.Geom.Intersects.CircleToCircle(child.collisionShape, tapCircle)) {
				markedForRemoval.push(child)
			}
		}
		
		for (let child of markedForRemoval) {
			this.remove(child, true)
		}
	}

}