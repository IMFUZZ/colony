var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Link = (function (_super) {
    __extends(Link, _super);
    function Link(a_nodeA, a_nodeB) {
        var shape = new PIXI.Graphics();
        shape.x = 0;
        shape.y = 0;
        shape.zIndex = 1;
        shape.interactive = false;
        _super.call(this, shape);
        if (a_nodeA) {
            this.nodeA = a_nodeA;
            Utils.drawLine(shape, a_nodeA.graphic.x, a_nodeA.graphic.y, a_nodeB.graphic.x, a_nodeB.graphic.y, 4, 0x000000);
        }
        if (a_nodeB) {
            this.nodeB = a_nodeB;
            Utils.drawLine(shape, a_nodeA.graphic.x, a_nodeA.graphic.y, a_nodeB.graphic.x, a_nodeB.graphic.y, 2, 0xffffff);
        }
    }
    Link.prototype.redraw = function (x1, y1, x2, y2, zIndex) {
        this.graphic.clear();
        this.graphic.zIndex = zIndex;
        x1 = (this.nodeA) ? this.nodeA.graphic.x : x1;
        y1 = (this.nodeA) ? this.nodeA.graphic.y : y1;
        x2 = (this.nodeB) ? this.nodeB.graphic.x : x2;
        y2 = (this.nodeB) ? this.nodeB.graphic.y : y2;
        console.log(x2);
        Utils.drawLine(this.graphic, x1, y1, x2, y2, 4, 0x000000);
    };
    Link.prototype.reset = function () {
        this.nodeA = null;
        this.nodeB = null;
    };
    return Link;
}(Drawable));
