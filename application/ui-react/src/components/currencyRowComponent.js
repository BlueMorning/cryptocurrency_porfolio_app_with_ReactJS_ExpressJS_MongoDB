import React, {Component} from 'react';
import ClientRequest from './../requests/clientRequest';
import MathHelper from './../helpers/mathHelper';


class CurrencyRowComponent extends Component {



  constructor(props){
    super(props);

    this.mathHelper = new MathHelper();

    this.state = {
      transactionQuantity: 0,
      priceClassName: "price-normal"
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

  componentWillReceiveProps(nextProps) {
    if (this.props.currencyEntity.coinPrice < nextProps.currencyEntity.coinPrice) {
      this.toggleClassListBlink("price-normal", "price-green");
    }
    else if(this.props.currencyEntity.coinPrice > nextProps.currencyEntity.coinPrice){
      this.toggleClassListBlink("price-normal", "price-red");
    }
  }

  toggleClassListBlink(initialClassName, tempClassName){
    this.setState({priceClassName: tempClassName}, () => {
      setTimeout(() => {
        this.setState({priceClassName: initialClassName});
      }, 2000);
    });

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
            <div className="rowCoinPrice"><span className={this.state.priceClassName}>$ {this.props.currencyEntity.coinPrice}</span></div>
          </td>
          <td>
            <div className="rowCoinHigh24h">$ {this.props.currencyEntity.coinHigh24h}</div>
          </td>
          <td>
            <div className="rowCoinLow24h">$ {this.props.currencyEntity.coinLow24h}</div>
          </td>
          <td>
            <div className="rowCoinChange24h">$ {this.mathHelper.precisionRound(this.props.currencyEntity.coinChange24h, 6)}</div>
          </td>
          <td>
            <div className="rowCoinActionWatch"><button className="button-blue">Watch</button></div>
          </td>
          <td>
            <div className="rowCoinPrice">$ {this.mathHelper.precisionRound(this.props.currencyEntity.portfolioAveragePrice, 6)}</div>
          </td>
          <td>
            <div className="rowCoinQty">{this.props.currencyEntity.portfolioQuantity}</div>
          </td>
          <td>
            <div className="rowCoinInputQty"><input type="number" className="coinInputQty"
                                                    min="0"
                                                    value={this.state.transactionQuantity}
                                                    onChange={this.handleChangeQty}/>
            </div>
          </td>
          <td>
            <div className="rowCoinActionBuy"><button className="button-green" onClick={this.onClickBuy}>Buy</button></div>
          </td>
          <td>
            <div className="rowCoinActionSell"><button className="button-red" onClick={this.onClickSell}>Sell</button></div>
          </td>
     </tr>
    )
  }


}


export default CurrencyRowComponent;
