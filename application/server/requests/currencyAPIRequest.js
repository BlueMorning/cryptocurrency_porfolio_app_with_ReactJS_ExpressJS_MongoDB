const ServerRequest = require('./serverRequest');

class CurrencyAPIRequest
{

  constructor(){
    this.onRequestGetAllCurrenciesDone = null;
    this.onRequestGetCurrencyDataList  = null;
  }


  requestAllCurrencies(){
    const request = new ServerRequest();
    request.sendGetRequest("https://min-api.cryptocompare.com/data/all/coinlist", (currenciesJSON) => {
      this.onRequestGetAllCurrenciesDone(JSON.parse(currenciesJSON));
    });
  }

  requestCurrencyDataList(coinNames){
    const request = new ServerRequest();
    request.sendGetRequest(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${coinNames}&tsyms=USD`, (currenciesJSON) => {
      this.onRequestGetCurrencyDataList(JSON.parse(currenciesJSON));
    });
  }

}

module.exports = CurrencyAPIRequest;
