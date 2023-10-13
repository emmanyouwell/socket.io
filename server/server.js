const express = require('express');
const app = express();
const http = require('http');
const {Server} = require('socket.io');
const cors = require('cors');

app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ['http://localhost:3000'],
    },
});

io.on('connection', socket =>{
    console.log(socket.id);

    socket.on('send', (data)=>{
        // socket.broadcast.emit('received', data);
    });

})

server.listen(4001, ()=>{
    console.log('SERVER IS RUNNING');
})