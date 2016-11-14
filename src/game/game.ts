
var colors;
var interactionManager;
var renderer;

function setup() {
	colors = {
		"a" : 0x2A363B,
		"b" : 0xE84A5F,
		"c" : 0xFF847C,
		"d" : 0xFECEA8,
		"e" : 0x99B898
	};
	renderer = PIXI.autoDetectRenderer(
		800, 600, {
		"antialias" : true,
		"autoResize" : true
	});
	interactionManager = new PIXI.interaction.InteractionManager(renderer);

	//Add the canvas to the HTML document
	document.body.appendChild(renderer.view);
	renderer.backgroundColor = colors.a;
};

var graph = new Graph([
	new NodeEntity(100, 100),
	new NodeEntity(200, 100),
	new NodeEntity(300, 100),
	new NodeEntity(100, 200),
	new NodeEntity(200, 200),
	new NodeEntity(300, 200),
	new NodeEntity(100, 300),
	new NodeEntity(200, 300),
	new NodeEntity(300, 300)
]);
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

var rectangle = new PIXI.Graphics();
rectangle.beginFill(colors.c);
rectangle.drawRect(0, 0, 64, 64);
rectangle.endFill();
rectangle.x = 170;
rectangle.y = 170;
stage.addChild(rectangle);
*/
function update() {
	console.log("updating..");
	renderer.render(graph.container);
	requestAnimationFrame(update);
}
setup();
update();