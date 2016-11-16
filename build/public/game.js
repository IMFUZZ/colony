var colors;
var interactionManager;
var renderer;
function setup() {
    colors = {
        "a": 0x2A363B,
        "b": 0xE84A5F,
        "c": 0xFF847C,
        "d": 0xFECEA8,
        "e": 0x99B898
    };
    renderer = PIXI.autoDetectRenderer(800, 600, {
        "antialias": true,
        "autoResize": true
    });
    interactionManager = new PIXI.interaction.InteractionManager(renderer);
    interactionManager.mouse.link = new Link(null, null);
    document.body.appendChild(renderer.view);
    renderer.backgroundColor = 0xe0e0e0;
}
;
var graph = new Graph([
    new NodeEntity(100, 100),
    new NodeEntity(400, 400),
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
