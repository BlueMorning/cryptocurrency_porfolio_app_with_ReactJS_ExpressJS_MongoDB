const express = require('express');
const app     = express();



app.get('/api/hello', (req, res) => {
  res.json({message: "Welcome to the portfolio API"});
})


const port = process.env.port || 3001;
app.listen(port, () => {
  console.log("React Express Portfolio App listening on port "+ port);
})
