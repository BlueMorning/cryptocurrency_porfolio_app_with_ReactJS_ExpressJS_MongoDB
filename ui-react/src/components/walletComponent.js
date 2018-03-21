import React, {Component} from 'react';
import MathHelper from './../helpers/mathHelper';

class WalletComponent extends Component {

  constructor(props){
    super(props);

    this.mathHelper = new MathHelper();

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
            <div className="rowWallet">
              <div className="labelWallet">Cash</div><div className="valueWallet">$ {this.mathHelper.precisionRound(this.props.walletEntity.cash, 2)}</div>
            </div>
            <div className="rowWallet">
              <div className="labelWallet">Portfolio value</div><div className="valueWallet">$ {this.mathHelper.precisionRound(this.props.walletEntity.portfolioValue, 2)}</div>
            </div>
            <div className="rowWallet">
              <div className="labelWallet">Total value</div><div className="valueWallet">$ {this.mathHelper.precisionRound(this.props.walletEntity.totalValue, 2)}</div>
            </div>
            <div className="rowWallet">
              <div className="labelWallet">Pending profit</div><div className="valueWallet">$ {this.mathHelper.precisionRound(this.props.walletEntity.pendingProfit, 2)}</div>
            </div>
            <div className="rowWallet">
              <div className="labelWallet">Profit made</div><div className="valueWallet">$ {this.mathHelper.precisionRound(this.props.walletEntity.profit, 2)}</div>
            </div>
            <div className="rowWallet">
              <div className="labelWallet">
                Cash $<input type="number"
                             min="0"
                             value={this.state.cashAmount}
                             onChange={this.handleCashChange}
                             className="cashInput"/>
              </div>
              <div className="cashActions">
                <button className="button-green" onClick={this.handleAddCash}>Add</button>
                <button className="button-red" onClick={this.handleWithdrawCash}>Withdraw</button>
              </div>
            </div>
          </div>
  }

}

export default WalletComponent;
