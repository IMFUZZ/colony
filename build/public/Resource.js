var Resource = (function () {
    function Resource(name, amount, growthRatio, staticIncrease, x, y) {
        this.name = name;
        this.amount = amount;
        this.growthRatio = growthRatio;
        this.staticIncrease = staticIncrease;
        this.text = new PIXI.Text(amount.toString(), {
            fontFamily: 'Arial',
            fontWeight: 'Bold',
            fontSize: 12,
            fill: 0x000000,
            align: 'center'
        });
        this.text.x = x || 0;
        this.text.y = y || 0;
        this.text.zIndex = 15;
        this.updateInterval = 500;
    }
    Resource.prototype.start = function () {
        this.interval = setInterval(this.update(this), this.updateInterval);
    };
    Resource.prototype.update = function (self) {
        return function () {
            self.amount += self.growthRatio * self.amount;
            self.amount += self.staticIncrease;
            self.text.text = Math.round(self.amount).toString();
        };
    };
    Resource.prototype.registerGraphics = function (container) {
        container.addChild(this.text);
    };
    return Resource;
}());
