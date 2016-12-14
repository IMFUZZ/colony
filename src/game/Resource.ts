class Resource
{
    private text : PIXI.Text
    constructor(public name:string, public amount: number, public growthRatio: number, public staticIncrease: number, x? : number, y? : number)
    {
        this.text = new PIXI.Text(amount.toString(),{
            fontFamily : 'Arial',
            fontWeight : 'Bold',
            fontSize: 12,
            fill : 0xffffff,
            align : 'center',
        });
        this.text.x = x || 0;
        this.text.y = y || 0;
        this.text.zIndex = 15;

    }

    update() {
        this.amount += this.growthRatio * this.amount;
        this.amount += this.staticIncrease;
        this.text.text = this.name + " : " +  Math.round(this.amount).toString();            
    }

    registerGraphics(container: PIXI.Container)
    {
        container.addChild(this.text);
    }
}