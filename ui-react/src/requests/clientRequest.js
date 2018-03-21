class ClientRequest {

    constructor(){
      this.urlBase = "http://localhost:3001";
      this.onSearchForCurrencies = null;
    }


    searchForCurrencies(coinName){

      let request = new XMLHttpRequest();

      request.open("GET", this.urlBase+"/searchForCurrencies?coinName="+coinName);
      request.addEventListener("load", () => {
        let currencyEntities = [];
        if(request.status === 200){
          currencyEntities = JSON.parse(request.response);
        }
        else{

        }

        this.onSearchForCurrencies(currencyEntities);
      });
      request.send();

    }

    buyCurrency(coinSymbol, quantity, callback){
      let request = new XMLHttpRequest();
      request.open("POST", this.urlBase + "/currencyTransaction");
      request.setRequestHeader("Content-Type", "application/json");
      request.addEventListener("load", () => {
        let currencyEntities = [];
        if(request.status === 200){
          callback(request.response);
        }
        else{
          callback(null)
        }
      });

      request.send(JSON.stringify({transactionType: 1, coinSymbol: coinSymbol, quantity: quantity}));
    }

    sellCurrency(coinSymbol, quantity, callback){
      let request = new XMLHttpRequest();
      request.open("POST", this.urlBase + "/currencyTransaction");
      request.setRequestHeader("Content-Type", "application/json");
      request.addEventListener("load", () => {
        let currencyEntities = [];
        if(request.status === 200){
          callback(request.response);
        }
        else{
          callback(null)
        }
      });

      request.send(JSON.stringify({transactionType: 0, coinSymbol: coinSymbol, quantity: quantity}));
    }
}

module.exports = ClientRequest;
