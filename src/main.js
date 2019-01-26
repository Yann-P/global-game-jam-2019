import Phaser from 'phaser'
import bowser from 'bowser'

import config from './config'

class Game extends Phaser.Game {
	constructor () {
		super(config)
		
		this.previousWidth = 0
		this.previousHeight = 0
		this.contentDiv = document.getElementById('content')
		
		this.events.on('boot', this.resize.bind(this))
		window.addEventListener('resize', this.resize.bind(this))
		
		// with Cordova with need to wait that the device is ready so we will call the Boot state in another file
		if (!window.cordova) {
			this.scene.start('Boot')
		}
	}
	
	resize () {
		const viewportWidth = bowser.chrome && bowser.mobile ? document.documentElement.clientWidth : window.innerWidth
		const viewportHeight = bowser.chrome && bowser.mobile ? document.documentElement.clientHeight : window.innerHeight
		
		let width = viewportWidth
		let height = viewportHeight
		
		if (width !== this.previousWidth || height !== this.previousHeight) {
			this.previousWidth = width
			this.previousHeight = height
			
			const aspectRatio = config.width / config.height
			const expectedHeight = viewportWidth / aspectRatio
			
			if (expectedHeight > viewportHeight) {
				width = viewportHeight * aspectRatio
			} else {
				height = expectedHeight
			}
			
			this.contentDiv.style.height = viewportHeight + 'px'
			this.canvas.style.width = Math.floor(width) + 'px'
			this.canvas.style.height = Math.floor(height) + 'px'
			this.canvas.style.margin = ((viewportHeight - Math.floor(height)) / 2) + 'px ' + ((viewportWidth - Math.floor(width)) / 2) + 'px'
			
			window.scrollTo(0, 1)
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
			
			if (StatusBar) {
				StatusBar.hide()
			}
			
			if (MobileAccessibility) {
				MobileAccessibility.usePreferredTextZoom(false)
			}
			
			if(window.screen.orientation && window.screen.orientation.lock) {
				window.screen.orientation.lock('portrait')
			}
			
			// When the device is ready, start Phaser Boot state.
			window.game.scene.start('Boot')
		},

		receivedEvent: function (id) {
			console.log('Received Event: ' + id)
		}
	}

	app.initialize()
}