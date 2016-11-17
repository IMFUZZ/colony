var Drawable = (function () {
    function Drawable(a_graphic) {
        if (a_graphic === void 0) { a_graphic = new PIXI.Graphics(); }
        this.graphic = a_graphic;
    }
    Drawable.prototype.draw = function (config) {
        this.graphic.x = (config.x != undefined) ? config.x : this.graphic.x;
        this.graphic.y = (config.y != undefined) ? config.y : this.graphic.y;
        this.graphic.zIndex = (config.zIndex != undefined) ? config.zIndex : this.graphic.zIndex;
    };
    return Drawable;
}());
