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
        a_node.registerGraphics(this.container);
        Utils.updateLayersOrder(this.container);
    };
    Graph.prototype.getNodeById = function (nodeId) {
        for (var _i = 0, _a = this.nodes; _i < _a.length; _i++) {
            var x = _a[_i];
            if (x.id == nodeId)
                return x;
        }
        return null;
    };
    Graph.prototype.createOneWayLink = function (a_nodeA, a_nodeB) {
        var link = new Link(a_nodeA, a_nodeB);
        a_nodeA.addLink(link);
        this.container.addChild(link.graphic);
        Utils.updateLayersOrder(this.container);
    };
    Graph.prototype.createTwoWayLink = function (a_nodeA, a_nodeB) {
        this.createOneWayLink(a_nodeA, a_nodeB);
        this.createOneWayLink(a_nodeB, a_nodeA);
    };
    Graph.prototype.createTwoWayLinks = function (nodeCouples) {
        var _this = this;
        nodeCouples.forEach(function (nodeCouple) {
            _this.createTwoWayLink(nodeCouple[0], nodeCouple[1]);
        });
    };
    Graph.prototype.render = function (renderer) {
        renderer.render(this.container);
    };
    return Graph;
}());
