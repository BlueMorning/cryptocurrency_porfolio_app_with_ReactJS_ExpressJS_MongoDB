import React, {Component}       from 'react';
import FormSearchForCurrencies  from './formSearchForCurrencies';
import CurrenciesListComponent  from './currenciesListComponent'
import ClientRequest            from './../requests/clientRequest';


class PortfolioComponent extends Component
{

  constructor(props)
  {
    super(props);
    this.title = "Cryptocurrency porfolio with ReactJS";
    this.state = {
      currencyFilteredList: []
    }

    this.currencyFilteredList   = [];
    this.currencyListLimit      = 50;
    this.clientRequest          = new ClientRequest();
    this.currencyNameForSearch  = null;

    this.handleSearchForCurrencies            = this.handleSearchForCurrencies.bind(this);
    this.handleBuyCurrency                    = this.handleBuyCurrency.bind(this);
    this.handleSellCurrency                   = this.handleSellCurrency.bind(this);
    this.refreshCurrencyRow                   = this.refreshCurrencyRow.bind(this);
    this.clientRequest.onSearchForCurrencies  = this.searchForCurrenciesDone.bind(this);
    this.clientRequest.searchForCurrencies("");
  }

  render()
  {
    return (
      <div>
        <h1>{this.title}</h1>
        <FormSearchForCurrencies  onSearchForCurrencies={this.handleSearchForCurrencies}/>
        <CurrenciesListComponent  currencies={this.state.currencyFilteredList}
                                  buyCurrency={this.handleBuyCurrency}
                                  sellCurrency={this.handleSellCurrency} />
      </div>
    )
  }

  handleSearchForCurrencies(currencyName){
    this.clientRequest.searchForCurrencies(currencyName);
  }

  searchForCurrenciesDone(currencyDataList){
    this.currencyFilteredList = currencyDataList;
    this.setState({currencyFilteredList: this.currencyFilteredList});
  }

  handleBuyCurrency(currencyEntity, transactionQuantity){
    this.clientRequest.buyCurrency(currencyEntity.coinSymbol,
                                   transactionQuantity,
                                   this.refreshCurrencyRow);
  }

  handleSellCurrency(currencyEntity, transactionQuantity){
    this.clientRequest.sellCurrency(currencyEntity.coinSymbol,
                                    transactionQuantity,
                                    this.refreshCurrencyRow);
  }

  refreshCurrencyRow(currencyPortfolioEntityJSON){
    let currencyPortfolioEntity = JSON.parse(currencyPortfolioEntityJSON);
    let currencyFilteredList    = this.state.currencyFilteredList;
    let currencyRow             = currencyFilteredList.find((currency) => {
      return currency.coinSymbol == currencyPortfolioEntity.coinSymbol;
    });

    if(currencyRow != null && currencyRow != undefined){
      currencyRow.transactionQuantity   = 0;
      currencyRow.portfolioQuantity     = currencyPortfolioEntity.quantity;
      currencyRow.portfolioAveragePrice = currencyPortfolioEntity.averagePrice;
    }

    this.setState({currencyFilteredList: currencyFilteredList});
  }

}

export default PortfolioComponent;
