// requires websocket
var ws = require('websocket-server')
var http = require('http')
var sys = require('sys')

var httpServer = http.createServer(function(req, res){
  console.log("REQUEST: " + sys.inspect(req.headers))
  console.log("RESPONSE: " + sys.inspect(res.headers))
})

var server = ws.createServer(httpServer)

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
    console.log(msg)
    doubler.num = msg
  })
})

server.listen(3030)

function Doubler(num){
  this.num = num
  
  this.doubleIt = function(){
    return this.num *= 2
  }
}
