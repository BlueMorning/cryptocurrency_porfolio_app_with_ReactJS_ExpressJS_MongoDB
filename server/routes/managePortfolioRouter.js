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










module.exports = managePortfolioRouter;
