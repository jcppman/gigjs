import React from 'react';
import uuid from 'uuid/v4';
import bus from './bus';

class Composer {
  constructor(Component, props) {
    this.component = Component;
    this.props = props;
    this.id = uuid();

    bus.on('pauseAll', () => {
      this.emit('pause');
    });
  }
  emit(event, ...payload) {
    bus.emit(`${this.id}-${event}`, ...payload);
  }
  pause() {
    return () => {
      this.emit('pause');
    };
  }
  play(resource) {
    return () => {
      this.emit('play', resource);
    };
  }
  loop(resource) {
    return () => {
      this.emit('loop', resource);
    };
  }
  render(props) {
    const Component = this.component;
    return (
      <Component
        componentId={this.id}
        {...this.props}
        {...props}
      />
    );
  }
}

export default Composer;
