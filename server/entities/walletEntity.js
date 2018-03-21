class WalletEntity {

  constructor(cash, portfolioValue, pendingProfit, profit){
    this.cash           = cash;
    this.portfolioValue = portfolioValue;
    this.totalValue     = this.cash + this.portfolioValue;
    this.pendingProfit  = pendingProfit;
    this.profit         = profit;
  }




}


module.exports = WalletEntity;
