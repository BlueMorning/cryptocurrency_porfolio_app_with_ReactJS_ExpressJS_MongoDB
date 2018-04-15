const express               = require('express');
const router                = new express.Router();
const managePortfolioRouter = require('./managePortfolioRouter');

router.use("/", managePortfolioRouter);


module.exports = router;
