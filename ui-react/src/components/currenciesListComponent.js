import React, {Component} from 'react';
import CurrencyRowComponent from './currencyRowComponent';

class CurrenciesListComponent extends Component
{

  constructor(props){
    super(props);
  }


  render(){

    let currencyLiList = this.props.currencies.map((currencyEntity) => {
      return <CurrencyRowComponent currencyEntity={currencyEntity}
                                   key={currencyEntity.coinId}
                                   buyCurrency={this.props.buyCurrency}
                                   sellCurrency={this.props.sellCurrency} />
    });

    return <div className="currencies-list">
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Symbol</th>
                  <th>Current Value</th>
                  <th>Highest price 24h</th>
                  <th>Lowest price 24h</th>
                  <th>Variation 24h</th>
                  <th>Watch</th>
                  <th>Portfolio Quantity</th>
                  <th>Average purchase price</th>
                  <th>Transaction quantity</th>
                  <th>Buy</th>
                  <th>Sell</th>
                </tr>
              </thead>
              <tbody>

                    {currencyLiList}
              </tbody>
            </table>
          </div>
  }

}

export default CurrenciesListComponent;
