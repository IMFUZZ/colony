///<reference path="Drawable.ts"/>

class NodeEntity extends Drawable {
	links: Link[];
<<<<<<< HEAD
	
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
=======
	resources: Resource[];

	constructor(a_x:number, a_y:number, resources?: Resource[]) {
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
		this.resources = resources || [];
		this.resources.forEach(element => {
			element.start();
		})
>>>>>>> 4ce1bd2ca1d1faf389f34aaffc75c25a3efc4ae7
	}

	addLink(a_link:Link) {
		this.links.push(a_link);
	}

	/*addResource(a_resource: Resource)
	{
		this.resources.push(a_resource);
		Trouver un moyen de le faire mais on a besoin d'avoir accces au container de graph 
		alors peut-etre passer par le graph pour ajouter des ressources
	}*/

	registerGraphics(container : PIXI.Container)
	{
		container.addChild(this.graphic);
	    this.resources.forEach(element => {
			element.registerGraphics(container);
		});
	}
}