const express                = require('express');
const CurrenciesModel        = require('./../models/currenciesModel');
const managePortfolioRouter  = new express.Router();


managePortfolioRouter.get("/searchForCurrencies", (req, res) => {
  const currenciesModel = new CurrenciesModel();
  currenciesModel.onRequestGetCurrencyDataList = function(currencies){
    res.send(currencies);
  }.bind(this);
  currenciesModel.searchForCurrencyDataList(req.query.coinName);

})


managePortfolioRouter.post("/currencyTransaction", (req, res) => {
  const currenciesModel = new CurrenciesModel();
  currenciesModel.onMakeCurrencyTransactionDone = function(currencyPortfolio){
    res.send(currencyPortfolio);
  }
  currenciesModel.makeCurrencyTransaction(req.body.transactionType, req.body.coinSymbol, req.body.quantity);

})









module.exports = managePortfolioRouter;
