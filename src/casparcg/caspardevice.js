'use strict';

const General = require('../general');
const Client = require('../general/client');

class CasparDevice {
  constructor(host, port, shaddow = false) {
    this.guid = General.guid();
    this.host = host;
    this.port = port;
    this.socket = new Client(host, port);
    this.response = "";
    this.error = "";
    this.props = {
      active: true,
      channels: [],
      connected: false,
      shaddow: shaddow,
      version: null,
    }
  }

  async connect() {
    if (this.socket) {
      this.socket.connect();
      this.props.connected = true;

      await this.socket.writeMessage('VERSION SERVER')
        .then((version) => {
          this.props.version = version.toString().split('\r\n').slice(1).shift();
        })
        .catch((err) => {
          this.error = err.toString();
        })

      await this.socket.writeMessage('INFO')
        .then((info) => {
          this.props.channels = info.toString().split('\r\n').slice(1).filter(Boolean);
        })
        .catch((err) => {
          this.error = err.toString();
        })

      return {
        version: this.props.version,
        channels: this.props.channels
      }
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.destroy();
      this.props.connected = false;
    }
  }

  async writeMessage(commandString) {
    console.log(this.socket);

    if (this.socket) {
      await this.socket.writeMessage(commandString)
        .then((response) => {
          this.response = response.toString().split('\r\n').filter(Boolean).toString();
        })
        .catch((err) => {
          this.error = err.toString();
        })

      return this.response;
    } else {
      console.log("bla")
    }
  }
}

module.exports = CasparDevice;