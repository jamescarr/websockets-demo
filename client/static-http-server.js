var express = require('express')
var fs = require('fs')

var app = express.createServer()

app.get('/', function(req, res){
  fs.readFile(__dirname + '/index.html', function(err, data){
    res.send(data, {"Content-Type":"text/html"})
  })
})

app.get('/client.js', function(req, res){
  fs.readFile(__dirname + '/client.js', function(err, data){
    res.send(data, {"Content-Type":"application/javascript"})
  })
})

app.listen(3000, function(){
  console.log("server started on port 3000")
})
