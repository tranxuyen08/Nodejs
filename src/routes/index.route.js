const path = require('path');
const fs = require('fs');
const express = require('express')
const route = express.Router()
const databasePath = path.join(__dirname,'../../public/index.js')
route
  .route('/:id')
  .put((req,res) =>{
    fs.readFile(databasePath, 'utf-8', (err, data) => {

    })
  })