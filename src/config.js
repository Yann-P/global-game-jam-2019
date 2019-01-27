import Phaser from "phaser";

import BootScene from "./scenes/Boot";
import SplashScene from "./scenes/Splash";
import GameScene from "./scenes/Game";
import TitleScene from "./scenes/Title";
import PauseOverlay from "./scenes/PauseOverlay";
import EndLevel from "./scenes/EndLevel";


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
	scene: [BootScene, SplashScene, TitleScene, GameScene, PauseOverlay, EndLevel],
	backgroundColor: "#ffffff",
	level1Data: {
		"physicsOffscreenSize": 7537,
		"spawns": [
			{
				"type": "good memories",
				"x": 815,
				"y": -7537,
				"fallSpeed": 8.666666666666666,
				"radius": 50
			},
			{
				"type": "good memories",
				"x": 766,
				"y": -7330,
				"fallSpeed": 8.666666666666666,
				"radius": 45
			},
			{
				"type": "good memories",
				"x": 700,
				"y": -7100,
				"fallSpeed": 8.666666666666666,
				"radius": 50
			},
			{
				"type": "Alzheimer",
				"x": 490,
				"y": -6617,
				"fallSpeed": 8.666666666666666,
				"radius": 43
			},
			{
				"type": "bad memories",
				"x": 185,
				"y": -6254,
				"fallSpeed": 8.666666666666666,
				"radius": 50
			},
			{
				"type": "bad memories",
				"x": 215,
				"y": -6004,
				"fallSpeed": 8.666666666666666,
				"radius": 45
			},
			{
				"type": "bad memories",
				"x": 325,
				"y": -5810,
				"fallSpeed": 8.666666666666666,
				"radius": 50
			},
			{
				"type": "Alzheimer",
				"x": 490,
				"y": -5345,
				"fallSpeed": 8.666666666666666,
				"radius": 43
			},
			{
				"type": "trauma",
				"x": 490,
				"y": -5013,
				"fallSpeed": 8.666666666666666,
				"radius": 50
			},
			{
				"type": "good memories",
				"x": 295,
				"y": -4855,
				"fallSpeed": 8.666666666666666,
				"radius": 45
			},
			{
				"type": "good memories",
				"x": 200,
				"y": -4595,
				"fallSpeed": 8.666666666666666,
				"radius": 50
			},
			{
				"type": "good memories",
				"x": 145,
				"y": -4320,
				"fallSpeed": 8.666666666666666,
				"radius": 23
			},
			{
				"type": "bad memories",
				"x": 670,
				"y": -4855,
				"fallSpeed": 8.666666666666666,
				"radius": 43
			},
			{
				"type": "bad memories",
				"x": 752,
				"y": -4595,
				"fallSpeed": 8.666666666666666,
				"radius": 50
			},
			{
				"type": "bad memories",
				"x": 825,
				"y": -4320,
				"fallSpeed": 8.666666666666666,
				"radius": 45
			},
			{
				"type": "good memories",
				"x": 490,
				"y": -3647,
				"fallSpeed": 8.666666666666666,
				"radius": 23
			},
			{
				"type": "Alzheimer",
				"x": 180,
				"y": -2970,
				"fallSpeed": 8.666666666666666,
				"radius": 50
			},
			{
				"type": "Alzheimer",
				"x": 800,
				"y": -2970,
				"fallSpeed": 8.666666666666666,
				"radius": 50
			},
			{
				"type": "good memories",
				"x": 490,
				"y": -2412,
				"fallSpeed": 8.666666666666666,
				"radius": 43
			},
			{
				"type": "good memories",
				"x": 275,
				"y": -2225,
				"fallSpeed": 8.666666666666666,
				"radius": 50
			},
			{
				"type": "good memories",
				"x": 195,
				"y": -2040,
				"fallSpeed": 8.666666666666666,
				"radius": 45
			},
			{
				"type": "good memories",
				"x": 155,
				"y": -1818,
				"fallSpeed": 8.666666666666666,
				"radius": 47
			},
			{
				"type": "bad memories",
				"x": 720,
				"y": -2225,
				"fallSpeed": 8.666666666666666,
				"radius": 50
			},
			{
				"type": "bad memories",
				"x": 805,
				"y": -2045,
				"fallSpeed": 8.666666666666666,
				"radius": 23
			},
			{
				"type": "bad memories",
				"x": 825,
				"y": -1848,
				"fallSpeed": 8.666666666666666,
				"radius": 43
			},
			{
				"type": "Alzheimer",
				"x": 490,
				"y": -1400,
				"fallSpeed": 8.666666666666666,
				"radius": 50
			},
			{
				"type": "bad memories",
				"x": 250,
				"y": -1054,
				"fallSpeed": 8.666666666666666,
				"radius": 50
			},
			{
				"type": "bad memories",
				"x": 180,
				"y": -865,
				"fallSpeed": 8.666666666666666,
				"radius": 50
			},
			{
				"type": "bad memories",
				"x": 115,
				"y": -650,
				"fallSpeed": 8.666666666666666,
				"radius": 23
			},
			{
				"type": "good memories",
				"x": 700,
				"y": -1054,
				"fallSpeed": 8.666666666666666,
				"radius": 50
			},
			{
				"type": "good memories",
				"x": 800,
				"y": -865,
				"fallSpeed": 8.666666666666666,
				"radius": 23
			},
			{
				"type": "good memories",
				"x": 875,
				"y": -650,
				"fallSpeed": 8.666666666666666,
				"radius": 43
			},
			{
				"type": "Alzheimer",
				"x": 490,
				"y": -75,
				"fallSpeed": 8.666666666666666,
				"radius": 50
			}
		]
	},
	maxDoubleTapDelay: 200
};
