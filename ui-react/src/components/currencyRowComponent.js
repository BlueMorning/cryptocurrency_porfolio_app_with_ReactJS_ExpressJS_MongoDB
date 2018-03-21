import React, {Component} from 'react'


class CurrencyRowComponent extends Component {



  constructor(props){
    super(props);
    this.currencyEntity = this.props.currencyEntity;
  }

  render(){
    return(
      <tr >
          <td>
            <div>
              <img src={this.currencyEntity.coinImage} className="rowCoinImage" alt={this.currencyEntity.coinName}/>
            </div>
          </td>
          <td>
            <div className="rowContainerNameAndSymbol">
              <div className="rowCoinName">{this.currencyEntity.coinName}</div>
              <div className="rowCoinSymbol">{this.currencyEntity.coinSymbol}</div>
            </div>
          </td>
          <td>
            <div className="rowCoinPrice">{this.currencyEntity.price}</div>
          </td>
          <td>
            <div className="rowCoinTotalVolume24h">{this.currencyEntity.totalVolume24h}</div>
          </td>
          <td>
            <div className="rowCoinHigh24h">{this.currencyEntity.high24h}</div>
          </td>
          <td>
            <div className="rowCoinLow24h">{this.currencyEntity.low24h}</div>
          </td>
          <td>
            <div className="rowCoinChange24h">{this.currencyEntity.change24h}</div>
          </td>
          <td>
            <div className="rowCoinActionWatch"><button>Watch</button></div>
          </td>
          <td>
            <div className="rowCoinInputQty"><input type="number" min="0" /></div>
          </td>
          <td>
            <div className="rowCoinActionBuy"><button>Buy</button></div>
          </td>
          <td>
            <div className="rowCoinActionSell"><button>Sell</button></div>
          </td>
     </tr>
    )
  }


}


export default CurrencyRowComponent;
