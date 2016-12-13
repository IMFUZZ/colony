///<reference path="Drawable.ts"/>
///<reference path='Transfert.ts'/>



class NodeEntity extends Drawable {
	resources : {[resourceType : string] : Resource;};
	resourcesType : string[] = ["gold", "food", "population"];
	readonly id: number;
	links: Link[];
	owner: number;
	private static count:number = 0;
	radius: number;
	constructor(a_x:number, a_y:number, resources?: Resource[], id?: number) {
		super();
		this.id = id || ++NodeEntity.count;
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
		this.links = [];
		this.owner = Player.NONE;
		
		this.resources = {"gold" : new Resource("gold", 100, 0.001, 0.001, a_x, a_y), 
				"food" : new Resource("food", 100, 0.001, 0.001, a_x, a_y + 15), 
				"population" : new Resource("population", 100, 0.001, 0.001, a_x, a_y + 30)};
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
			} else if (!nodeA) {
				game.inputManager.mouse.link.nodeA = this;
			} else {
				game.inputManager.mouse.link.nodeB = this;
				let link = null;
				game.inputManager.mouse.link.nodeA.links.forEach((e) => {
					if(e.nodeA == game.inputManager.mouse.link.nodeA && e.nodeB == game.inputManager.mouse.link.nodeB){
						link = e;
					}
				});
				if (link) {
					// Ajout un context menu et faire dequoi - Guillaume 2016
					link.addTransfer(); 
				}
			}
		});
	}

	update() {
		for (var link of this.links) {
			link.update();	
		}
		this.resources["gold"].update();
		this.resources["food"].update();
		this.resources["population"].update();
	}

	addLink(a_link:Link) {
		this.links.push(a_link);
	}

	registerGraphics(container : PIXI.Container)
	{
		container.addChild(this.graphic);
		for (var i: number = 0; i < this.resourcesType.length ; ++i){
			this.resources[this.resourcesType[i]].registerGraphics(container);
		}
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

	extract(amount: number, type : string) {
		this.resources[type].amount -= amount;
		return amount;
	}

    insert(ex: number, type : string) {
        this.resources[type].amount += ex;
    }
}
