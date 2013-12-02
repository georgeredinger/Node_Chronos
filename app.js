var app = require('http').createServer(handler)
    , io = require('socket.io').listen(app)
    , fs = require('fs')
    , SerialPort = require("serialport").SerialPort
    , serialPort = new SerialPort("/dev/ttyACM0", {
baudrate: 115200
    });

    var start = new Buffer(['B',0xFF, 0x08, 0x07, 0x00, 0x00, 0x00, 0x00]);
    var request = new Buffer(['B',0xFF, 0x07, 0x03]);
    var result = new Buffer(8);

    function handler (req, res) {
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

    io.sockets.on('connection', function (socket) {
        server.on('message', function (message, remote) {
            console.log(remote.address + ':' + remote.port +' - ' + message);
            var accel =  {x:0,y:0};
            accel = JSON.parse(message);
            console.log(accel);
            socket.emit("accel",accel);
        });

    });

    serialPort.open(function () {
        console.log('open');
        serialPort.on('data', function(data) {
            console.log('data received: ' + data);
        });
        serialPort.write("ls\n", function(err, results) {
            console.log('err ' + err);
            console.log('results ' + results);
        });
    });



//   def startAccessPoint():$
//         return array.array('B', [0xFF, 0x07, 0x03]).tostring()$
//    
//    def accDataRequest():$
//         return array.array('B', [0xFF, 0x08, 0x07, 0x00, 0x00, 0x00, 0x00]).tostring()$
//         21 $
//           23 $
//            24  $
//             25 #Start access point$
//              26 ser.write(startAccessPoint())$
//               27  $
//                28  $
//                 29 while True:$
//                      30     #Send request for acceleration data$
//                           31     ser.write(accDataRequest())$
//                    32     accel = ser.read(7)$
//                     33     if(len(accel)>3):$
//                          34        if ord(accel[0]) != 0 and ord(accel[1]) != 0 and ord(accel[2]) != 0:$
//                               35          print "x: " + str(ord(accel[0])) + " y: " + str(ord(accel[1])) + " z: " + str(ord(accel[2]))$
//                        36    $
//                        37    $
//
