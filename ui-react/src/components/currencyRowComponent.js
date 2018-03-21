import React, {Component} from 'react';
import ClientRequest from './../requests/clientRequest';


class CurrencyRowComponent extends Component {



  constructor(props){
    super(props);

    this.transactionQty = 0;
    this.state          = {currencyEntity:  this.props.currencyEntity};

    this.handleChangeQty  = function(event){
      this.transactionQty = parseInt(event.target.value);
    }.bind(this);

    this.clientRequest    = new ClientRequest();

    this.onClickBuy       = function(){
                                        this.clientRequest.buyCurrency( this.state.currencyEntity.coinSymbol,
                                                                        this.transactionQty,
                                                                        this.handleTransactionDone);
                                      }.bind(this);

    this.onClickSell      = function(){
                                        this.clientRequest.sellCurrency(this.state.currencyEntity.coinSymbol,
                                                                        this.transactionQty,
                                                                        this.handleTransactionDone);
                                      }.bind(this);

    this.handleTransactionDone = function(currencyPortfolioJSON){
      let currencyPortfolio             = JSON.parse(currencyPortfolioJSON);
      let currencyEntity                = this.props.currencyEntity;
      currencyEntity.coinQuantity       = currencyPortfolio.quantity;
      currencyEntity.coinAveragePrice   = currencyPortfolio.averagePrice;
      this.setState({currencyEntity: currencyEntity});
    }.bind(this);
  }

  render(){
    return(
      <tr >
          <td>
            <div>
              <img src={this.state.currencyEntity.coinImage} className="rowCoinImage" alt={this.state.currencyEntity.coinName}/>
            </div>
          </td>
          <td>
            <div className="rowContainerNameAndSymbol">
              <div className="rowCoinName">{this.state.currencyEntity.coinName}</div>
              <div className="rowCoinSymbol">{this.state.currencyEntity.coinSymbol}</div>
            </div>
          </td>
          <td>
            <div className="rowCoinPrice">{this.state.currencyEntity.coinPrice}</div>
          </td>
          <td>
            <div className="rowCoinTotalVolume24h">{this.state.currencyEntity.coinTotalVolume24h}</div>
          </td>
          <td>
            <div className="rowCoinHigh24h">{this.state.currencyEntity.coinHigh24h}</div>
          </td>
          <td>
            <div className="rowCoinLow24h">{this.state.currencyEntity.coinLow24h}</div>
          </td>
          <td>
            <div className="rowCoinChange24h">{this.state.currencyEntity.coinChange24h}</div>
          </td>
          <td>
            <div className="rowCoinActionWatch"><button>Watch</button></div>
          </td>
          <td>
            <div className="rowCoinQty">{this.state.currencyEntity.portfolioQuantity}</div>
          </td>
          <td>
            <div className="rowCoinPrice">{this.state.currencyEntity.portfolioAveragePrice}</div>
          </td>
          <td>
            <div className="rowCoinInputQty"><input type="number" min="0" onChange={this.handleChangeQty}/></div>
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
