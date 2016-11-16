var colors;
var interactionManager;
var renderer;
function setup() {
    renderer = PIXI.autoDetectRenderer(800, 600, {
        "antialias": true,
        "autoResize": true
    });
    interactionManager = new PIXI.interaction.InteractionManager(renderer);
    document.body.appendChild(renderer.view);
    renderer.backgroundColor = Colors.grass;
}
;
var graph = new Graph([
    new NodeEntity(100, 100, [new Resource("Population", 11000, -0.01, 100, 80, 70)]),
    new NodeEntity(400, 400, [new Resource("Population", 11000, -1, 100, 380, 370)]),
    new NodeEntity(250, 500)
]);
graph.createTwoWayLink(graph.nodes[0], graph.nodes[1]);
graph.createTwoWayLink(graph.nodes[1], graph.nodes[2]);
graph.createTwoWayLink(graph.nodes[0], graph.nodes[2]);
function update() {
    graph.render(renderer);
    requestAnimationFrame(update);
}
setup();
update();
