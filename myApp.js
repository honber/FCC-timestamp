
var express = require('express');
var app = express();

function checkDateFormat(string){
  var dateRegex = /^\d+-\d\d?-\d\d?$/;
  var milisecondsRegex = /^\d+\.?\d+$/;
  
  if (dateRegex.test(string)===true){
    return 'date'
  }
  else if (milisecondsRegex.test(string) === true){
    return 'miliseconds'
  }
  else{
    return 'invalid format'
  } 
}

app.get('/api/timestamp/:date', function(req, res){
  var receivedDate = req.params.date;
  
  switch (checkDateFormat(receivedDate)){
    case 'date': 
      if (new Date(receivedDate).toString() === 'Invalid Date'){
        res.json({
        "error": "Invalid Date"
        })
      }
      else{
        res.json({
        "unix": new Date(receivedDate).getTime(),
        "utc": new Date(receivedDate).toUTCString()
        }) 
      } 
      break;
    case 'miliseconds':
      if (new Date(receivedDate).toString() === 'Invalid Date'){
        res.json({
        "error": "Invalid Date"
        })
      }
      else{
        res.json({
        "unix": Math.round(receivedDate),
        "utc": new Date(Math.round(receivedDate)).toUTCString()
        })      
      }
      break;
    default:
      res.json({
        "error": "Invalid Date"
      })
  }
})  
  

app.get('/api/timestamp', function(req, res){
  res.json({
    "unix": new Date().getTime(),
    "utc": new Date().toUTCString()
  })
})

 module.exports = app;
