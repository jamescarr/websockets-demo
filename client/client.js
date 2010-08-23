$(function(){
  var logger = new Logger($('#console'))
  var socket = createSocket(logger)
  
  $('#numbertosend').keyup(function(){
    var value = $(this).val()
    socket.send(value)
    logger.log("[MSG SENT] " + value)
    $(this).val("")
  })
  
  $('#close').click(function(){
    socket.close()
  })
  $('#open').click(function(){
    socket = createSocket(logger)
  })
  $('#clear').click(function(){
    logger.clear()
  })
})

function createSocket(logger){
  var socket = new WebSocket("ws://localhost:3030/")
  socket.onopen = function(){ logger.log("[CONNECTION OPENED]") }
  socket.onmessage = function(e){ logger.log("[MSG RECVD]" + e.data) }
  socket.onclose = function(e){ logger.log("[CONNECTION CLOSED]"); console.log(e) }
  socket.onerror = function(e){ logger.log(e) }
  return socket
}

function Logger(panel){
  this.panel = panel
}

Logger.prototype.log = function(msg){
  this.panel.append(msg + "\n")
}
Logger.prototype.clear = function(){
  this.panel.text("")
}
