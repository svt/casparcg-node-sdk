'use strict';

const net = require('net');

class CasparCG {
    constructor(ip, port) {
        
        this.ip = ip;
        this.port = port;
        this.connected = false;
        this.socket = new net.Socket();
    }

    connect() {
        if (this.socket) {
            if (this.socket.connect(this.port, this.ip)) {
                this.connected = true;
                this.writeMessage('VERSION SERVER');
            }
        }
    }

    disconnect() {
        if (this.socket && this.connected) {
            this.socket.destroy();
            this.connected = false;
        }
    }

    writeMessage(commandString) {
        if (this.socket) {
            this.socket.write(`${commandString}\r\n`)
        }
    }
}

module.exports = CasparCG;