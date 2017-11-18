// Select color input
let color;
// Select size input
let inputHeight;
let inputWidth;
// When size is submitted by the user, call makeGrid()

$(variableInitializer);

function setCanvasDimensions() {
	inputHeight = $('#input_height').val();
	console.log("Height is " + inputHeight);
	inputWidth = $('#input_width').val();
	console.log("Width is " + inputWidth)
}

function variableInitializer() {
	color = $('#colorPicker').val();
	console.log("Color is " + color);
	$('#submit_button').click(makeGrid);
	$('table').on('click', 'td', function() {
		$(this).css("background-color", color);
	})
	$('#colorPicker').change(function() {
		color = $(this).val();
	});
	makeGrid();
}

function makeRow() {
	let row = $('<tr></tr>')
	for (let j=0; j<inputWidth; j++) {
		row.append('<td></td>');
	}
	return row;
}

function makeGrid() {
// Your code goes here!
	let canv = $('table');
	if ($.trim(canv.html())) {
		canv.empty();
	}
	setCanvasDimensions();
	for (let i=0; i<inputHeight; i++) {
		canv.append(makeRow());
	}
}
