import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket: any): void => {
    console.log(`${socket.id} connected`);

    socket.emit('connection', {
        data: {
            result: 'success',
            message: 'Hello from the server',
        }
    });

    socket.on('disconnect', (): void => {
        console.log(`${socket.id} disconnected`);
    });
});

const PORT: number = 3000;
server.listen(PORT, (): void => {
    console.log(`listening on *:${PORT}`);
});