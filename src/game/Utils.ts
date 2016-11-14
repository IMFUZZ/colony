var Utils = Utils || {
    drawLine : function(shape : PIXI.Graphics, a_x : number, a_y: number, a_x2 : number, a_y2 : number, width: number, color: number)
	{
		shape.moveTo(a_x, a_y);
		shape.lineStyle(width, color);
		shape.beginFill(color);
		shape.lineTo(a_x2, a_y2);
		shape.endFill();
	},
    updateLayersOrder(container: PIXI.Container)
    {
        container.children.sort(function(a,b) {
			a.zIndex = a.zIndex || 0;
			b.zIndex = b.zIndex || 0;
			return  a.zIndex - b.zIndex;
		});
    }
}