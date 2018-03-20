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

    this.handleSearchForCurrencies    = this.handleSearchForCurrencies.bind(this);

    this.clientRequest.onSearchForCurrencies = this.searchForCurrenciesDone.bind(this);
    this.clientRequest.searchForCurrencies("");
  }

  render()
  {
    return (
      <div>
        <h1>{this.title}</h1>
        <FormSearchForCurrencies  onSearchForCurrencies={this.handleSearchForCurrencies}/>
        <CurrenciesListComponent  currencies={this.state.currencyFilteredList} />
      </div>
    )
  }

  handleSearchForCurrencies(currencyName){
    this.clientRequest.searchForCurrencies(currencyName);
  }

  searchForCurrenciesDone(currencyDataList){
    console.log(currencyDataList);
    this.currencyFilteredList = currencyDataList;
    this.setState({currencyFilteredList: this.currencyFilteredList});
  }
}

export default PortfolioComponent;
