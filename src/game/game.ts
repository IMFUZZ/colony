
var WIDTH = 800;
var HEIGHT = 600;
var colors;
var inputManager;
var renderer;
var stage;

function setStage() {
	stage = new PIXI.Container();
	stage.hitArea = new PIXI.Rectangle(0, 0, WIDTH, HEIGHT);
	stage.interactive = true;
	stage.on('mousedown', () => {
		inputManager.mouse.link.reset();
	});
}

function setup() {
	renderer = PIXI.autoDetectRenderer(
		WIDTH, HEIGHT, {
		"antialias" : true,
		"autoResize" : true
	});
	inputManager = new InputManager(renderer.plugins.interaction);

	//Add the canvas to the HTML document
	document.body.appendChild(renderer.view);
	renderer.backgroundColor = 0xe0e0e0;

<<<<<<< HEAD
	setStage();
	var graph = new Graph([
		new NodeEntity(100, 100),
		new NodeEntity(400,400),
		new NodeEntity(250,500)
	]);
	graph.createTwoWayLinks([
		[graph.nodes[0], graph.nodes[1]],
		[graph.nodes[1], graph.nodes[2]],
		[graph.nodes[0], graph.nodes[2]]
	]);

	stage.addChild(graph.container);
	graph.container.addChild(inputManager.mouse.link.graphic);
};
=======
var graph = new Graph([
	new NodeEntity(100, 100, [new Resource("Population", 11000,-0.01, 100, 80,70)]),
	new NodeEntity(400,400, [new Resource("Population", 11000,-1, 100, 380,370)]),
	new NodeEntity(250,500)
]);
graph.createTwoWayLink(graph.nodes[0], graph.nodes[1]);
graph.createTwoWayLink(graph.nodes[1], graph.nodes[2]);
graph.createTwoWayLink(graph.nodes[0], graph.nodes[2]);
/*// Text example
var text = new PIXI.Text(
	'This is a pixi text',
	{
		fontFamily : 'Lucida Sans Unicode',
		fontSize: 12, 
		fill : colors.b, 
		align : 'center'
	}
);
stage.addChild(text);
*/

/*
// Shape drawing example
var pixiCircle = new PIXI.Graphics();
pixiCircle.beginFill(colors.c);
pixiCircle.drawCircle(0, 0, 10);
pixiCircle.endFill();
pixiCircle.interactive = true;
stage.addChild(pixiCircle);
>>>>>>> 4ce1bd2ca1d1faf389f34aaffc75c25a3efc4ae7

function update() {
<<<<<<< HEAD
	inputManager.update();
	renderer.render(stage);
=======
	// console.log("updating..");
	graph.render(renderer);
>>>>>>> 4ce1bd2ca1d1faf389f34aaffc75c25a3efc4ae7
	requestAnimationFrame(update);
}
setup();
update();