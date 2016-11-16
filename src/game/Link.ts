///<reference path="Drawable.ts"/>

class Link extends Drawable {
	// TRUMP SUCKS
	nodeA:NodeEntity;
	nodeB:NodeEntity;
	constructor(a_nodeA: NodeEntity, a_nodeB: NodeEntity) {
		var shape = new PIXI.Graphics();
		shape.x = 0;
		shape.y = 0;

		//OuterBound
		Utils.drawLine(shape, a_nodeA.graphic.x, a_nodeA.graphic.y,a_nodeB.graphic.x, a_nodeB.graphic.y, 10, Colors.grassOuterPath);

		//InnerBound
		Utils.drawLine(shape, a_nodeA.graphic.x, a_nodeA.graphic.y,a_nodeB.graphic.x, a_nodeB.graphic.y, 5, Colors.grassInnerPath);

		shape.zIndex = 1;
		shape.interactive = false;
		super(shape);
		this.nodeA = a_nodeA;
		this.nodeB = a_nodeB;
	}

	private drawLine(shape : PIXI.Graphics, a_x : number, a_y: number, a_x2 : number, a_y2 : number, width: number, color: number)
	{
		shape.moveTo(a_x, a_y);
		shape.lineStyle(width, color);
		shape.beginFill(color);
		shape.lineTo(a_x2, a_y2);
		shape.endFill();
	}
}
