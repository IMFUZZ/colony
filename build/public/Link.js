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
        Utils.drawLine(shape, a_nodeA.graphic.x, a_nodeA.graphic.y, a_nodeB.graphic.x, a_nodeB.graphic.y, 10, Colors.grassOuterPath);
        Utils.drawLine(shape, a_nodeA.graphic.x, a_nodeA.graphic.y, a_nodeB.graphic.x, a_nodeB.graphic.y, 5, Colors.grassInnerPath);
        shape.zIndex = 1;
        shape.interactive = false;
        _super.call(this, shape);
        this.nodeA = a_nodeA;
        this.nodeB = a_nodeB;
    }
    Link.prototype.drawLine = function (shape, a_x, a_y, a_x2, a_y2, width, color) {
        shape.moveTo(a_x, a_y);
        shape.lineStyle(width, color);
        shape.beginFill(color);
        shape.lineTo(a_x2, a_y2);
        shape.endFill();
    };
    return Link;
}(Drawable));
