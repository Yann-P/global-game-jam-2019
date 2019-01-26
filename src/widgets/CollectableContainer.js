import Phaser from "phaser";
import { Memory } from "./Memory";

export class CollectableContainer extends Phaser.GameObjects.Container {

	constructor({ scene, x = 0, y = 0 }) {
		super(scene, x, y)
		this._scene = scene;
	}


	makeMemory({ x, y }) {
		const memory = new Memory({ scene: this._scene, x, y });
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

}