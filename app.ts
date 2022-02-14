import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = 3000;

io.on('connection', (client: any): void => {

    io.emit('join', `${client.handshake.query.name} 님이 접속했습니다.`);
    console.log(`${client.handshake.query.name} 님이 접속했습니다.`);

    client.on('disconnect', () => {
        console.log(`${client.handshake.query.name} 님이 접속을 종료했습니다.`)
        io.emit('left', `${client.handshake.query.name} 님이 접속을 종료했습니다.`);
    });

    client.on('message', (str: string) => {
        console.log(str);
        client.broadcast.emit('message', str);
    });

});

server.listen(PORT, (): void => {
    console.log(`listening on *:${PORT}`);
});