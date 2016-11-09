///<reference path="Drawable.ts"/>

class Link extends Drawable {
	// TRUMP SUCKS
	nodeA:NodeEntity;
	nodeB:NodeEntity;
	constructor(a_nodeA: NodeEntity, a_nodeB: NodeEntity) {
		var shape = new PIXI.Graphics();
		shape.x = 0;
		shape.y = 0;

		shape.moveTo(a_nodeA.graphic.x, a_nodeA.graphic.y);

		shape.lineStyle(2, 0xff0000, 1);
		
		shape.beginFill(0xff0000);
		shape.lineTo(a_nodeB.graphic.x, a_nodeB.graphic.y);
		shape.endFill();
		
		shape.interactive = false;
		super(shape);
		this.nodeA = a_nodeA;
		this.nodeB = a_nodeB;
	}
}