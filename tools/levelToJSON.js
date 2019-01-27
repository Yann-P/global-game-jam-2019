const XLSX = require('xlsx')
const xlsxToArray = require('./xlsxToArray')
const fs = require('fs')

const filename = process.argv[2]

const workbook = XLSX.readFile(filename)
const workbookArray = xlsxToArray(workbook)
const rawLevelData = workbookArray[Object.keys(workbookArray)[0]] // select first worksheet, assuming there is exactly one valid one

const levelData = {
	physicsOffscreenSize: 0,
	spawns: []
}

for (let i = 1; i < rawLevelData.length; i++) {
	if (rawLevelData[i]) {
		const spawn = {
			type: rawLevelData[i][2],
			x: parseInt(rawLevelData[i][3].trim(), 10),
			y: parseInt(rawLevelData[i][4].trim(), 10),
			fallSpeed: parseInt(rawLevelData[i][9].trim(), 10),
			radius: parseInt(rawLevelData[i][8].trim(), 10)
		}
		
		levelData.physicsOffscreenSize = Math.max(levelData.physicsOffscreenSize, spawn.y)
		levelData.spawns.push(spawn)
	}
}

for (let spawn of levelData.spawns) {
	spawn.y = -spawn.y
	spawn.fallSpeed /= 35
}

fs.writeFileSync('level.json', JSON.stringify(levelData, null, '\t'))
