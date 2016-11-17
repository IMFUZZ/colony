var InputManager = (function () {
    function InputManager(a_interactionManager) {
        this.IM = a_interactionManager;
        this.IM.interactionFrequency = 1;
        this.mouse = this.IM.mouse;
        this.mouse.link = new Link(null, null);
    }
    InputManager.prototype.update = function () {
        inputManager.mouse.link.draw({
            x1: this.mouse.global.x,
            y1: this.mouse.global.y,
            x2: this.mouse.global.x,
            y2: this.mouse.global.y,
            color: 0xff0000,
            lineWidth: 4
        });
    };
    return InputManager;
}());
