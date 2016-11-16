///<reference path="Drawable.ts"/>

class NodeEntity extends Drawable {
	links: Link[];
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