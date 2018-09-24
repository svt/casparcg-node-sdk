'use strict';
const CasparDevice = require('./CasparDevice'),
  General = require('../General');

class CasparDeviceContainer {
  constructor(name, host, port, shaddow = false) {
    this.guid = General.guid();
    this.name = name;
    this.casparClients = {};

    this.add(name, host, port, false);
  }

  add(name, host, port, shaddow = true) {
    this.casparClients[name] = new CasparDevice(host, port, shaddow);
  }

  remove(name) {
    if (this.casparClients[name]) {
      delete this.casparClients[name];
    }
  }

  swap(primary, shaddow) {
    var primaryCaspar = this.casparClients[primary];
    this.casparClients[primary] = this.casparClients[shaddow];
    this.casparClients[shaddow] = primaryCaspar;

    this.casparClients[primary].props.shaddow = false;
    this.casparClients[shaddow].props.shaddow = true;
  }

  list() {
    list = []
    for (var name in this.casparClients) {
      list.push(this.casparClients[name]);
    }

    return this.list
  }

  connect() {
    for (var name in this.casparClients) {
      this.casparClients[name].connect();
    };
  }

  disconnect() {
    for (var name in this.casparClients) {
      this.casparClients[name].socket.destroy();
    };
  }

  async writeMessage(commandString) {
    for (var name in this.casparClients) {
      await this.casparClients[name].writeMessage(commandString);
    };
  }
}

module.exports = CasparDeviceContainer;