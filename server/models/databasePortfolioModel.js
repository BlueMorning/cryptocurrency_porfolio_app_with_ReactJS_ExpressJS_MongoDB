const MongoClient = require('mongodb').MongoClient;
const assert      = require('assert');

class DatabasePortfolioModel {


  constructor(){
    this.url    = 'mongodb://localhost:27017';
    this.dbName = 'currency_portfolio';

    this.collectionCurrencyReference = "currency_references";

  }

  connect(callback){
    if(this.db == null){
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
        console.log(query);
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


}

module.exports = DatabasePortfolioModel;
