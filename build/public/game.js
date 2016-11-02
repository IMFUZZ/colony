var renderer = new PIXI.WebGLRenderer(256, 256);
document.body.appendChild(renderer.view);
var stage = new PIXI.Container();
renderer.backgroundColor = 0xFF0000;
function update() {
    console.log("updating..");
    renderer.render(stage);
    requestAnimationFrame(update);
}
update();
