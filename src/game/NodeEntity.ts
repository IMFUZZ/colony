///<reference path="Drawable.ts"/>

class NodeEntity extends Drawable {
	links: Link[];
	
	constructor(a_x:number, a_y:number) {
		super();
		super.draw({
			x: a_x,
			y: a_y,
			interactive: false,
			zIndex: 1,
			color: 0x000000,
			lineWidth: 4
		});
		this.graphic.interactive = true;
		this.graphic.beginFill(0x00000);
		this.graphic.drawCircle(0,0,15);
		this.graphic.endFill();
		this.graphic.beginFill(0x487fd6);
		this.graphic.drawCircle(0, 0, 13);
		this.graphic.endFill();
		this.graphic.zIndex = 2;
		this.links = [];

		this.graphic.on("mousedown", (e) => {
			e.stopPropagation();
			console.log("node mousedown");
			var nodeA = inputManager.mouse.link.nodeA;
			var nodeB = inputManager.mouse.link.nodeB;
			if (nodeA && nodeB) {
				inputManager.mouse.link.reset();
			}
			if (!nodeA) {
				inputManager.mouse.link.nodeA = this;
			} else {
				inputManager.mouse.link.nodeB = this;
			}
		});
	}

	addLink(a_link:Link) {
		this.links.push(a_link);
	}
}