import React, {Component} from 'react';



class CurrencyWatchedList extends Component {

  constructor(props)
  {
    super(props);
  }

  handleOnClickRemoveWatchedCurrency(currencyId, event){
    this.props.onRemoveCurrencyToWatch(currencyId);
  }

  render(){
    let currencyValuesLi = this.props.currenciesWatched.map((currencyEntity) => {
      return <li key={currencyEntity.id}>
        <div><img src={currencyEntity.image} className="currencyImage"/></div>
        <div>{currencyEntity.name}</div>
        <div>{currencyEntity.value}</div>
        <button onClick={this.handleOnClickRemoveWatchedCurrency.bind(this, currencyEntity.id)}>REMOVE</button>
      </li>
    });

    return <div className="currencies-list-watched"><ul>
      {currencyValuesLi}
    </ul></div>

  }
}

export default CurrencyWatchedList;
