import React, {Component} from 'react';


class FormSearchForCurrencies extends Component
{

  constructor(props)
  {
    super(props);
    this.handleInputCurrencyNameChanged = this.handleInputCurrencyNameChanged.bind(this);
  }


  handleInputCurrencyNameChanged(event){
    this.props.onSearchForCurrencies(event.target.value);
  }



  render(){
    return (<div>
      <input type="text" onChange={this.handleInputCurrencyNameChanged} placeholder="Search for crypto-currencies"/>
    </div>)
  }

}


export default FormSearchForCurrencies;
