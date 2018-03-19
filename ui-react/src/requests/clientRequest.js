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
}

module.exports = ClientRequest;
