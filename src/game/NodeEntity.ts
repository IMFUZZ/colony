///<reference path="Drawable.ts"/>

class NodeEntity extends Drawable {
	links: Link[];
	
	constructor(a_x:number, a_y:number) {
		var shape = new PIXI.Graphics();
		shape.interactive = true;
		shape.x = a_x;
		shape.y = a_y;
		shape.beginFill(0x00000);
		shape.drawCircle(0,0,15);
		shape.endFill();
		shape.beginFill(0x487fd6);
		shape.drawCircle(0, 0, 13);
		shape.endFill();
		shape.zIndex = 2;
		super(shape);
		this.links = [];

		shape.on("mousedown", (e) => {
			interactionManager.mouse.clickedNode = this;
			console.log("MOUSEDOWN!");
		});

		shape.on("mouseup", (e) => {
			console.log(interactionManager.mouse.clickedNode);
		});
	}

	addLink(a_link:Link) {
		this.links.push(a_link);
	}
}