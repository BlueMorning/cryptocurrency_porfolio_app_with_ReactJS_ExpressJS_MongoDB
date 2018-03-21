import React, {Component} from 'react';
import ClientRequest from './../requests/clientRequest';


class CurrencyRowComponent extends Component {



  constructor(props){
    super(props);

    this.state = {
      transactionQuantity: 0
    }

    this.handleChangeQty  = function(event){
      this.setState({transactionQuantity: parseInt(event.target.value)});
    }.bind(this);

    this.onClickBuy = function(){
      this.props.buyCurrency(this.props.currencyEntity, this.state.transactionQuantity);
      this.setState({transactionQuantity: 0});
    }.bind(this)

    this.onClickSell = function(){
      if(this.state.transactionQuantity <= this.props.currencyEntity.portfolioQuantity){
        this.props.sellCurrency(this.props.currencyEntity, this.state.transactionQuantity);
        this.setState({transactionQuantity: 0});
      }
      else{
        
      }

    }.bind(this)
  }

  render(){
    return(
      <tr >
          <td>
            <div>
              <img src={this.props.currencyEntity.coinImage} className="rowCoinImage" alt={this.props.currencyEntity.coinName}/>
            </div>
          </td>
          <td>
            <div className="rowContainerNameAndSymbol">
              <div className="rowCoinName">{this.props.currencyEntity.coinName}</div>
              <div className="rowCoinSymbol">{this.props.currencyEntity.coinSymbol}</div>
            </div>
          </td>
          <td>
            <div className="rowCoinPrice">{this.props.currencyEntity.coinPrice}</div>
          </td>
          <td>
            <div className="rowCoinTotalVolume24h">{this.props.currencyEntity.coinTotalVolume24h}</div>
          </td>
          <td>
            <div className="rowCoinHigh24h">{this.props.currencyEntity.coinHigh24h}</div>
          </td>
          <td>
            <div className="rowCoinLow24h">{this.props.currencyEntity.coinLow24h}</div>
          </td>
          <td>
            <div className="rowCoinChange24h">{this.props.currencyEntity.coinChange24h}</div>
          </td>
          <td>
            <div className="rowCoinActionWatch"><button>Watch</button></div>
          </td>
          <td>
            <div className="rowCoinQty">{this.props.currencyEntity.portfolioQuantity}</div>
          </td>
          <td>
            <div className="rowCoinPrice">{this.props.currencyEntity.portfolioAveragePrice}</div>
          </td>
          <td>
            <div className="rowCoinInputQty"><input type="number" className="coinInputQty"
                                                    min="0"
                                                    value={this.state.transactionQuantity}
                                                    onChange={this.handleChangeQty}/>
            </div>
          </td>
          <td>
            <div className="rowCoinActionBuy"><button onClick={this.onClickBuy}>Buy</button></div>
          </td>
          <td>
            <div className="rowCoinActionSell"><button onClick={this.onClickSell}>Sell</button></div>
          </td>
     </tr>
    )
  }


}


export default CurrencyRowComponent;
