import React, {Component} from 'react';


class FormSearchForCurrencies extends Component
{

  constructor(props)
  {
    super(props);

    this.state = {
      searchName: "", isLockOnPortfolio: false};

    this.handleInputCurrencyNameChanged = this.handleInputCurrencyNameChanged.bind(this);
    this.handleLockOnPortforlioChanged  = this.handleLockOnPortforlioChanged.bind(this);
    this.handleClearSearch              = this.handleClearSearch.bind(this);
    this.handleResetPortfolio           = this.handleResetPortfolio.bind(this);
    this.handleIsLiveDataActivated      = this.handleIsLiveDataActivated.bind(this);
  }


  handleInputCurrencyNameChanged(event){
    this.setState({searchName: event.target.value}, () => {
      this.props.onSearchForCurrencies(this.state.searchName, this.state.isLockOnPortfolio);
    });

  }

  handleLockOnPortforlioChanged(event){
    this.setState({isLockOnPortfolio: event.target.checked}, () => {
      this.props.onSearchForCurrencies(this.state.searchName, this.state.isLockOnPortfolio);
    });

  }

  handleClearSearch(event){
    this.setState({searchName: ""}, () => {
      this.props.onSearchForCurrencies(this.state.searchName, this.state.isLockOnPortfolio);
    });
  }

  handleResetPortfolio(){
    this.props.onResetPortfolio();
  }

  handleIsLiveDataActivated(event){
    this.props.onLiveDataActivated(event.target.checked);
  }

  render(){
    return (<div className="divformHeader">
              <div className="divformSearchForCurrencies">
                <input type="text" value={this.state.searchName} onChange={this.handleInputCurrencyNameChanged} placeholder="Search for crypto-currencies"/>
                <button className="button-blue-clear-search" onClick={this.handleClearSearch}>Clear Search</button>
                <label className="labelLockPortfolio">Your portfolio only (Off/On)</label>
                <label className="switch">
                  <input type="checkbox" value={this.state.isLockOnPortfolio} onClick={this.handleLockOnPortforlioChanged}/>
                  <span className="slider round"></span>
                </label>
                <label className="labelIsDataLive">Live Data (Off/On)</label>
                <label className="switch">
                  <input type="checkbox" value={this.state.isLiveDataActivated} onClick={this.handleIsLiveDataActivated}/>
                  <span className="slider round"></span>
                </label>
              </div>
              <div>
                <button className="button-red-reset" onClick={this.handleResetPortfolio}>Reset Portfolio</button>
              </div>
            </div>)
  }

}


export default FormSearchForCurrencies;
