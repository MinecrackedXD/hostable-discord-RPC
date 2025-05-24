const express = require('express');
const server = express();
 
server.all('/', (req, res) => {
  res.send(`Running RPC`)
})
 
function keepAlive() {
  server.listen(65535, () => { console.log("Server is Ready!!" + Date.now()) });
}
 
module.exports = keepAlive;