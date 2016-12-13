class Transfert {
    
    constructor(public lk: Link, public growthRatio: number, public staticIncrease: number) {
       
    }

    update() {
        let amount = this.lk.nodeA.resources[0].amount;
        let amountToExtract = amount * this.growthRatio + this.staticIncrease;
        this.lk.nodeA.extract(amountToExtract);
        this.lk.nodeB.insert(amountToExtract);
    }
}