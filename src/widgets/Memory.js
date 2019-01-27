import { Collectable } from "./Collectable";
import Phaser from "phaser";


export class Memory extends Collectable {
  constructor({ scene, x, y, fallSpeed, radius, key, rotate, glowTint = 0xffffff }) {
		super({ 
			scene, 
			x, 
			y, 
			fallSpeed, 
			radius, 
			key,
			rotate,
			glowTint
		});
		this._glowTint = glowTint;
		this._type = key
	}
	
	_addGlow(scene, radius) {
		console.log('addglow called')
		const glow = new Phaser.GameObjects.Image(scene, 0, 0, 'glow');
		glow.setScale(this.width / glow.width, this.height/ glow.height)
		glow.alpha = .3
		glow.setOrigin(.5,.5)
		glow.tint = this._glowTint
		return glow;
	}
}

export class GoodMemory extends Memory {
	constructor({ scene, x, y, fallSpeed, radius }) {
		super(Object.assign(arguments[0], { key: 'mem-good', rotate: true }));
	}
}

export class Trauma extends Memory {
	constructor({ scene, x, y, fallSpeed, radius }) {
		super(Object.assign(arguments[0], { key: 'mem-trauma', rotate: true, glowTint: 0xaa0000 }));
	}
}

export class BadMemory extends Memory {
	constructor({ scene, x, y, fallSpeed, radius }) {
		super(Object.assign(arguments[0], { key: 'mem-bad', rotate: true, glowTint: 0xaa00aa }));
	}
}

export class Alzheimer extends Memory {
	constructor({ scene, x, y, fallSpeed, radius }) {
		super(Object.assign(arguments[0], { key: 'alzheimer', rotate: false, glowTint: 0xaa0000 }));
	}
}