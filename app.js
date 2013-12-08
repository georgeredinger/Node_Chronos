#!/usr/bin/env node

var app = require('http').createServer(handler)
, io = require('socket.io').listen(app)
, fs = require('fs');

process.stdin.setEncoding('utf8');

process.stdin.resume();

 process.stdout.on('error', function epipeFilter(err) {
 	if (err.code === 'EPIPE') return process.exit();
 		// If there's more than one error handler (ie, us), then the error won't be bubbled up anyway
 		if (process.stdout.listeners('error').length <= 1) {
 			process.stdout.removeAllListeners(); // Pretend we were never here
 			process.stdout.emit('error', err); // Then emit as if we were never here
 			process.stdout.on('error', epipeFilter); // Then reattach, ready for the next error!
 		}
 });


app.listen(3000);




function handler (req, res) {
        if(req.url == "/smoothie.js") {
                fs.readFile(__dirname + '/smoothie.js',
                                                                function (err, data) {
                                                                        if (err) {
                                                                                res.writeHead(500);
                                                                                return res.end('Error loading index.html');
                                                                        }

                                                                        res.writeHead(200);
                                                                        res.end(data);
                                                                });
        } else {
                fs.readFile(__dirname + '/index.html',
                                                                function (err, data) {
                                                                        if (err) {
                                                                                res.writeHead(500);
                                                                                return res.end('Error loading index.html');
                                                                        }

                                                                        res.writeHead(200);
                                                                        res.end(data);
                                                                });
        }
}




io.sockets.on('connection', function (socket) {
	console.log("got socket connection");
	process.stdin.on('data', function(data) {
		console.log("raw:"+data);
		var accel =  {x:0,y:0,z:0};
		accel = JSON.parse(data);
		console.log("cooked:"+accel);
		socket.emit("accel",accel);
	});
});



 function getRan() {
   return Math.random() * (255);
   }

