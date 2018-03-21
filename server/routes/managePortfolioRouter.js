const express                = require('express');
const CurrenciesModel        = require('./../models/currenciesModel');
const managePortfolioRouter  = new express.Router();


managePortfolioRouter.get("/searchForCurrencies", (req, res) => {
  const currenciesModel = new CurrenciesModel();
  currenciesModel.onRequestGetCurrencyDataList = function(currencies){
    res.send(currencies);
  }.bind(this);
  currenciesModel.searchForCurrencyDataList(req.query.coinName);

});

managePortfolioRouter.get("/wallet", (req, res) => {
  const currenciesModel = new CurrenciesModel();
  currenciesModel.getWalletEntity((walletEntiry) => {
    res.send(walletEntiry);
  })
});

managePortfolioRouter.get("/updateWallet", (req, res) => {
  const currenciesModel = new CurrenciesModel();
  currenciesModel.updateWalletValues((walletEntity) => {
    res.send(walletEntity);
  })
});

managePortfolioRouter.post("/currencyTransaction", (req, res) => {
  const currenciesModel = new CurrenciesModel();
  currenciesModel.onMakeCurrencyTransactionDone = function(currencyPortfolio){
    res.send(currencyPortfolio);
  }
  console.log(req.body);
  currenciesModel.makeCurrencyTransaction(req.body.transactionType, req.body.coinSymbol, parseInt(req.body.quantity));

});

managePortfolioRouter.post("/addCashToWallet", (req, res) => {
  const currenciesModel = new CurrenciesModel();
  currenciesModel.addCashToWallet(req.body.cashAmount, (walletEntity) => {
    res.send(walletEntity);
  });
})

managePortfolioRouter.post("/withdrawCashFromWallet", (req, res) => {
  const currenciesModel = new CurrenciesModel();
  currenciesModel.withdrawCashFromWallet(req.body.cashAmount, (walletEntity) => {
    res.send(walletEntity);
  });
})









module.exports = managePortfolioRouter;
