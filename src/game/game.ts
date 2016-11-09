
var color = {
	"a" : 0x2A363B,
	"b" : 0xE84A5F,
	"c" : 0xFF847C,
	"d" : 0xFECEA8,
	"e" : 0x99B898
};

var renderer = PIXI.autoDetectRenderer(1280, 720, {
	"antialias" : true,
	"autoResize" : true
});
var interactionManager = new PIXI.interaction.InteractionManager(renderer);

//Add the canvas to the HTML document
document.body.appendChild(renderer.view);

var stage = new PIXI.Container();
renderer.backgroundColor = color.a;

var text = new PIXI.Text(
	'This is a pixi text',
	{
		fontFamily : 'Lucida Sans Unicode',
		fontSize: 12, 
		fill : color.b, 
		align : 'center'
	}
);
stage.addChild(text);

var locked = true;

function onDragStart(mouseData) {
	locked = false;
};

function onDragMove() {
	if (!locked) {
		pixiCircle.x = interactionManager.mouse.global.x;
		pixiCircle.y = interactionManager.mouse.global.y; 
		// console.log(interactionManager.mouse.global.x + " | " + interactionManager.mouse.global.y);
		// console.log(pixiCircle.x + " | " + pixiCircle.y);
	}
};

function onDragEnd() {
	locked = true;
};

var pixiCircle = new PIXI.Graphics();
pixiCircle.beginFill(color.c);
pixiCircle.drawCircle(0, 0, 10);
pixiCircle.endFill();
pixiCircle.interactive = true;
pixiCircle
	// events for drag start
    .on('mousedown', onDragStart)
    .on('touchstart', onDragStart)
    // events for drag end
    .on('mouseup', onDragEnd)
    .on('mouseupoutside', onDragEnd)
    .on('touchend', onDragEnd)
    .on('touchendoutside', onDragEnd)
    // events for drag move
    .on('mousemove', onDragMove)
    .on('touchmove', onDragMove);

stage.addChild(pixiCircle);

var rectangle = new PIXI.Graphics();
rectangle.beginFill(color.c);
rectangle.drawRect(0, 0, 64, 64);
rectangle.endFill();
rectangle.x = 170;
rectangle.y = 170;
stage.addChild(rectangle);

function update() {
	// console.log("updating..");
	renderer.render(stage);
	requestAnimationFrame(update);
}

update();