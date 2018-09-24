'use strict';

const net = require('net');

class Client {
  constructor(host, port) {
    this.socket = new net.Socket();
    this.host = host;
    this.port = port;
  }

  connect() {
    this.socket.connect(this.port, this.host, () => {});

    this.socket.on('close', () => {
      console.log('Client closed');
    });
  }

  destroy() {
    this.socket.destroy();
  }

  writeMessage(message) {
    return new Promise((resolve, reject) => {
      this.socket.write(`${message}\r\n`);

      this.socket.on('data', (data) => {
        resolve(data);
      });
      this.socket.on('error', (err) => {
        reject(err);
      });
    });
  }
}

module.exports = Client;