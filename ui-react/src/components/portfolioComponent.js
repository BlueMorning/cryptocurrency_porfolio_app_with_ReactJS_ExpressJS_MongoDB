import React, {Component}       from 'react';
import FormSearchForCurrencies  from './formSearchForCurrencies';
import CurrenciesListComponent  from './currenciesListComponent'
import CurrencyWatchedList      from './currencyWatchedList'
import ClientRequest            from './../requests/clientRequest';


class PortfolioComponent extends Component
{

  constructor(props)
  {
    super(props);
    this.title = "Cryptocurrency porfolio with ReactJS";
    this.state = {
      currencyFilteredList: [],
      currenciesWatchedList:  []
    }

    this.currencyFilteredList   = [];
    this.currencyListLimit      = 50;
    this.clientRequest          = new ClientRequest();
    this.currencyNameForSearch  = null;

    this.handleSearchForCurrencies    = this.handleSearchForCurrencies.bind(this);
    this.handleAddCurrencyToWatch     = this.handleAddCurrencyToWatch.bind(this);
    this.handleRemoveCurrencyToWatch  = this.handleRemoveCurrencyToWatch.bind(this);

    this.clientRequest.onSearchForCurrencies = this.searchForCurrenciesDone.bind(this);
    this.clientRequest.searchForCurrencies("");
  }

  render()
  {
    return (
      <div>
        <h1>{this.title}</h1>
        <FormSearchForCurrencies  onSearchForCurrencies={this.handleSearchForCurrencies}/>
        <CurrenciesListComponent  currencies={this.state.currencyFilteredList}       onAddCurrencyToWatch={this.handleAddCurrencyToWatch}/>
        <CurrencyWatchedList      currenciesWatched={this.state.currenciesWatchedList} onRemoveCurrencyToWatch={this.handleRemoveCurrencyToWatch}/>
      </div>
    )
  }

  handleSearchForCurrencies(currencyName){
    this.clientRequest.searchForCurrencies(currencyName);
  }


  handleAddCurrencyToWatch(currencyId){
    const currency = this.currencyFilteredList.filter((currencyEntity) => {
      return currencyEntity.id == currencyId
    })[0]

    let currenciesWatchedList = this.state.currenciesWatchedList.concat([currency]);
    this.setState({currenciesWatchedList: currenciesWatchedList});
  }

  handleRemoveCurrencyToWatch(currencyId){
    let currenciesWatchedList = this.state.currenciesWatchedList.filter((currencyEntity) => {
      return currencyEntity.id != currencyId
    });

    this.setState({currenciesWatchedList: currenciesWatchedList});
  }

  searchForCurrenciesDone(currencyDataList){
    this.currencyFilteredList = currencyDataList;
    this.setState({currencyFilteredList: this.currencyFilteredList});
  }
}

export default PortfolioComponent;
