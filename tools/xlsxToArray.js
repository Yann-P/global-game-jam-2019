const charCodeA = 'A'.charCodeAt()

function parseColumn (column) {
	let result = 0
	
	for (let position = column.length - 1; position >= 0; position--) {
		result += (column.charCodeAt(position) - charCodeA + 1) * Math.pow(26, position)
	}
	
	return result
}

function addData (dataArray, row, column, value) {
	if (dataArray[row] === undefined) {
		dataArray[row] = []
	}
	
	dataArray[row][column] = value
}

function fillCell (sheet, cell, dataArray) {
	const column = parseColumn(cell.match(/[A-Z]+/)[0]) - 1
	const row = parseInt(cell.match(/\d+/)[0], 10) - 1
	
	const merge = sheet['!merges'] !== undefined ? sheet['!merges'].find((merge) => merge.s.c === column && merge.s.r === row) : undefined
	
	if (merge) {
		for (let fillRow = merge.s.r; fillRow <= merge.e.r; fillRow++) {
			for (let fillColumn = merge.s.c; fillColumn <= merge.e.c; fillColumn++) {
				addData(dataArray, fillRow, fillColumn, sheet[cell].w)
			}
		}
	} else {
		addData(dataArray, row, column, sheet[cell].w)
	}
}

function processSheet (sheet, dataArray) {
	for (let cell in sheet) {
		if (cell[0] !== '!') {
			fillCell(sheet, cell, dataArray)
		}
	}
}

module.exports = function xlsxToArray (workbook) {
	const result = {}
	
	for (let sheetName of workbook.SheetNames) {
		const dataArray = []
		
		processSheet(workbook.Sheets[sheetName], dataArray)
		
		result[sheetName] = dataArray
	}
	
	return result
}

