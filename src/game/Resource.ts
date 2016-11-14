class Resource
{
    // The interval time between each update
    private updateInterval: number
    private interval : NodeJS.Timer
    constructor(public name:string, public amount: number, public growthRatio: number, public staticIncrease: number)
    {
        this.updateInterval = 500;
    }

    start()
    {
        this.interval = setInterval(this.update(this), this.updateInterval);
        // Exemple of how to stop the interval
        // clearInterval(this.interval);
    }
    private update(self){
        return function()
        {
            self.amount += self.growthRatio * self.amount;
            self.amount += self.staticIncrease;
            console.log(self.amount);
        }
    }
}