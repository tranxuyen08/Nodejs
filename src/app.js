const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs')
const port = 8000;
const questionRoute = require('../src/routes/questionDetail.route');
const askPath = require('./routes/ask.route');
const questionDetailPath = require('./routes/questionDetail.route')
// app.set('views', path.join(__dirname, 'src/views')); // Đường dẫn đến thư mục views
app.use(express.urlencoded());
app.use(express.static('public'))


app.get('/', (req, res) => {
  res.status(200).render('index');
});
app.use('/ask', askPath)
app.use('/question-detailPath', questionDetailPath)
app.use('/api/v1/question', questionRoute)

app.get('/api/v1/question/:id', (req, res) => {
  res.status(200).send('<h1>This is a question detail page</h1>')
})

app.get('/*', (req, res) => {
  res.status(200).send('<h1>PAGE NOT FOUND</h1>')
})


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
