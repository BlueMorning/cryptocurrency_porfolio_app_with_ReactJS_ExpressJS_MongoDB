import React, {Component} from 'react'


class CurrencyRowComponent extends Component {



  constructor(props){
    super(props);
    this.currencyEntity = props.currencyEntity;
  }

  render(){
    return(
      <tr>
          <td>
            <div>
              <img src={this.currencyEntity.image} className="rowCoinImage"/>
            </div>
          </td>
          <td>
            <div class="rowContainerNameAndSymbol">
              <div class="rowCoinName">{this.currencyEntity.coinName}</div>
              <div class="rowCoinSymbol">{this.currencyEntity.coinSymbol}</div>
            </div>
          </td>
          <td>
            <div class="rowCoinPrice">{this.currencyEntity.price}</div>
          </td>
          <td>
            <div class="rowCoinTotalVolume24h">{this.currencyEntity.totalVolume24h}</div>
          </td>
          <td>
            <div class="rowCoinHigh24h">{this.currencyEntity.high24h}</div>
          </td>
          <td>
            <div class="rowCoinLow24h">{this.currencyEntity.low24h}</div>
          </td>
          <td>
            <div class="rowCoinChange24h">{this.currencyEntity.change24h}</div>
          </td>
          <td>
            <div class="rowCoinActionWatch"><button>Watch</button></div>
          </td>
          <td>
            <div class="rowCoinInputQty"><input type="number" min="0" /></div>
          </td>
          <td>
            <div class="rowCoinActionBuy"><button>Buy</button></div>
          </td>
          <td>
            <div class="rowCoinActionSell"><button>Sell</button></div>
          </td>
     </tr>
    )
  }


}


export default CurrencyRowComponent;
