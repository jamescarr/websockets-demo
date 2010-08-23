// requires websocket-server 
var ws = require('websocket-server')
var http = require('http')
var sys = require('sys')

var server = ws.createServer(http.createServer())

server.addListener("listening", function(){
  console.log("listening for connections on 3030")
})

server.addListener("connection", function(conn){
  console.log("Connection made! " +conn.id)
  
  server.send(conn.id, "Connected! Connection id: " + conn.id)
  
  var doubler = new Doubler(2)
  setInterval(function(){
    server.send(conn.id, doubler.doubleIt()+"")
  }, 1000)
  
  conn.addListener('message', function(msg){
    doubler.num = msg
    //server.broadcast("Connection " + conn.id + " changed base number to " + msg)  
  })
  conn.addListener('close', function(){
    console.log('connection closed by client')
  })
})

server.listen(3030)

function Doubler(num){
  this.num = num
  
  this.doubleIt = function(){
    return this.num *= 2
  }
}
