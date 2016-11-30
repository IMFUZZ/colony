var Transfer = (function () {
    function Transfer(lk, growthRatio, staticIncrease) {
        this.lk = lk;
        this.growthRatio = growthRatio;
        this.staticIncrease = staticIncrease;
        this.updateInterval = 500;
        this.start();
    }
    Transfer.prototype.start = function () {
        this.interval = setInterval(this.update(this), this.updateInterval);
    };
    Transfer.prototype.update = function (self) {
        return function () {
            var amount = self.lk.nodeA.resources[0].amount;
            var amountToExtract = amount * self.growthRatio + self.staticIncrease;
            self.lk.nodeA.extract(amountToExtract);
            self.lk.nodeB.insert(amountToExtract);
        };
    };
    return Transfer;
}());
