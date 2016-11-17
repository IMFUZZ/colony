
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
		a_node.registerGraphics(this.container);
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

	createTwoWayLinks(nodeCouples : any[]) {
		nodeCouples.forEach((nodeCouple) => {
			this.createTwoWayLink(nodeCouple[0], nodeCouple[1]);
		});
	}

	render(renderer : PIXI.CanvasRenderer | PIXI.WebGLRenderer)
	{
		renderer.render(this.container);
	}
}