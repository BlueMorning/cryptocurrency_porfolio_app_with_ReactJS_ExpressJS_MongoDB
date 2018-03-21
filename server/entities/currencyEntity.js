class CurrencyEntity
{

  constructor(id, name, symbol, image){
    this.coinId                 = id;
    this.coinName               = name;
    this.coinSymbol             = symbol;
    this.coinImage              = "https://www.cryptocompare.com"+image;
    this.coinPrice              = 0;
    this.coinHigh24h            = 0;
    this.coinLow24h             = 0;
    this.coinTotalVolume24h     = 0;
    this.coinChange24h          = 0;
    this.portfolioQuantity      = 0;
    this.portfolioAveragePrice  = 0;
  }

}


module.exports = CurrencyEntity;
