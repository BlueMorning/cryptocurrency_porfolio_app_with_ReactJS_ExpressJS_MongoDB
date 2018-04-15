const express     = require('express');
const server      = express();
const router      = require('./routes/index.js');
const path        = require('path');
const bodyParser  = require('body-parser');



server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));
server.use(express.static(path.join(__dirname, 'client/build')));


server.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

server.use(router);



const port = process.env.port || 3001;
server.listen(port, () => {
  console.log("React Express Portfolio App listening on port "+ port);
})
