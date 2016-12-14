var Game = (function () {
    function Game(config, renderer) {
        var _this = this;
        this.players = [];
        this.graphs = [];
        this.renderer = renderer;
        this.inputManager = new InputManager(this.renderer.plugins.interaction);
        this.stage = new PIXI.Container();
        this.stage.hitArea = new PIXI.Rectangle(0, 0, renderer.width, renderer.height);
        this.stage.interactive = true;
        this.stage.on('mousedown', function () {
            _this.inputManager.mouse.link.reset();
        });
        this.updateIntervalId = null;
        this.animationRequestId = null;
        this.contextMenu = new ContextMenu(".context-menu");
        this.menuFactory = new MenuFactory();
        this.load({
            "graphs": [
                {
                    "nodes": [
                        {
                            "id": 1,
                            "x": 100,
                            "y": 200,
                            "resources": [
                                {
                                    "name": "food",
                                    "amount": 100,
                                    "growthRatio": 0.1,
                                    "staticIncrease": 10
                                }
                            ]
                        },
                        {
                            "id": 2,
                            "x": 100,
                            "y": 350,
                            "resources": [
                                {
                                    "name": "food",
                                    "amount": 100,
                                    "growthRatio": 0.1,
                                    "staticIncrease": 10
                                }
                            ]
                        }
                    ],
                    "links": [
                        {
                            "nodeA": 1,
                            "nodeB": 2,
                            "transferts*****": []
                        }
                    ],
                    "players": [
                        {
                            "id": 1,
                            "color": 0x0000ff,
                            "nodes": [1]
                        }
                    ]
                }
            ]
        });
    }
    Game.prototype.start = function (interval) {
        var _this = this;
        this.updateIntervalId = setInterval(function () {
            return _this.update();
        }, interval);
    };
    Game.prototype.pause = function () {
        if (this.updateIntervalId != null) {
            clearInterval(this.updateIntervalId);
            this.updateIntervalId = null;
        }
        if (this.animationRequestId != null) {
            cancelAnimationFrame(this.animationRequestId);
            this.animationRequestId = null;
        }
    };
    Game.prototype.update = function () {
        var _this = this;
        this.inputManager.update();
        for (var _i = 0, _a = this.graphs; _i < _a.length; _i++) {
            var graph = _a[_i];
            graph.update();
        }
        this.animationRequestId = requestAnimationFrame(function () {
            _this.draw();
        });
    };
    Game.prototype.draw = function () {
        renderer.render(this.stage);
    };
    Game.prototype.load = function (saveData) {
        for (var _i = 0, _a = saveData.graphs; _i < _a.length; _i++) {
            var graphData = _a[_i];
            var graph = new Graph([]);
            for (var _b = 0, _c = graphData.nodes; _b < _c.length; _b++) {
                var nodeData = _c[_b];
                graph.addNode(new NodeEntity(nodeData.x, nodeData.y, [], {
                    id: nodeData.id
                }));
            }
            for (var _d = 0, _e = graphData.links; _d < _e.length; _d++) {
                var linkData = _e[_d];
                graph.createOneWayLink(graph.getNodeById(linkData.nodeA), graph.getNodeById(linkData.nodeB));
            }
            for (var _f = 0, _g = graphData.players; _f < _g.length; _f++) {
                var playerData = _g[_f];
                var player = new Player(playerData.color, playerData.id);
                for (var _h = 0, _j = playerData.nodes; _h < _j.length; _h++) {
                    var nodeId = _j[_h];
                    var node = graph.getNodeById(nodeId);
                    if (node) {
                        node.setOwner(player);
                    }
                }
                this.players.push(player);
            }
            graph.container.addChild(this.inputManager.mouse.link.graphic);
            this.stage.addChild(graph.container);
            this.graphs.push(graph);
        }
    };
    Game.prototype.save = function () {
        var saveData = {
            "graphs": [],
            "players": []
        };
        for (var _i = 0, _a = this.graphs; _i < _a.length; _i++) {
            var graph = _a[_i];
            saveData.graphs.push(graph.toData());
        }
        for (var _b = 0, _c = this.players; _b < _c.length; _b++) {
            var player = _c[_b];
            saveData.players.push(undefined);
        }
    };
    Game.prototype.requestSaveFile = function (saveId, cb) {
        var request = new XMLHttpRequest();
        request.open('GET', '/load/' + saveId, true);
        request.onload = function () {
            if (!(this.status >= 200 && this.status < 400)) {
                throw new Error("Could not load the save #" + saveId + " | STATUS : " + this.status);
            }
            cb(JSON.parse(this.response));
        };
        request.onerror = function () {
            throw new Error("Could not load the save #" + saveId + "| REQUEST FAILED");
        };
        request.send();
    };
    return Game;
}());
