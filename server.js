// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
const { json } = require('express');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/timestamp.html');
});

app.get("/api/timestamp/", function (req, res) {
  var now = new Date();
  res.json({
    "unix": now.getTime(),
    "utc": now.toUTCString()
  });
})

app.get("/api/timestamp/:date_string", function (req, res) {
  var dateString = req.params.date_string;
  var givenValue = new Date(dateString);
  var uN = new Date(parseInt(dateString)).getTime();
  console.log(dateString, "<- Date String", givenValue, "<= Given Value", uN, "<= Unix")
  if (parseInt(dateString) > 10000) {
    res.json({
      "unix": new Date(parseInt(dateString)).getTime(),
      "utc": new Date(parseInt(dateString)).toUTCString()
    });
  } else if (givenValue == "Invalid Date") {
    res.json({"error": "Invalid Date"});
  } else {
    res.json({
      "unix": givenValue.getTime(),
      "utc": givenValue.toUTCString()
    });
  }
})



// listen for requests :)
var listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
