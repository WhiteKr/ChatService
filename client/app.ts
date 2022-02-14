import { io } from 'socket.io-client';
import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const PORT = 3000;

rl.question('이름을 입력하세요: ', (name: string): void => {
    const socket = io(`http://localhost:${PORT}?name=${name}`);

    socket.on('join', (str: string): void => {
        console.log(str);
    });
    socket.on('left', (str: string): void => {
        console.log(str);
    });
    socket.on('message', (str: string): void => {
        console.log(str);
    });

    rl.on('line', (string: string): void => {
        if (string == '') return;
        socket.emit('message', `${name}: ${string}`);
        rl.prompt();
    });

    socket.on('connect_timeout', (err: any): void => {
        console.log(err);
    });
    socket.on('connect_error', (err: any): void => {
        console.log(err);
    });
});