const path = require('path');
const fs = require('fs');
const express = require('express')
const route = express.Router()

const askPath = path.join(__dirname, '../../public/ask.html')
route.get('/',(req, res)=>{
  res.status(200).sendFile(askPath)
})

module.exports = route;
