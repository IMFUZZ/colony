///<reference path="Drawable.ts"/>

class Link extends Drawable {
	nodeA:NodeEntity;
	nodeB:NodeEntity;
	constructor(a_nodeA: NodeEntity, a_nodeB: NodeEntity) {
		var shape = new PIXI.Graphics();
		shape.x = 0;
		shape.y = 0;
		shape.zIndex = 1;
		shape.interactive = false;
		super(shape);
		if (a_nodeA) {
			this.nodeA = a_nodeA;	
			Utils.drawLine(
				shape, 
				a_nodeA.graphic.x, 
				a_nodeA.graphic.y,
				a_nodeB.graphic.x, 
				a_nodeB.graphic.y, 
				4, 
				0x000000
			);
		}
		if (a_nodeB) {
			this.nodeB = a_nodeB;	
			Utils.drawLine(
				shape, 
				a_nodeA.graphic.x, 
				a_nodeA.graphic.y,
				a_nodeB.graphic.x, 
				a_nodeB.graphic.y, 
				2,
				0xffffff
			);
		}		
	}

	public redraw(x1, y1, x2, y2, zIndex) {
		this.graphic.clear();
		this.graphic.zIndex = zIndex;
		x1 = (this.nodeA) ? this.nodeA.graphic.x : x1;
		y1 = (this.nodeA) ? this.nodeA.graphic.y : y1;
		x2 = (this.nodeB) ? this.nodeB.graphic.x : x2;
		y2 = (this.nodeB) ? this.nodeB.graphic.y : y2;
		console.log(x2);
		Utils.drawLine(
			this.graphic, 
			x1, 
			y1,
			x2, 
			y2, 
			4, 
			0x000000
		);
	}

	public reset() {
		this.nodeA = null;
		this.nodeB = null;
	}
}