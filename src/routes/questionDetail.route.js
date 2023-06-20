const express = require('express')
const route = express.Router()
const path = require('path');
const checkUser = require('../middleware/checkUser')
const fs = require('fs')

const databasePath = path.join(__dirname, '../../data/questions.json');
const questionDetailPath = path.join(__dirname, '../../public/question-detail.html')
// route.get('/',(req, res)=>{
//   res.status(200).sendFile(questionDetailPath)
// })

route.get('/', (req, res) => {
  fs.readFile(databasePath, 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }
    const convertData = JSON.parse(data)
    res.status(200).json(convertData);
  })
})


route.post('/create', (req, res) => {
  fs.readFile(databasePath, 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
    const users = JSON.parse(data);
    res.status(200).json(users)
    const newUser = {
      id: Math.random().toString(36).substr(2, 9), // Tạo một ID ngẫu nhiên
      content: req.body.content,
      dislike: req.body.dislike,
      like: req.body.like
    };
    users.push(newUser)
    fs.writeFile(databasePath, JSON.stringify(users), 'utf-8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
        return;
      }
      res.status(200).json(users);
    })
  })
})

route
  .route('/:id')
  .get(checkUser,(req, res) => {
    fs.readFile(databasePath, 'utf-8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
        return;
      }
      const convertData = JSON.parse(data)
      const dataSearch = convertData.find((item) => item.id == req.params.id)
      res.status(200).json(dataSearch);
    })
  })
  .patch(checkUser,(req, res) => {
    fs.readFile(databasePath, 'utf-8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
        return;
      }
      const convertData = JSON.parse(data)
      const indexUser = convertData.findIndex((item) => item.id == req.params.id)
      if (convertData == -1) {
        res.status(404).send('User not found');
        return;
      }
      convertData[indexUser] = { ...convertData[indexUser], ...req.body }
      // console.log('convertData', convertData);

      fs.writeFile(databasePath, JSON.stringify(convertData), 'utf-8', (err) => {
        if (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
          return;
        }
        res.status(200).json(convertData);
      })
    })
  })
  .delete(checkUser,(req, res) =>{
    fs.readFile(databasePath,checkUser(), 'utf-8', (err,data) =>{
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      }
      const convertData = JSON.parse(data)
      const newData = convertData.filter((item) =>item.id != req.params.id)
      console.log(newData);
      fs.writeFile(databasePath, JSON.stringify(newData), 'utf-8', (err) =>{
        if (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
          return;
        }
        res.status(200).json(newData)
      })
    })
  })


module.exports = route