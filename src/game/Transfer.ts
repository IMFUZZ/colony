class Transfer {
    private updateInterval: number;
    private interval : NodeJS.Timer;
    

    constructor(public lk: Link, public growthRatio: number, public staticIncrease: number) {
        this.updateInterval = 500;
        this.start();
    }

    start()
    {
        this.interval = setInterval(this.update(this), this.updateInterval);
        // Exemple of how to stop the interval
        // clearInterval(this.interval);
    }
    
    private update(self : Transfer){
        return function()
        {
            let amount = self.lk.nodeA.resources[0].amount;
            let amountToExtract = amount * self.growthRatio + self.staticIncrease;
            self.lk.nodeA.extract(amountToExtract);
            self.lk.nodeB.insert(amountToExtract);
        }
    }
}