const MongoClient         = require('mongodb').MongoClient;
const assert              = require('assert');
const WalletEntity        = require('./../entities/walletEntity');
const CurrencyAPIRequest  = require('./../requests/currencyAPIRequest');

class DatabasePortfolioModel {


  constructor(){
    this.url    = 'mongodb://localhost:27017';
    this.dbName = 'currency_portfolio';

    this.collectionCurrencyReference    = "currency_references";
    this.collectionCurrencyAdmin        = "currency_admin";
    this.collectionCurrencyPortfolio    = "currency_portfolio";
    this.collectionCurrencyWallet       = "currency_wallet";

    this.onMakeCurrencyTransactionDone  = null;

  }

  connect(callback){
    if(true || this.db == null || ! this.db.connected){
      MongoClient.connect(this.url, (err, client) => {
        assert.equal(null, err);
        console.log("Connected successfully to MongoDB");
        this.db = client.db(this.dbName);
        callback();
      });
    }
    else{
      callback();
    }
  }

  close(){
    if(this.db != null){
      this.db.close();
    }
  }

  insertCurrencyReferences(currencyEntities){
    this.connect(() => {
      if(Array.isArray(currencyEntities) && currencyEntities.length > 0){
        currencyEntities.forEach((currency) => {
          this.db.collection(this.collectionCurrencyReference).insertOne(
            {
              coinId:     currency.coinId,
              coinSymbol: currency.coinSymbol,
              coinName:   currency.coinName,
              coinImage:  currency.coinImage
            }
            , function(err, r){
            assert.equal(null, err);
            assert.equal(1, r.insertedCount);
          })
        })
      }
      this.close();
    })
  }

  getAllCurrenciesReferences(callback){
    this.connect(() => {
      this.db.collection(this.collectionCurrencyReference).find().toArray(function(err, result){
        callback(result);
      });
    })
  }

  getCurrenciesReferencesByCoinName(coinNameFilter, resultLimit, callback){
    this.connect(() => {

      let query = {}

      if(coinNameFilter != null && coinNameFilter != ""){
        query = {coinName: {'$regex': `^${coinNameFilter}`,'$options' : 'i'}}
      }


      this.db.collection(this.collectionCurrencyReference).find(query).limit(resultLimit).toArray(function(err, result){
        callback(result);
      });
    })
  }

  checkCurrencyReferencesExist(callback){
    this.connect(() => {
      this.db.collection(this.collectionCurrencyReference).find().toArray(function(err, result){
        callback(result.length > 0);
      })
    });
  }


  makeCurrencyTransaction(transactionType, currencyEntity, quantity){
    this.connect(() => {
      this.db.collection(this.collectionCurrencyPortfolio).find({coinSymbol: currencyEntity.coinSymbol}).toArray((err, result) => {


          let currencyPortfolio           = {};

          let profitMade                  = 0;
          let purchasePrice               = 0;
          let salePrice                   = 0;
          let coinPurchaseAveragePrice    = 0;

          if(Array.isArray(result) && result.length > 0){
            currencyPortfolio        = result[0];
          }
          else{
            currencyPortfolio.quantity      = 0;
            currencyPortfolio.totalPrice    = 0;
            currencyPortfolio.averagePrice  = 0;
          }

          quantity                 = parseInt(quantity);
          currencyEntity.coinPrice = parseFloat(currencyEntity.coinPrice);

          if(transactionType == 1){
            currencyPortfolio.quantity   += quantity;
            currencyPortfolio.totalPrice += quantity * currencyEntity.coinPrice;
            purchasePrice                 = quantity * currencyEntity.coinPrice;
          }
          else{
            currencyPortfolio.quantity   -= quantity;
            currencyPortfolio.totalPrice -= quantity * currencyEntity.coinPrice;
            salePrice                     = quantity * currencyEntity.coinPrice;
            profitMade                    = (currencyEntity.coinPrice - currencyPortfolio.averagePrice) * quantity;
          }

          currencyPortfolio.averagePrice  = parseFloat(currencyPortfolio.totalPrice) / parseFloat(currencyPortfolio.quantity);


          if(currencyPortfolio._id !== undefined){
            this.db.collection(this.collectionCurrencyPortfolio).updateOne(
              {_id:           currencyPortfolio._id},
              { $set:
                {
                  quantity:      currencyPortfolio.quantity,
                  totalPrice:    currencyPortfolio.totalPrice,
                  averagePrice:  currencyPortfolio.averagePrice}
                },
              function(err, res){
                this.updateWalletCashAndProfit(purchasePrice, salePrice, profitMade);
                this.close();
              }.bind(this))
          }
          else {
            this.db.collection(this.collectionCurrencyPortfolio).insertOne(
              { coinSymbol:    currencyEntity.coinSymbol,
                quantity:      currencyPortfolio.quantity,
                totalPrice:    currencyPortfolio.totalPrice,
                averagePrice:  currencyPortfolio.averagePrice},
                function(err, res){
                  this.updateWalletCashAndProfit(purchasePrice, salePrice, profitMade);
                  this.close();
                }.bind(this))
          }

          this.onMakeCurrencyTransactionDone(currencyPortfolio);

        })
      })
    }

