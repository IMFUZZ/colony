///<reference path="Drawable.ts"/>
///<reference path='Transfert.ts'/>

class NodeEntity extends Drawable {
	readonly id: number;
	links: Link[];
	private owner: number;
	resources: Resource[];
	private static count:number = 0;
	radius: number;
	color : number;
	constructor(x:number, y:number, resources?: Resource[], config?) {
		super();
		config = config || {};
		this.id = config.id || ++NodeEntity.count;
		this.color = 0xFFFFFF;
		this.redraw(x, y);
		this.links = [];
		this.owner = config.ownerId || Player.NONE;
		this.resources = resources || [];
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

		for (var resource of this.resources) {
			resource.update();	
		}
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

	extract(amount: number) {
		this.resources[0].amount -= amount;
		return amount;
	}

    insert(ex: number) {
        this.resources[0].amount += ex;
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