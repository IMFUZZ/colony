class Resource
{
    // The interval time between each update
    private updateInterval: number
    private interval : NodeJS.Timer
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
        this.updateInterval = 500;
    }

    start()
    {
        this.interval = setInterval(this.update(this), this.updateInterval);
        // Exemple of how to stop the interval
        // clearInterval(this.interval);
    }
    private update(self : Resource){
        return function()
        {
            self.amount += self.growthRatio * self.amount;
            self.amount += self.staticIncrease;
            self.text.text = Math.round(self.amount).toString();
        }
    }

    registerGraphics(container: PIXI.Container)
    {
        container.addChild(this.text);
    }
}
