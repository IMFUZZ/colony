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
            fill: 0xffffff,
            align: 'center'
        });
        this.text.x = x || 0;
        this.text.y = y || 0;
        this.text.zIndex = 15;
    }
    Resource.prototype.update = function () {
        this.amount += this.growthRatio * this.amount;
        this.amount += this.staticIncrease;
        this.text.text = Math.round(this.amount).toString();
    };
    Resource.prototype.registerGraphics = function (container) {
        container.addChild(this.text);
    };
    return Resource;
}());
