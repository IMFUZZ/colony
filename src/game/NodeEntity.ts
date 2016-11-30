///<reference path="Drawable.ts"/>
///<reference path='Transfer.ts'/>

class NodeEntity extends Drawable {
	links: Link[];
	owner: number;
	resources: Resource[];
	
	constructor(a_x:number, a_y:number, resources?: Resource[]) {
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
		this.owner = Player.NONE;
		this.resources = resources || [];
		this.resources.forEach(element => {
			element.start();
		})
		this.graphic.on("mousedown", (e) => {
			e.stopPropagation();
			console.log("node mousedown");
			var nodeA = inputManager.mouse.link.nodeA;
			var nodeB = inputManager.mouse.link.nodeB;
			if (nodeA && nodeB) {
				inputManager.mouse.link.reset();
			}else if (!nodeA) {
				inputManager.mouse.link.nodeA = this;
			} else {
				inputManager.mouse.link.nodeB = this;
				let link = null;
				inputManager.mouse.link.nodeA.links.forEach((e) => {
					if(e.nodeA == inputManager.mouse.link.nodeA && e.nodeB == inputManager.mouse.link.nodeB){
						link = e;
					}
				});
				if (link) {
					link.addTransfer();
				}
			}
		});
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
	belongsTo(a_player: Player): boolean {
		return a_player.isOwnerOf(this);
	}

	extract(amount: number) {
		this.resources[0].amount -= amount;
		return amount;
	}

    insert(ex: number) {
        this.resources[0].amount += ex;
    }
}