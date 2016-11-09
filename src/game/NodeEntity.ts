///<reference path="Drawable.ts"/>

class NodeEntity extends Drawable {
	links: Link[];
	
	constructor(a_x:number, a_y:number) {
		var shape = new PIXI.Graphics();
		shape.x = a_x;
		shape.y = a_y;
		shape.beginFill(0xff0000); // CHANGE THIS
		shape.drawCircle(0, 0, 10);
		shape.endFill();
		shape.interactive = true;
		super(shape);
		this.links = [];
	}

	addLink(a_link:Link) {
		this.links.push(a_link);
	}
}