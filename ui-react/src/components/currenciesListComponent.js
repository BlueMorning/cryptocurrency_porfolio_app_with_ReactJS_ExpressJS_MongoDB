import React, {Component} from 'react';
import CurrencyRowComponent from './currencyRowComponent';

class CurrenciesListComponent extends Component
{

  constructor(props){
    super(props);

  }


  render(){

    let currencyLiList = this.props.currencies.map((currencyEntity) => {
      return <CurrencyRowComponent currencyEntity={currencyEntity} key={currencyEntity.id} />
    });

    return <div className="currencies-list"><ul>
      {currencyLiList}
    </ul></div>
  }

}

export default CurrenciesListComponent;
