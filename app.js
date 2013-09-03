var config = require("./config/config"),
    express = require('express'),       
    app = express(),    
    http = require("http"),
    server = app.listen(config.port),
    io = require('socket.io').listen(server),
    utils = require("./lib/utils");
    

app.configure(function(){
    
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    
    app.use(express.bodyParser());        
    app.use(express.methodOverride());
    
    app.use(express.static(__dirname + '/public'));
    app.use(express.logger('dev'));
    
}); 

var kisiler = [];

io.sockets.on('connection', function (socket) {
    
    socket.on('Giris', function (data){
        
        socket.kisi = {
            id:socket.id,
            nick:utils.removeTags(data),
            renk:utils.GetRandomColor()
            
        };
        
        kisiler.push(socket.kisi);
        
        io.sockets.emit('Giris',{kisi:socket.kisi, kisisayisi:kisiler.length });                     
        
    });   
    
    
    socket.on('MsjGonder', function (data) {             
        io.sockets.emit('MsjGoster', {kisi:socket.kisi, msj: utils.removeTags(data) });
    });
    
    socket.on('disconnect', function () {
        io.sockets.emit('Cikis', {kisi:socket.kisi});
        kisiler = utils.DelObjById(socket.id,kisiler);
    });
  
  
});    

app.get('/', function(req, res){
    res.render('index',  { ip : utils.getClientIp(req) } );    
});

console.log('Çayı koydu, dinleniyor : '+ config.port);

