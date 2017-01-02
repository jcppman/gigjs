const socket = io();

class Bus {
  constructor(namespace) {
    this.namespace = namespace;
  }
}

export default Bus;
