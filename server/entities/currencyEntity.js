class CurrencyEntity
{

  constructor(id, name, symbol, image){
    this.coinId           = id;
    this.coinName         = name;
    this.coinSymbol       = symbol;
    this.coinImage        = "https://www.cryptocompare.com"+image;

    this.price            = null;
    this.high24h          = null;
    this.low24h           = null;
    this.totalVolume24h   = null;
    this.change24h        = null;
  }

}


module.exports = CurrencyEntity;
