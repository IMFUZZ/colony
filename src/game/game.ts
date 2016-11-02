
//Create the renderer
var renderer = new PIXI.WebGLRenderer(256, 256);

//Add the canvas to the HTML document
document.body.appendChild(renderer.view);

//Create a container object called the `stage`
var stage = new PIXI.Container();
renderer.backgroundColor = 0xFF0000;

function update() {
	console.log("updating..");
	renderer.render(stage);
	requestAnimationFrame(update);
}

update();