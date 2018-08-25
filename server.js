'use strict';
require('dotenv').config()

const dns = require('dns')
var express = require('express');
var mongo = require('mongodb');
var mongoose = require('mongoose');

mongoose.Promise = Promise

const bodyParser = require('body-parser')

var cors = require('cors');

var app = express();

// Basic Configuration 
var port = process.env.PORT || 3000;

/** this project needs a db !! **/ 
mongoose.connect(process.env.MONGOLAB_URI);

const URLSchema = new mongoose.Schema({
  url: { type: String, required: true }
})

const URLModel = mongoose.model('UrlModel', URLSchema)

app.use(cors());

/** this project needs to parse POST bodies **/
// you should mount the body-parser here
app.use(bodyParser.urlencoded({extended: false}))

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res){
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/shorturl/new', (req, res) => {
  const { body: url  } = req
  console.log(url.url)

  dns.lookup(url.url, (err, address) => {
    if ( err ) {
      console.log(err)
       return res.json({error: "Invalid url"})
    }
    console.log(address)
    res.end()
  })
})


app.listen(port, function () {
  console.clear()
  console.log('Node.js listening ...');
});