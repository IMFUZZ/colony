class Transfert {
    
    constructor(public lk: Link, public growthRatio: number, public staticIncrease: number, public resourceType : string) {
        
    }

    update() {
        let amount = this.lk.nodeA.resources[this.resourceType].amount;
        let amountToExtract = amount * this.growthRatio + this.staticIncrease;
        this.lk.nodeA.extract(amountToExtract, this.resourceType);
        this.lk.nodeB.insert(amountToExtract, this.resourceType);
    }
}