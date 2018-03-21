const CurrencyEntity          = require('./../entities/currencyEntity');
const CurrencyAPIRequest      = require('./../requests/currencyAPIRequest');
const DatabasePortfolioModel  = require('./DatabasePortfolioModel');

class CurrenciesModel
{
  constructor()
  {
    this.currenciesList                 = [];
    this.coinNameFilter                 = "";
    this.resultLimit                    = 50;
    this.currencyAPIRequest             = new CurrencyAPIRequest();
    this.onRequestGetCurrencyDataList   = null;
    this.onMakeCurrencyTransactionDone  = null;
    this.databasePortfolioModel         = new DatabasePortfolioModel();
  }

  convertJSONCurrenciesToEntities(JSONCurrencies){
    const currencies = [];
    for(let currencyName in JSONCurrencies){
      let currencyEntity = new CurrencyEntity( JSONCurrencies[currencyName].Id,
                                               JSONCurrencies[currencyName].CoinName,
                                               JSONCurrencies[currencyName]["Symbol"],
                                               JSONCurrencies[currencyName].ImageUrl);
      currencies.push(currencyEntity);
    }

    return this.sortCurrencies(currencies)
  }

  filterCurrencies(currencies, currencyName, resultLimit) {
    let currenciesFiltered = [];

    if(currencyName != "")
    {
      currenciesFiltered = currencies.filter((currency) => {
        return currency.coinName.trim().toLowerCase().startsWith(currencyName.trim().toLowerCase());
      })
    }
    else
    {
      currenciesFiltered = currencies;
    }

    return currenciesFiltered.splice(0, resultLimit-1);
  }

  sortCurrencies(currencies){
    let currenciesSorted = currencies.sort(function(currencyA, currencyB) {
      if(currencyA.coinName <= currencyB.coinName){
        return -1;
      }
      else
      {
        return 1;
      }
    })
    return currenciesSorted;
  }


  searchForCurrencyDataList(coinNameFilter){

    this.coinNameFilter = coinNameFilter;

    this.databasePortfolioModel.checkCurrencyReferencesExist((isReferences) => {
      if(! isReferences){
        this.currencyAPIRequest.onRequestGetAllCurrenciesDone = this.requestGetAllCurrenciesDone.bind(this);
        this.currencyAPIRequest.requestAllCurrencies();
      }
      else{
        this.databasePortfolioModel.getCurrenciesReferencesByCoinName(this.coinNameFilter, this.resultLimit, (currencyList) => {
          this.currenciesList = currencyList;
          this.sendRequestGetCurrencyDataList(this.currenciesList);
        })
      }
    })
  }

  requestGetAllCurrenciesDone(currenciesJSON){
    this.currenciesList = this.convertJSONCurrenciesToEntities(currenciesJSON["Data"]);
    this.databasePortfolioModel.insertCurrencyReferences(this.currenciesList);
    this.currenciesList = this.filterCurrencies(this.currenciesList, this.coinNameFilter, this.resultLimit)
    this.sendRequestGetCurrencyDataList(this.currenciesList);
  }

  sendRequestGetCurrencyDataList(currencyEntities){

    this.currencyAPIRequest.onRequestGetCurrencyDataList = this.requestGetCurrencyDataListDone.bind(this);

    let coinSymbols = "";
    currencyEntities.forEach((currency) => {
      if((coinSymbols + currency.coinSymbol).length < 300)
      {
        coinSymbols += currency.coinSymbol+",";
      }
    })

    if(coinSymbols != null && coinSymbols != ""){
      coinSymbols = coinSymbols.substring(0, coinSymbols.length-1);
    }

    this.currencyAPIRequest.requestCurrencyDataList(coinSymbols);
  }

  requestGetCurrencyDataListDone(currenciesJSON){

    let finalCurrencyList = [];

    let currenciesJSONList = currenciesJSON["RAW"];

    for(let coinSymbol in currenciesJSONList){

      let currency = this.currenciesList.filter((currency) => {
        return currency.coinSymbol == coinSymbol;
      })[0];

      currency.coinPrice            = currenciesJSONList[coinSymbol]["USD"]["PRICE"];
      currency.coinHigh24h          = currenciesJSONList[coinSymbol]["USD"]["HIGH24HOUR"];
      currency.coinLow24h           = currenciesJSONList[coinSymbol]["USD"]["LOW24HOUR"];
      currency.coinTotalVolume24h   = currenciesJSONList[coinSymbol]["USD"]["TOTALVOLUME24H"];
      currency.coinChange24h        = currenciesJSONList[coinSymbol]["USD"]["CHANGE24HOUR"];

      finalCurrencyList.push(currency);
    }

    this.onRequestGetCurrencyDataList(finalCurrencyList);
  }

  getCurrencyCurrentValue(coinSymbol, callback){
    this.currencyAPIRequest.onRequestGetCurrencyDataList = this.requestGetCurrencyDataListDone.bind(this);
    this.requestCurrencyDataList([coinSymbol])
  }

  makeCurrencyTransaction(transactionType, coinSymbol, quantity){
    this.currencyAPIRequest.onRequestGetCurrencyDataList = function(currencyJSON){
      let currencyValues              = currencyJSON["RAW"][coinSymbol]["USD"];
      let currencyEntity              = {};
      currencyEntity.coinSymbol       = coinSymbol;
      currencyEntity.coinPrice        = currencyValues["PRICE"];
      this.databasePortfolioModel.onMakeCurrencyTransactionDone = function(currencyPortfolio){
        this.onMakeCurrencyTransactionDone(currencyPortfolio);
      }.bind(this);

      this.databasePortfolioModel.makeCurrencyTransaction(transactionType, currencyEntity, quantity);

    }.bind(this)

    this.currencyAPIRequest.requestCurrencyDataList(coinSymbol);
  }
}


module.exports = CurrenciesModel;
