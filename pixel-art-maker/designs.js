// Select color input
let color;
// Select size input
let inputHeight;
let inputWidth;
// Variables for DOM elements
let sizePicker, picker, table, submit_button, input_height,input_width;

// Initialize all variables and create table
$(initializer);

// Initializint variables with jQuery selectors
function elementInitializer() {
	sizePicker = $("#sizePicker");
	picker = $('#colorPicker');
	table = $('table');
	submit_button = $('#submit_button');
	input_height = $('#input_height');
	input_width = $('input_width');
}

// Setting canvas dimensions for purpose of MakeGrid function
function setCanvasDimensions() {
	inputHeight = $('#input_height').val();
	inputWidth = $('#input_width').val();
}

// Initialize variables, set their values, event listeners for elements and draw a canvas
function initializer() {
	elementInitializer();
	color = picker.val();
	submit_button.click(makeGrid);
	table.on('click', 'td', function() {
		$(this).css("background-color", color);
	});
	picker.change(function() {
		color = $(this).val();
	});
	sizePicker.on('submit', function(e) {
    	e.preventDefault();
    	makeGrid();
	});
	makeGrid();
}

// Create a row of "<td>" elements
function makeRow() {
	let row = $('<tr></tr>')
	for (let j=0; j<inputWidth; j++) {
		row.append('<td></td>');
	}
	return row;
}

// Draw pixel canvas
function makeGrid() {
	if ($.trim(table.html())) {
		table.empty();
	}
	setCanvasDimensions();
	for (let i=0; i<inputHeight; i++) {
		table.append(makeRow());
	}
}
