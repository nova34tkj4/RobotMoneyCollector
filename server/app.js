const express = require('express')
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

const port = 3000

app.post('/collect-data', (req, res) => {
  try {
    console.log('Got body:', req.body);
    const {userId} = req.body;
    const dir = './json';

    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
    fs.writeFile (`json/${userId}.json`, JSON.stringify(req.body), function(err) {
      if (err) throw err;
        console.log('complete');
      }
  );
    res.send({
      status: "OK"
    })
  } catch (e) {
    console.error(e)
    res.send({
      status: "FAILED"
    })
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})