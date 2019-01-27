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
	}

	update(t,dt) {
		for (const child of this.list) {
			child.update(t,dt);
		}
	}

	_addChild(c) {
		this.add(c);
	}
	
	_getMinimumY () {
		let minimumY = Number.POSITIVE_INFINITY
		
		for (const child of this.list) {
			minimumY = Math.min(minimumY, child.y)
		}
		
		return minimumY
	}

}