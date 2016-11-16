
class Graph {
	container:PIXI.Container;
	nodes:NodeEntity[];
	constructor(a_nodes: NodeEntity[]) {
		this.container = new PIXI.Container();
		this.nodes = [];
		a_nodes.forEach((node)=>{
			this.addNode(node);
		});
	}
	
	addNode(a_node: NodeEntity) {
		this.nodes.push(a_node);
		this.container.addChild(a_node.graphic);
		Utils.updateLayersOrder(this.container);
	}

	createOneWayLink(a_nodeA:NodeEntity, a_nodeB:NodeEntity) {
		var link = new Link(a_nodeA, a_nodeB);
		a_nodeA.addLink(link);
		this.container.addChild(link.graphic);
		Utils.updateLayersOrder(this.container);
	}

	createTwoWayLink(a_nodeA:NodeEntity, a_nodeB:NodeEntity) {
		this.createOneWayLink(a_nodeA, a_nodeB);
		this.createOneWayLink(a_nodeB, a_nodeA);
	}

	render(renderer : PIXI.CanvasRenderer | PIXI.WebGLRenderer)
	{
		renderer.render(this.container);
	}
}