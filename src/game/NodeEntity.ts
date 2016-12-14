///<reference path="Drawable.ts"/>
///<reference path='Transfert.ts'/>



class NodeEntity extends Drawable {
	resources : {[resourceType : string] : Resource;};
	resourcesType : string[] = ["gold", "food", "population"];
	readonly id: number;
	links: Link[];
	private owner: number;
	private static count:number = 0;
	radius: number;
	color : number;
	constructor(x:number, y:number, resources?: Resource[], config?) {
		super();
		this.resources = {"gold" : new Resource("gold", 100, 0.001, 0.001, x, y), 
				"food" : new Resource("food", 100, 0.001, 0.001, x, y + 15), 
				"population" : new Resource("population", 100, 0.001, 0.001, x, y + 30)};
		config = config || {};
		this.id = config.id || ++NodeEntity.count;
		this.color = 0xFFFFFF;
		this.redraw(x, y);
		this.links = [];
		this.owner = config.ownerId || Player.NONE;
		this.registerClicks();
	}

	registerClicks() {
		this.graphic.on("rightdown", (e) => {
			game.menuFactory.SpawnMenuAtNode(this, MenuType.OwnedNode); 
			// game.contextMenu.showAtNode(this);
		})
		this.graphic.on("mousedown", (e) => {
			e.stopPropagation();
			// console.log("node mousedown");
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
		for (var i: number = 0; i < this.resourcesType.length; ++i) {
			this.resources[this.resourcesType[i]].update();
		}
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

    redraw(x:number, y:number) {
    	super.draw({
			x: x,
			y: y,
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
		// This is the inside color of the node
		this.graphic.beginFill(this.color);
		this.graphic.drawCircle(0, 0, (this.radius*2)-2);
		this.graphic.endFill();
		this.graphic.zIndex = 2;
    }

    setOwner(player: Player) {
        this.owner = player.id;
        this.color = player.color;
        this.redraw(this.graphic.x, this.graphic.y); 
    }

    getOwner() {
        return this.owner; 
    }
}
