var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Drawable = (function () {
    function Drawable(a_graphic) {
        this.graphic = a_graphic;
    }
    return Drawable;
}());
var Graph = (function () {
    function Graph(a_nodes) {
        var _this = this;
        this.container = new PIXI.Container();
        this.nodes = [];
        a_nodes.forEach(function (node) {
            _this.addNode(node);
        });
    }
    Graph.prototype.addNode = function (a_node) {
        this.nodes.push(a_node);
        this.container.addChild(a_node.graphic);
    };
    Graph.prototype.createOneWayLink = function (a_nodeA, a_nodeB) {
        var link = new Link(a_nodeA, a_nodeB);
        a_nodeA.addLink(link);
        this.container.addChild(link.graphic);
    };
    Graph.prototype.createTwoWayLink = function (a_nodeA, a_nodeB) {
        this.createOneWayLink(a_nodeA, a_nodeB);
        this.createOneWayLink(a_nodeB, a_nodeA);
    };
    return Graph;
}());
var Link = (function (_super) {
    __extends(Link, _super);
    function Link(a_nodeA, a_nodeB) {
        var shape = new PIXI.Graphics();
        shape.x = 0;
        shape.y = 0;
        shape.moveTo(a_nodeA.graphic.x, a_nodeA.graphic.y);
        shape.lineStyle(2, 0xff0000, 1);
        shape.beginFill(0xff0000);
        shape.lineTo(a_nodeB.graphic.x, a_nodeB.graphic.y);
        shape.endFill();
        shape.interactive = false;
        _super.call(this, shape);
        this.nodeA = a_nodeA;
        this.nodeB = a_nodeB;
    }
    return Link;
}(Drawable));
var NodeEntity = (function (_super) {
    __extends(NodeEntity, _super);
    function NodeEntity(a_x, a_y) {
        var shape = new PIXI.Graphics();
        shape.x = a_x;
        shape.y = a_y;
        shape.beginFill(0xff0000);
        shape.drawCircle(0, 0, 10);
        shape.endFill();
        shape.interactive = true;
        _super.call(this, shape);
        this.links = [];
    }
    NodeEntity.prototype.addLink = function (a_link) {
        this.links.push(a_link);
    };
    return NodeEntity;
}(Drawable));
var Vec2 = (function () {
    function Vec2(x, y) {
        this.x = x;
        this.y = y;
    }
    return Vec2;
}());
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
    document.body.appendChild(renderer.view);
    renderer.backgroundColor = colors.a;
}
;
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
function update() {
    console.log("updating..");
    renderer.render(graph.container);
    requestAnimationFrame(update);
}
setup();
update();
