var ContextMenu = (function () {
    function ContextMenu(selector) {
        this.$menu = $(selector);
        this.margin = 5;
        this.$menu.hide();
    }
    ContextMenu.prototype.addItem = function (item) {
        var _this = this;
        var $item = $("<div class='menu-item'>" + item.name + "</div>");
        if (item.isSubMenu) {
            $item.click(function () {
                _this.clear();
                _this.$menu.append(item.subMenuContent);
                if (_this.currentNode) {
                    _this.showAtNode(_this.currentNode);
                }
            });
        }
        else {
            $item.click(function () { item.execute(); _this.hide(); });
        }
        this.$menu.append($item);
    };
    ContextMenu.prototype.addItems = function (items) {
        var _this = this;
        items.forEach(function (element) { _this.addItem(element); });
    };
    ContextMenu.prototype.clear = function () {
        this.$menu.empty();
    };
    ContextMenu.prototype.show = function () {
        this.$menu.show();
    };
    ContextMenu.prototype.hide = function () {
        this.$menu.hide();
    };
    ContextMenu.prototype.showAt = function (top, left) {
        this.currentNode = null;
        this.$menu.css({ top: top, left: left });
        this.show();
    };
    ContextMenu.prototype.showAtNode = function (node) {
        this.currentNode = node;
        var heigth, width, x, y;
        heigth = this.$menu.outerHeight();
        width = this.$menu.outerWidth();
        x = node.graphic.x - width / 2;
        y = node.graphic.y - (node.radius * 2) - this.margin - heigth;
        x = Math.max(x, 0);
        if (y < 0) {
            y = node.graphic.y + (node.radius * 2) + this.margin;
        }
        this.$menu.css({ top: y, left: x });
        this.show();
    };
    return ContextMenu;
}());
$(document).contextmenu(function () {
    return false;
});
