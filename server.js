'use strict';
require('dotenv').config()

const dns = require('dns')
var express = require('express');
var mongo = require('mongodb');
var mongoose = require('mongoose');

const utils = require('./utils')

mongoose.Promise = Promise

const bodyParser = require('body-parser')

var cors = require('cors');

var app = express();

// Basic Configuration 
var port = process.env.PORT || 3000;

/** this project needs a db !! **/ 
mongoose.connect(process.env.MONGOLAB_URI);
const db = mongoose.connection

const URLSchema = new mongoose.Schema({
  url: { type: String, required: true }
})

const URLModel = mongoose.model('UrlModel', URLSchema)

app.use(cors());

/** this project needs to parse POST bodies **/
// you should mount the body-parser here
app.use(bodyParser.urlencoded({extended: false}))

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(_, res){
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/shorturl/new', async (req, res) => {
  const { body: { url } } = req
  
  console.log('got post request', url)
  // Try to validate url
  console.log('try to validate url')
  utils.validateUrl(url)
    .then( async () => {
      // look for record with same url
      const foundRecord = await URLModel.findOne({url})
      if ( foundRecord !== null ) {
        return res.json({original_url: url, short_url: foundRecord._id })
      } else {
        const newRecord = new URLModel({url})
        await newRecord.save()
        return res.json({original_url: url, short_url: newRecord._id})
      }
    })
    .catch(err => {
      console.log(err)
      res.send(err)
    })
})


app.listen(port, function () {
  console.clear()
  console.log('Node.js listening ...');
});