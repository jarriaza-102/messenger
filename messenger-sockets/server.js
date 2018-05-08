var app = require('./app');
var port = process.env.PORT || 3000;
var server = require('http').createServer(app);

server.listen(port, function() {
	console.log('Express server listening on port ' + port);
});

var io = require('socket.io')(server);
var clients = {};
io.on('connection', function(socket){
	console.log('----------');
	var userId = socket.handshake.query.idUser;
	console.log(userId);

	socket.on('login', function(msg){
		console.log('login');
		io.emit('login', msg);
	});

	socket.on('notification', function(msg){
		io.emit('notification', msg);
	});

	if (userId !== undefined) {
		clients[userId] = socket;

		console.log(io.sockets.connected[clients['1'].id].id);

		socket.on('message', function(msg){
			io.emit('message', msg);
		});

		socket.on('logout', function(msg){
			console.log('logout');
			io.emit('logout', msg);
			delete clients[userId];
		});

	}


	socket.on('disconnected', function(){
		delete clients[userId];
	});

});