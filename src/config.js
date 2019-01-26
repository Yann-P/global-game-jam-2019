import Phaser from "phaser";

import BootScene from "./scenes/Boot";
import SplashScene from "./scenes/Splash";
import GameScene from "./scenes/Game";
import TitleScene from "./scenes/Title";
import PauseOverlay from "./scenes/PauseOverlay";


export default {
	type: Phaser.AUTO,
	parent: "content",
	width: 1080,
	height: 1920,
	physics: {
		default: "matter",
		matter: {
			gravity: {
				y: 0
			},
			debug: true
		}
	},
	localStorageName: "phaseres6webpack",
	webfonts: ["Bangers"],
	scene: [BootScene, SplashScene, TitleScene, GameScene, PauseOverlay],
	backgroundColor: "#ffffff"
};