    updateWalletCashAndProfit(purchasePrice, salePrice, profitMade){
        this.connect(() => {

          this.db.collection(this.collectionCurrencyWallet).findOne({}, (err, res) => {

            let walletEntity = new WalletEntity();
            if(res !== null){
              walletEntity = res;
            }
            else {
              walletEntity.cash   = 0;
              walletEntity.profit = 0;
            }

            walletEntity.cash   -= purchasePrice;
            walletEntity.cash   += salePrice;
            walletEntity.profit += profitMade;

            if(walletEntity._id !== undefined){
              this.db.collection(this.collectionCurrencyWallet).updateOne(
                {_id: walletEntity._id},
                {$set: {
                        cash: walletEntity.cash,
                        profit: walletEntity.profit}
                }, function(err, res){
                    this.updateWalletValues();
                  }.bind(this)
                )
            }
            else{
              this.db.collection(this.collectionCurrencyWallet).insertOne(
                {
                  cash: walletEntity.cash,
                  profit: walletEntity.profit,
                  portfolioValue: 0,
                  totalValue: 0,
                  pendingProfit: 0,
                  profit: 0
                }, function(err, res){

                  this.updateWalletValues();
                }.bind(this)
              )
            }

            this.close();
          })
        })
    }

    updateWalletValues(callback){
      this.connect(() => {

          this.db.collection(this.collectionCurrencyWallet).findOne({}, (err, res) => {

              let walletEntity = res;

              this.calculatePortfolioPurchaseValue((portfolioPurchaseValue) => {

                  this.calculatePortfolioCurrentValue((portfolioCurrentValue) => {

                    walletEntity.portfolioValue = portfolioCurrentValue;
                    walletEntity.pendingProfit  = portfolioCurrentValue - portfolioPurchaseValue;
                    walletEntity.totalValue     = portfolioCurrentValue + walletEntity.cash;
                    this.db.collection(this.collectionCurrencyWallet).updateOne({_id: walletEntity._id}, walletEntity, function(err, res){
                      this.close();
                      if(callback != null && callback != undefined){
                        callback(walletEntity);
                      }
                    }.bind(this));
                  })
              })
        })
      })
    }

    calculatePortfolioPurchaseValue(callback){

      this.connect(() => {

        this.db.collection(this.collectionCurrencyPortfolio).find().toArray((err, portfolioCurrencies) => {

          let totalPurchaseValue = portfolioCurrencies.reduce((totalPrice, portfolioCurrency) => {
            return totalPrice + portfolioCurrency.totalPrice;
          }, 0);

          callback(totalPurchaseValue);
          this.close();
        })
      })
    }

    calculatePortfolioCurrentValue(callback){
      this.connect(() => {
        this.db.collection(this.collectionCurrencyPortfolio).find().toArray((err, portfolioCurrencies) => {

          let coinNames = "";
          portfolioCurrencies.forEach((currencyPortfolio) => {
            coinNames += currencyPortfolio.coinSymbol + ",";
          })

          coinNames              = coinNames.substring(0, coinNames.length-1);
          let currencyAPIRequest = new CurrencyAPIRequest();
          currencyAPIRequest.onRequestGetCurrencyDataList = function(currenciesJSONList){

            let portfolioCurrentValue = 0;
            portfolioCurrencies.forEach((currencyPortfolio) => {
              portfolioCurrentValue += (currencyPortfolio.quantity * currenciesJSONList["RAW"][currencyPortfolio.coinSymbol]["USD"]["PRICE"])
              console.log("quantity :"+currencyPortfolio.quantity);
              console.log("price :"+currenciesJSONList["RAW"][currencyPortfolio.coinSymbol]["USD"]["PRICE"]);
            })

            callback(portfolioCurrentValue);

          }.bind(this)

          currencyAPIRequest.requestCurrencyDataList(coinNames);
        })
      })
    }


    getWalletEntity(callback){
        this.connect(() => {
          this.db.collection(this.collectionCurrencyWallet).findOne({}, (err, walletEntity) => {
            callback(walletEntity);
        })
      })
    }

    addCashToWallet(cashAmount, callBack){
      this.connect(() => {
        this.db.collection(this.collectionCurrencyWallet).findOne({}, (err, walletEntity) => {
          walletEntity.cash += cashAmount;
          this.db.collection(this.collectionCurrencyWallet).updateOne({_id: walletEntity._id},
                                                                      {$set: {cash: walletEntity.cash}},
                                                                      (err, walletEntity) => {
              this.updateWalletValues(callBack);
          })
        })
      })
    }

    withdrawCashFromWallet(cashAmount, callBack){
      this.connect(() => {
        this.db.collection(this.collectionCurrencyWallet).findOne({}, (err, walletEntity) => {
          walletEntity.cash -= cashAmount;
          this.db.collection(this.collectionCurrencyWallet).updateOne({_id: walletEntity._id},
                                                                      {$set: {cash: walletEntity.cash}},
                                                                      (err, walletEntity) => {
              this.updateWalletValues(callBack);
          })
        })
      })
    }

    getCurrencyPortfolio(callback){
      this.connect(() => {
        this.db.collection(this.collectionCurrencyPortfolio).find().toArray((err, portfolioCurrencies) => {
          callback(portfolioCurrencies);
        })
      })
    }

  }

module.exports = DatabasePortfolioModel;
