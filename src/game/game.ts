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
	renderer.backgroundColor = Colors.grass;
	setStage();
	var graph = new Graph([
		new NodeEntity(100, 100, [new Resource("test", 100, 0.01, 0, 50, 100)]),
		new NodeEntity(400,400),
		new NodeEntity(250,500),
		new NodeEntity(100,23),
		new NodeEntity(200,90),
		new NodeEntity(300,150),
		new NodeEntity(400,300),
		new NodeEntity(200,10)
	]);
	graph.createTwoWayLinks([
		[graph.nodes[0], graph.nodes[1]],
		[graph.nodes[1], graph.nodes[2]],
		[graph.nodes[0], graph.nodes[2]]
	]);
	stage.addChild(graph.container);
	graph.container.addChild(inputManager.mouse.link.graphic);
};

function update() {
	inputManager.update();
	renderer.render(stage);
	requestAnimationFrame(update);
}
setup();
update();
