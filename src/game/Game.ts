

class Game {
	animationId: number;
	inputManager: InputManager;
	stage: PIXI.Container;
	graphs: Graph[];
	players: Player[];
	private playIntervalId; // ******* DJDUBE
	renderer: PIXI.CanvasRenderer;

	constructor(config, renderer:PIXI.CanvasRenderer) {
		this.players = [];
		this.graphs = [];
		this.renderer = renderer;
		this.inputManager = new InputManager(this.renderer.plugins.interaction);
		this.stage = new PIXI.Container();
		this.stage.hitArea = new PIXI.Rectangle(0, 0, renderer.width, renderer.height);
		this.stage.interactive = true;
		this.stage.on('mousedown', () => {
			(this.inputManager.mouse as any).link.reset();
		});

		this.load({
			"graphs" : [
				{
					"nodes" : [
						{
							"id" : 1,
							"x" : 100,
							"y" : 200,
							"resources" : [
								{
									"name" : "food",
									"amount" : 100,
									"growthRatio" : 0.1,
									"staticIncrease" : 10
								}
							]
						},
						{
							"id" : 2,
							"x" : 100,
							"y" : 350,
							"resources" : [
								{
									"name" : "food",
									"amount" : 100,
									"growthRatio" : 0.1,
									"staticIncrease" : 10
								}
							]
						}
					],
					"links" : [
						{
							"nodeA" : 1,
							"nodeB" : 2,
							"transferts*****" : [
							]
						}
					],
					"players" : [
						{
							"id" : 1,
							"nodes" : [1,2,3,4,5]
						}
					]
				}
			]
		});
	}

	start(interval: number) {
		this.playIntervalId = setInterval(() => {
			return this.update();
		}, interval);
	}	

	pause() {
		if (this.animationId != undefined) {
			cancelAnimationFrame(this.animationId);
			this.animationId = undefined;
		}
	}

	update() {
		this.inputManager.update();
		this.draw();
		this.animationId = requestAnimationFrame(() => {
			this.update();
		});
	}

	draw() {
		renderer.render(this.stage);
	}

	load(saveData) {
		for (var graphData of saveData.graphs) {
			var graph = new Graph([]);
			for (var nodeData of graphData.nodes) {
				graph.addNode(new NodeEntity(nodeData.x, nodeData.y));	
			}
			for (var linkData of graphData.links) {
				graph.createOneWayLink(graph.getNodeById(linkData.nodeAId), graph.getNodeById(linkData.nodeBId))
			}
			for (var playerData of graphData.players) {
				this.players.push(new Player(playerData.id));
			}
			graph.container.addChild((this.inputManager.mouse as any).link.graphic);
			this.stage.addChild(graph.container);
			this.graphs.push(graph);
		}
	}

	requestSaveFile(saveId, cb) {
		var request = new XMLHttpRequest();
		request.open('GET', '/load/'+saveId, true);
		request.onload = function() {
			if (!(this.status >= 200 && this.status < 400)) {
				throw new Error("Could not load the save #" + saveId + " | STATUS : " + this.status);
			}
			cb(JSON.parse(this.response));
		};
		request.onerror = function() {
			throw new Error("Could not load the save #" + saveId + "| REQUEST FAILED");
		};
		request.send();
	}
}