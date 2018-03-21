import React, {Component} from 'react';


class WalletComponent extends Component {

  constructor(props){
    super(props);
  }

  // this.cash           = cash;
  // this.portfolioValue = portfolioValue;
  // this.totalValue     = this.cash + this.portfolioValue;
  // this.pendingProfit  = pendingProfit;
  // this.profit         = profit;

  render(){
    return <div className="divContainerWallet">
            <div>
              <div></div><div>{this.props.walletEntity.cash}</div>
            </div>
            <div>
              <div></div><div>{this.props.walletEntity.portfolioValue}</div>
            </div>
            <div>
              <div></div><div>{this.props.walletEntity.totalValue}</div>
            </div>
            <div>
              <div></div><div>{this.props.walletEntity.pendingProfit}</div>
            </div>
            <div>
              <div></div><div>{this.props.walletEntity.profit}</div>
            </div>
            <div>
              <div>
                Cash <input type="number" min="0" />
              </div>
              <div>
                <button>Add</button>
                <button>Withdraw</button>
              </div>
            </div>
          </div>
  }

}

export default WalletComponent;
