//import {Parser} from 'binary-parser';
const dgram = require('dgram');
const server = dgram.createSocket('udp4');
const Parser = require('binary-parser').Parser

const HOST = '0.0.0.0';
const PORT = 20777;


const f1_packet_header = new Parser()
    .uint16le('m_packet_format')
    .uint8('m_gameMajorVersion')
    .uint8('m_gameMinorVersion')
    .uint8('m_packetVersion')
    .uint8('m_packetId');


const f1_packet = new Parser()
    .endianness("big")
    .bit4("version")
    .array("src", {
        type: "uint8",
        length: 4
        }
    ).array("dst", {
        type: "uint8",
        length: 4
    });

function parseHeader(message){
    return f1_packet_header.fromBuffer(message);
}

server.on('error', (err) => {
    console.log(`server error:\n${err.stack}`);
    server.close();
});

server.on('message', (msg, rinfo) => {
	// var message = JSON.parse(msg.toString('utf8'));
    var packetId = parseHeader()
    console.log(`server got: ${f1_packet.parse(msg)} from ${rinfo.address}:${rinfo.port}`);
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
