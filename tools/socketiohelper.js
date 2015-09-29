/**
 * Created by lee on 9/21/15.
 */
var io = require('socket.io'),
    redishelper = require("./redishelper");
SocketIO = function(server){
    io = io.listen(server);
    io.on('connection', function(socket) {
        //new user login
        socket.on('login', function(nickname) {
            socket.nickname = nickname;
            redishelper.StaticClass.redis_set(nickname,socket.id,function(err,result){
                if(err != null){
                socket.emit('error', err);
             }else{
                socket.emit('loginSuccess');
                };
             });
        });
        //user leaves
        socket.on('disconnect', function() {
            redishelper.StaticClass.redis_del(socket.nickname,function(err,result){
                if(err != null){
                    socket.emit('error', err);
                }else{
                    socket.broadcast.emit('system', socket.nickname, 'logout');
                }
            });
        });
        //new message get
        socket.on('postMsg', function(msg, color) {
            socket.broadcast.emit('newMsg', socket.nickname, msg, color);
        });
        //new image get
        socket.on('img', function(imgData, color) {
            socket.broadcast.emit('newImg', socket.nickname, imgData, color);
        });
        //private msg
        socket.on('private message',function(to, msg){
            redishelper.StaticClass.redis_get(to,function(err,result){
                if(err != null){
                    socket.emit('error', err);
                }else{
                    io.sockets.connected[result].emit('to',{msg:msg});
                };
            });
        });
    });

};
exports.SocketIO = SocketIO;