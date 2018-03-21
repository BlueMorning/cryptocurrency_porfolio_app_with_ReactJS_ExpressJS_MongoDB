import React, {Component} from 'react';


class WalletComponent extends Component {

  constructor(props){
    super(props);

    this.state ={
      cashAmount: 0
    }

    this.handleCashChange   = this.handleCashChange.bind(this);
    this.handleAddCash      = this.handleAddCash.bind(this);
    this.handleWithdrawCash = this.handleWithdrawCash.bind(this);
  }

  handleCashChange(event){
    this.setState({cashAmount: parseInt(event.target.value)})
  }

  handleAddCash(event){
    this.props.addCash(this.state.cashAmount);
    this.setState({cashAmount: 0});
  }

  handleWithdrawCash(event){
    this.props.withdrawCash(this.state.cashAmount);
    this.setState({cashAmount: 0});
  }

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
                Cash <input type="number"
                            min="0"
                            value={this.state.cashAmount}
                            onChange={this.handleCashChange}/>
              </div>
              <div>
                <button onClick={this.handleAddCash}>Add</button>
                <button onClick={this.handleWithdrawCash}>Withdraw</button>
              </div>
            </div>
          </div>
  }

}

export default WalletComponent;
