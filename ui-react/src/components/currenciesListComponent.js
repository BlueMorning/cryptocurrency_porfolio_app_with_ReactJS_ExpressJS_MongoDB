import React, {Component} from 'react';
import CurrencyRowComponent from './currencyRowComponent';

class CurrenciesListComponent extends Component
{

  constructor(props){
    super(props);

  }


  render(){

    let currencyLiList = this.props.currencies.map((currencyEntity) => {
      return <CurrencyRowComponent currencyEntity={currencyEntity} key={currencyEntity.coinId}/>
    });

    return <div className="currencies-list">
            <table>
                <tbody>
                      {currencyLiList}
                </tbody>
            </table>
          </div>
  }

}

export default CurrenciesListComponent;
