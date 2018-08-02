import Phaser from 'phaser'

import config from './config'

class Game extends Phaser.Game {
	constructor () {
		super(config)

		// with Cordova with need to wait that the device is ready so we will call the Boot state in another file
		if (!window.cordova) {
			this.scene.start('Boot')
		}
	}
}

window.game = new Game()

if (window.cordova) {
	var app = {
		initialize: function () {
			document.addEventListener(
				'deviceready',
				this.onDeviceReady.bind(this),
				false
			)
		},

		// deviceready Event Handler
		//
		onDeviceReady: function () {
			this.receivedEvent('deviceready')

			// When the device is ready, start Phaser Boot state.
			window.game.scene.start('Boot')
		},

		receivedEvent: function (id) {
			console.log('Received Event: ' + id)
		}
	}

	app.initialize()
}
