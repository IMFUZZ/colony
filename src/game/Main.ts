
var WIDTH = 800;
var HEIGHT = 600;
var renderer;
var game;
function setup() {
	renderer = PIXI.autoDetectRenderer(
		WIDTH, HEIGHT, {
		"antialias" : true,
		"autoResize" : true
	});
	game = new Game({}, renderer);
	//Add the canvas to the HTML document
	document.body.appendChild(renderer.view);
	renderer.backgroundColor = Colors.grass;
	game.start();
};

setup();