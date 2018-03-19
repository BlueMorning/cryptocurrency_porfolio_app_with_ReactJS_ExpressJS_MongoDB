import React, {Component} from 'react';

class CurrenciesListComponent extends Component
{

  constructor(props){
    super(props);

  }


  handleOnClickAddCurrencyToWatch(currencyId, event)
  {
    this.props.onAddCurrencyToWatch(currencyId);
  }


  render(){

    let currencyLiList = this.props.currencies.map((currencyEntity) => {
      return <li key={currencyEntity.id}>
        <div>
          <div><img src={currencyEntity.image} className="currencyImage"/></div>
          <div>{currencyEntity.coinName}</div>
          <button onClick={this.handleOnClickAddCurrencyToWatch.bind(this, currencyEntity.id)}>WATCH</button>
        </div>
      </li>
    });

    return <div className="currencies-list"><ul>
      {currencyLiList}
    </ul></div>
  }

}

export default CurrenciesListComponent;
