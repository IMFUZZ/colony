var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var NodeEntity = (function (_super) {
    __extends(NodeEntity, _super);
    function NodeEntity(a_x, a_y, resources, id) {
        var _this = this;
        _super.call(this);
        this.id = id || ++NodeEntity.count;
        _super.prototype.draw.call(this, {
            x: a_x,
            y: a_y,
            interactive: false,
            zIndex: 1,
            color: 0x000000,
            lineWidth: 4
        });
        this.radius = 7.5;
        this.graphic.interactive = true;
        this.graphic.beginFill(0x00000);
        this.graphic.drawCircle(0, 0, this.radius * 2);
        this.graphic.endFill();
        this.graphic.beginFill(0x487fd6);
        this.graphic.drawCircle(0, 0, (this.radius * 2) - 2);
        this.graphic.endFill();
        this.graphic.zIndex = 2;
        this.links = [];
        this.owner = Player.NONE;
        this.resources = resources || [];
        this.graphic.on("mousedown", function (e) {
            e.stopPropagation();
            console.log("node mousedown");
            var nodeA = game.inputManager.mouse.link.nodeA;
            var nodeB = game.inputManager.mouse.link.nodeB;
            if (nodeA && nodeB) {
                game.inputManager.mouse.link.reset();
            }
            else if (!nodeA) {
                game.inputManager.mouse.link.nodeA = _this;
            }
            else {
                game.inputManager.mouse.link.nodeB = _this;
                var link_1 = null;
                game.inputManager.mouse.link.nodeA.links.forEach(function (e) {
                    if (e.nodeA == game.inputManager.mouse.link.nodeA && e.nodeB == game.inputManager.mouse.link.nodeB) {
                        link_1 = e;
                    }
                });
                if (link_1) {
                    link_1.addTransfer();
                }
            }
        });
    }
    NodeEntity.prototype.update = function () {
        for (var _i = 0, _a = this.links; _i < _a.length; _i++) {
            var link = _a[_i];
            link.update();
        }
        for (var _b = 0, _c = this.resources; _b < _c.length; _b++) {
            var resource = _c[_b];
            resource.update();
        }
    };
    NodeEntity.prototype.addLink = function (a_link) {
        this.links.push(a_link);
    };
    NodeEntity.prototype.registerGraphics = function (container) {
        container.addChild(this.graphic);
        this.resources.forEach(function (element) {
            element.registerGraphics(container);
        });
    };
    NodeEntity.prototype.belongsTo = function (a_player) {
        return a_player.isOwnerOf(this);
    };
    NodeEntity.prototype.toData = function () {
        return {
            "id": this.id,
            "x": this.graphic.x,
            "y": this.graphic.y,
            "resources": undefined
        };
    };
    NodeEntity.prototype.extract = function (amount) {
        this.resources[0].amount -= amount;
        return amount;
    };
    NodeEntity.prototype.insert = function (ex) {
        this.resources[0].amount += ex;
    };
    NodeEntity.count = 0;
    return NodeEntity;
}(Drawable));
