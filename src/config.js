import Phaser from 'phaser'

import BootScene from './scenes/Boot'
import SplashScene from './scenes/Splash'
import GameScene from './scenes/Game'

export default {
	type: Phaser.AUTO,
	parent: 'content',
	width: 1080,
	height: 1920,
	localStorageName: 'phaseres6webpack',
	webfonts: ['Bangers'],
	scene: [ BootScene, SplashScene, GameScene ],
	backgroundColor: '#ffffff'
}
