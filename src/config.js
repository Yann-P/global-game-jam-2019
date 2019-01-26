import Phaser from "phaser";

import BootScene from "./scenes/Boot";
import SplashScene from "./scenes/Splash";
import GameScene from "./scenes/Game";
import TitleScene from "./scenes/Title";
import PauseOverlay from "./scenes/PauseOverlay";


const width = 1080
const height = 1920
const spacing = 500
const offscreenSize = 1000

export default {
	type: Phaser.AUTO,
	parent: "content",
	width,
	height,
	physicsSpacing: spacing,
	physics: {
		default: "matter",
		matter: {
			gravity: {
				y: 0
			},
			debug: true,
			setBounds: {
				x: -spacing,
				y: -offscreenSize,
				width: width + 2 * spacing,
				height: height + offscreenSize + spacing
			}
		}
	},
	localStorageName: "phaseres6webpack",
	webfonts: ["Bangers"],
	scene: [BootScene, SplashScene, TitleScene, GameScene, PauseOverlay],
	backgroundColor: "#ffffff",
	level1Data: {
		"physicsOffscreenSize": 5655,
		"spawns": [
			{
				"type": "g",
				"x": 125,
				"y": -5655,
				"fallSpeed": 6.5,
				"radius": 50
			},
			{
				"type": "b",
				"x": 890,
				"y": -5535,
				"fallSpeed": 6.5,
				"radius": 45
			},
			{
				"type": "a",
				"x": 480,
				"y": -5335,
				"fallSpeed": 6.5,
				"radius": 50
			},
			{
				"type": "g",
				"x": 890,
				"y": -5058,
				"fallSpeed": 6.5,
				"radius": 23
			},
			{
				"type": "b",
				"x": 105,
				"y": -4863,
				"fallSpeed": 6.5,
				"radius": 43
			},
			{
				"type": "a",
				"x": 261,
				"y": -4550,
				"fallSpeed": 6.5,
				"radius": 50
			},
			{
				"type": "g",
				"x": 115,
				"y": -4282,
				"fallSpeed": 6.5,
				"radius": 45
			},
			{
				"type": "b",
				"x": 670,
				"y": -4137,
				"fallSpeed": 6.5,
				"radius": 50
			},
			{
				"type": "a",
				"x": 490,
				"y": -3956,
				"fallSpeed": 6.5,
				"radius": 23
			},
			{
				"type": "g",
				"x": 481,
				"y": -3704,
				"fallSpeed": 6.5,
				"radius": 43
			},
			{
				"type": "b",
				"x": 850,
				"y": -3585,
				"fallSpeed": 6.5,
				"radius": 50
			},
			{
				"type": "g",
				"x": 100,
				"y": -3330,
				"fallSpeed": 6.5,
				"radius": 45
			},
			{
				"type": "t",
				"x": 760,
				"y": -3125,
				"fallSpeed": 6.5,
				"radius": 50
			},
			{
				"type": "b",
				"x": 311,
				"y": -2985,
				"fallSpeed": 6.5,
				"radius": 23
			},
			{
				"type": "l",
				"x": 540,
				"y": -2693,
				"fallSpeed": 6.5,
				"radius": 43
			},
			{
				"type": "g",
				"x": 475,
				"y": -2455,
				"fallSpeed": 6.5,
				"radius": 50
			},
			{
				"type": "a",
				"x": 140,
				"y": -2281,
				"fallSpeed": 6.5,
				"radius": 45
			},
			{
				"type": "g",
				"x": 388,
				"y": -2205,
				"fallSpeed": 6.5,
				"radius": 50
			},
			{
				"type": "b",
				"x": 225,
				"y": -2040,
				"fallSpeed": 6.5,
				"radius": 23
			},
			{
				"type": "b",
				"x": 666,
				"y": -1848,
				"fallSpeed": 6.5,
				"radius": 43
			},
			{
				"type": "a",
				"x": 230,
				"y": -1778,
				"fallSpeed": 6.5,
				"radius": 50
			},
			{
				"type": "g",
				"x": 338,
				"y": -1575,
				"fallSpeed": 6.5,
				"radius": 45
			},
			{
				"type": "g",
				"x": 750,
				"y": -1575,
				"fallSpeed": 6.5,
				"radius": 50
			},
			{
				"type": "a",
				"x": 905,
				"y": -1260,
				"fallSpeed": 6.5,
				"radius": 23
			},
			{
				"type": "a",
				"x": 270,
				"y": -1080,
				"fallSpeed": 6.5,
				"radius": 43
			},
			{
				"type": "a",
				"x": 830,
				"y": -810,
				"fallSpeed": 6.5,
				"radius": 50
			},
			{
				"type": "b",
				"x": 221,
				"y": -789,
				"fallSpeed": 6.5,
				"radius": 45
			},
			{
				"type": "g",
				"x": 540,
				"y": -593,
				"fallSpeed": 6.5,
				"radius": 50
			},
			{
				"type": "g",
				"x": 370,
				"y": -355,
				"fallSpeed": 6.5,
				"radius": 23
			},
			{
				"type": "b",
				"x": 840,
				"y": -190,
				"fallSpeed": 6.5,
				"radius": 43
			},
			{
				"type": "a",
				"x": 180,
				"y": -30,
				"fallSpeed": 6.5,
				"radius": 50
			},
			{
				"type": "g",
				"x": 470,
				"y": 20,
				"fallSpeed": 6.5,
				"radius": 45
			},
			{
				"type": "b",
				"x": 900,
				"y": 195,
				"fallSpeed": 6.5,
				"radius": 50
			},
			{
				"type": "b",
				"x": 135,
				"y": 285,
				"fallSpeed": 6.5,
				"radius": 23
			},
			{
				"type": "g",
				"x": 530,
				"y": 420,
				"fallSpeed": 6.5,
				"radius": 43
			},
			{
				"type": "a",
				"x": 681,
				"y": 565,
				"fallSpeed": 6.5,
				"radius": 50
			}
		]
	},
	maxDoubleTapDelay: 200
};
