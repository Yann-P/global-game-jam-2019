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
	physicsOffscreenSize: offscreenSize,
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
	backgroundColor: "#ffffff"
};
