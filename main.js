import {Parser} from 'binary-parser';
const dgram = require('dgram');
const server = dgram.createSocket('udp4');

const HOST = '0.0.0.0';
const PORT = 20777;

server.on('error', (err) => {
    console.log(`server error:\n${err.stack}`);
    server.close();
});

server.on('message', (msg, rinfo) => {
    console.log(`server got: ${parse(msg)} from ${rinfo.address}:${rinfo.port}`);
});

server.on('listening', () => {
    const address = server.address();
    console.log(`server listening ${address.address}:${address.port}`);
});

server.bind({
    address: HOST,
    port: PORT,
    exclusive: true
});