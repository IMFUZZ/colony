var WIDTH = 800;
var HEIGHT = 600;
var renderer;
var game;
function setup() {
    renderer = PIXI.autoDetectRenderer(WIDTH, HEIGHT, {
        "antialias": true,
        "autoResize": true
    });
    game = new Game({}, renderer);
    document.body.appendChild(renderer.view);
    renderer.backgroundColor = Colors.grass;
    game.start(1000);
}
;
setup();
