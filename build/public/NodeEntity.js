var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var NodeEntity = (function (_super) {
    __extends(NodeEntity, _super);
    function NodeEntity(a_x, a_y) {
        var shape = new PIXI.Graphics();
        shape.x = a_x;
        shape.y = a_y;
        shape.beginFill(0x00000);
        shape.drawCircle(0, 0, 15);
        shape.endFill();
        shape.beginFill(0x487fd6);
        shape.drawCircle(0, 0, 13);
        shape.endFill();
        shape.interactive = true;
        shape.zIndex = 2;
        _super.call(this, shape);
        this.links = [];
    }
    NodeEntity.prototype.addLink = function (a_link) {
        this.links.push(a_link);
    };
    return NodeEntity;
}(Drawable));
