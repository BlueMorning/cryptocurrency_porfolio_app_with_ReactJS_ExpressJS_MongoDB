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

  render(){
    return (<div className="divformSearchForCurrencies">
              <input type="text" value={this.state.searchName} onChange={this.handleInputCurrencyNameChanged} placeholder="Search for crypto-currencies"/>
              <button className="button-blue-clear-search" onClick={this.handleClearSearch}>Clear Search</button>
              <label className="labelLockPortfolio">Your portfolio only :</label>
              <label className="switch">
                <input type="checkbox" value={this.state.isLockOnPortfolio} onClick={this.handleLockOnPortforlioChanged}/>
                <span className="slider round"></span>
              </label>
            </div>)
  }

}


export default FormSearchForCurrencies;
