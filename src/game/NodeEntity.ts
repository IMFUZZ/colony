///<reference path="Drawable.ts"/>

class NodeEntity extends Drawable {
	links: Link[];
	
	constructor(a_x:number, a_y:number) {
		var shape = new PIXI.Graphics();
		shape.x = a_x;
		shape.y = a_y;
		shape.beginFill(0x00000);
		shape.drawCircle(0,0,15);
		shape.endFill();
		shape.beginFill(0x487fd6); // CHANGE THIS
		shape.drawCircle(0, 0, 13);
		shape.endFill();
		shape.interactive = true;
		shape.zIndex = 2;
		super(shape);
		this.links = [];
	}

	addLink(a_link:Link) {
		this.links.push(a_link);
	}
}