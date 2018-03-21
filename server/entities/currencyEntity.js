class CurrencyEntity
{

  constructor(id, name, symbol, image){
    this.coinId           = id;
    this.coinName         = name;
    this.coinSymbol       = symbol;
    this.coinImage        = "https://www.cryptocompare.com"+image;

    this.coinPrice            = null;
    this.coinHigh24h          = null;
    this.coinLow24h           = null;
    this.coinTotalVolume24h   = null;
    this.coinChange24h        = null;
  }

}


module.exports = CurrencyEntity;
