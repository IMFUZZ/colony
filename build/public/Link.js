var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Link = (function (_super) {
    __extends(Link, _super);
    function Link(nodeA, nodeB) {
        _super.call(this);
        this.nodeA = nodeA;
        this.nodeB = nodeB;
        this.transferts = [];
        this.draw({
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
        });
    }
    Link.prototype.update = function () {
        for (var _i = 0, _a = this.transferts; _i < _a.length; _i++) {
            var transfert = _a[_i];
            transfert.update();
        }
    };
    Link.prototype.draw = function (config) {
        _super.prototype.draw.call(this, config);
        this.graphic.clear();
        this.graphic.zIndex = config.zIndex;
        Utils.drawLine(this.graphic, (this.nodeA) ? this.nodeA.graphic.x : config.x1, (this.nodeA) ? this.nodeA.graphic.y : config.y1, (this.nodeB) ? this.nodeB.graphic.x : config.x2, (this.nodeB) ? this.nodeB.graphic.y : config.y2, config.lineWidth, config.color);
    };
    Link.prototype.addTransfer = function () {
        this.transferts.push(new Transfert(this, 0.01, 0, "gold"));
        this.transferts.push(new Transfert(this, 0.01, 0, "food"));
        this.transferts.push(new Transfert(this, 0.01, 0, "population"));
    };
    Link.prototype.reset = function () {
        this.nodeA = null;
        this.nodeB = null;
    };
    Link.prototype.toData = function () {
        return {
            "nodeA": this.nodeA.id,
            "nodeB": this.nodeB.id,
            "transferts": []
        };
    };
    return Link;
}(Drawable));
