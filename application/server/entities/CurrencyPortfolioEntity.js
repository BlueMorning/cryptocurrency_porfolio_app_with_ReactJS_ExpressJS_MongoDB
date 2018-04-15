class CurrencyPortfolioEntity {

  constructor(coinSymbol, quantity, totalPrice, averagePrice){
    this.coinSymbol   = coinSymbol;
    this.quantity     = quantity;
    this.totalPrice   = totalPrice;
    this.averagePrice = averagePrice;
  }

}


module.exports = CurrencyPortfolioEntity;
