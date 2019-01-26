import Phaser from "phaser";
import { Memory } from "./Memory";

export class CollectableContainer extends Phaser.GameObjects.Container {

	constructor({ scene, x = 0, y = 0 }) {
		super(scene, x, y)
		this._scene = scene;
	}


	makeMemory({ x, y, fallSpeed, radius }) {
		const memory = new Memory({ scene: this._scene, x, y, fallSpeed, radius });
		this._addChild(memory);
	}

	update() {
		for (const child of this.list) {
			child.update();
		}
	}

	_addChild(c) {
		this.add(c);
	}

}