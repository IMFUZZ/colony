

class InputManager {
	private IM:PIXI.interaction.InteractionManager;
	mouse:PIXI.interaction.InteractionData;
	constructor(a_interactionManager: PIXI.interaction.InteractionManager) {
		this.IM = a_interactionManager;
		this.IM.interactionFrequency = 1;
		
		this.mouse = this.IM.mouse;
		(this.mouse as any).link = new Link(null, null);
	}

	update() {
		inputManager.mouse.link.draw({
			x1: this.mouse.global.x, 
			y1: this.mouse.global.y, 
			x2: this.mouse.global.x, 
			y2: this.mouse.global.y,
			color: 0xff0000,
			lineWidth: 4
		});
	}
}