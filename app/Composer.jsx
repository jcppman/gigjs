import React from 'react';

class Composer {
  constructor(Component) {
    this.component = Component;
  }
  pause() {
    return () => {
      if (!this.ref) {
        throw new Error('pause is called before the component is rendered');
      }
      this.ref.pause();
    };
  }
  play(resource) {
    return () => {
      if (!this.ref) {
        throw new Error('play is called before the component is rendered');
      }
      this.ref.play(resource);
    };
  }
  loop(resource) {
    return () => {
      if (!this.ref) {
        throw new Error('loop is called before the component is rendered');
      }
      this.ref.loop(resource);
    };
  }
  render(...props) {
    const Component = this.component;
    return (
      <Component
        ref={(ref) => { this.ref = ref; }}
        {...props}
      />
    );
  }
}

export default Composer;
