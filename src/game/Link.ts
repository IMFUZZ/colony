///<reference path="Drawable.ts"/>
///<reference path="Transfer.ts"/>
class Link extends Drawable {
	transfers: Transfer[];
	constructor(public nodeA: NodeEntity, public nodeB: NodeEntity) {
		super();	
		this.transfers = [];
		this.draw(
			{
				x: 0,
				y: 0,
				x1: 0, 
				y1: 0, 
				x2: 0, 
				y2: 0,
				interactive: false,
				zIndex: 1,
				color: Colors.grassInnerPath,
				lineWidth: 4
			}
		);
	}
	public draw(config) {
		super.draw(config);
		this.graphic.clear();
		this.graphic.zIndex = config.zIndex;
		Utils.drawLine(
			this.graphic, 
			(this.nodeA) ? this.nodeA.graphic.x : config.x1,
			(this.nodeA) ? this.nodeA.graphic.y : config.y1,
			(this.nodeB) ? this.nodeB.graphic.x : config.x2,
			(this.nodeB) ? this.nodeB.graphic.y : config.y2,
			config.lineWidth, 
			config.color
		);
	}

	public addTransfer() {
		this.transfers.push(new Transfer(this, 0.01, 0));
	}

	public reset() {
		this.nodeA = null;
		this.nodeB = null;
	}
}
