import React from 'react';
import { clone } from 'lodash';
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
  listenTo(event, handler) {
    bus.once(`${this.id}-${event}`, handler);
  }
  stopListeningTo(event) {
    bus.removeAllListeners(`${this.id}-${event}`);
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
  with(addProps) {
    const cloned = clone(this);
    cloned.props = {
      ...cloned.props,
      ...addProps,
    };
    return cloned;
  }
  render(props) {
    const Component = this.component;
    return (
      <Component
        componentId={this.id}
        onEnded={this.onEnded}
        {...this.props}
        {...props}
      />
    );
  }
}

export default Composer;
