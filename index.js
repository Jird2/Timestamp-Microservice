// index.js
// where your node app starts

// init project
require('dotenv').config()
const express = require('express');
const mongoose = require("mongoose");
const path = require('path');
const app = express();
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static(path.join(__dirname, 'public')));


// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});
app.get("/api/:date?", async(req,res) => {
  var {
    date
  } = req.params;
  var obj;
  if (!date) {
    obj = new Date();
  }
  else if (/^\d+$/.test(date)) {
    obj = new Date(+date);
  }
  else {
    obj = new Date(date);
  }
  if (obj.toString() === "Invalid Date") {
    return res.json({error: "Invalid Date"});
  }
  const result = {unix: obj.getTime(), utc: obj.toUTCString()};
  res.json(result);
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
