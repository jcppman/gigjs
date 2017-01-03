import React, { Component, PropTypes } from 'react';
import Composer from '../Composer';
import bus from '../bus';

const propTypes = {
  componentId: PropTypes.string,
};

class AudioPlayback extends Component {
  componentDidMount() {
    this.listenTo('play', this.play);
    this.listenTo('pause', this.pause);
    this.listenTo('loop', this.loop);
  }
  play = (resource, loop = false) => resource
    .blobUrl.then((blobUrl) => {
      if (this.audio) {
        this.audio.src = blobUrl;
        this.audio.loop = loop;
        this.audio.play();
      }
    })
  loop = resource => this.play(resource, true)
  pause = () => {
    if (this.audio) {
      this.audio.pause();
    }
  }
  listenTo(event, handler) {
    const { componentId } = this.props;
    bus.on(`${componentId}-${event}`, handler);
  }
  render() {
    return (
      <div>
        <audio
          ref={(ref) => { this.audio = ref; }}
        />
      </div>
    );
  }
}

AudioPlayback.propTypes = propTypes;

export default function (...props) {
  return new Composer(AudioPlayback, ...props);
}
export { AudioPlayback };
