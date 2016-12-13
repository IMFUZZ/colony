///<reference path="Drawable.ts"/>

class NodeEntity extends Drawable {
	readonly id: number;
	links: Link[];
	owner: number;
	resources: Resource[];
	private static count:number = 0;
	radius: number;
	constructor(a_x:number, a_y:number, resources?: Resource[], id?: number) {
		super();
		super.draw({
			x: a_x,
			y: a_y,
			interactive: false,
			zIndex: 1,
			color: 0x000000,
			lineWidth: 4
		});
		this.radius = 7.5;
		this.graphic.interactive = true;
		this.graphic.beginFill(0x00000);
		this.graphic.drawCircle(0,0,this.radius*2);
		this.graphic.endFill();
		this.graphic.beginFill(0x487fd6);
		this.graphic.drawCircle(0, 0, (this.radius*2)-2);
		this.graphic.endFill();
		this.graphic.zIndex = 2;

		this.id = id || ++NodeEntity.count;

		this.links = [];

		this.owner = Player.NONE;

		this.resources = resources || [];
		this.resources.forEach(element => {
			element.start();
		})
		this.graphic.on("mousedown", (e) => {
			/*if(e.data.originalEvent.which === 3 || e.data.originalEvent.button === 2) {
				ContextMenu.showAtNode(this);
				return false;
			}*/
			e.stopPropagation();
			console.log("node mousedown");
			var nodeA = game.inputManager.mouse.link.nodeA;
			var nodeB = game.inputManager.mouse.link.nodeB;
			if (nodeA && nodeB) {
				game.inputManager.mouse.link.reset();
			}
			if (!nodeA) {
				game.inputManager.mouse.link.nodeA = this;
			} else {
				game.inputManager.mouse.link.nodeB = this;
			}
		});
	}

	addLink(a_link:Link) {
		this.links.push(a_link);
	}

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
	
	/* Retourne une représentation sérialisable du node */
	toData() {
		return {
			"id": this.id,
			"x": this.graphic.x,
			"y": this.graphic.y,
			"resources": undefined // TODO foreach resource.toData()
		};
	}
}