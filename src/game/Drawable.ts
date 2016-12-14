class Drawable {
	graphic: PIXI.Graphics;
	
	constructor(a_graphic:PIXI.Graphics = new PIXI.Graphics()) {
		this.graphic = a_graphic;
	}

	draw(config) {
		this.graphic.clear();
		this.graphic.x = (config.x != undefined) ? config.x : this.graphic.x;
		this.graphic.y = (config.y != undefined) ? config.y : this.graphic.y;
		this.graphic.zIndex = (config.zIndex != undefined) ? config.zIndex : this.graphic.zIndex;
	}
}