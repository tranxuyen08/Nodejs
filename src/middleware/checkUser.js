const path = require('path')
const fs = require('fs');

const databasePath = path.join(__dirname, '../../data/questions.json')
function checkUser(req, res, next) {
  fs.readFile(databasePath, 'utf-8', (err, data) => {
    const convertData = JSON.parse(data)
    const findUser = convertData.find((item) => item.id == req.params.id)
    console.log(1111111,req.params.id);
    if (!findUser) {
      res.send("<h1>User Not Found</h1>")
    }
    next()
  })
}
module.exports = checkUser