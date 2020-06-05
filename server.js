'use strict';

var express = require('express');
var cors = require('cors');
const multer = require('multer');
// require and use "multer"...
var upload = multer({ dest: './public' });
var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });


// I can submit a form that includes a file upload.
// The form file input field has the "name" attribute set to "upfile". We rely on this in testing.
// When I submit something, I will receive the file name and size in bytes within the JSON response


app.route('/api/fileanalyse')
.post(upload.single('upfile'),(req, res) => {
  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size,
  })
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
