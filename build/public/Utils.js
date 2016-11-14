var Utils = Utils || {
    drawLine: function (shape, a_x, a_y, a_x2, a_y2, width, color) {
        shape.moveTo(a_x, a_y);
        shape.lineStyle(width, color);
        shape.beginFill(color);
        shape.lineTo(a_x2, a_y2);
        shape.endFill();
    },
    updateLayersOrder: function (container) {
        container.children.sort(function (a, b) {
            a.zIndex = a.zIndex || 0;
            b.zIndex = b.zIndex || 0;
            return a.zIndex - b.zIndex;
        });
    }
};
