var express = require('express');
var cors = require('cors');
var multer = require('multer');
require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// multer().single("") is used to accept a single file with the name attribute "upfile". stored in req.file
app.post('/api/fileanalyse', multer().single("upfile"), (req, res) => {
  let {originalname, mimetype ,size} = req.file;
  res.status(200).json({"name": originalname, "type": mimetype, "size": size + " bytes"});
});
// No options for multer() since we do not need to save the file on the disk.

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
