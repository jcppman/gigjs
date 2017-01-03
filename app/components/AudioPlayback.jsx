import React, { Component } from 'react';
import Composer from '../Composer';

class AudioPlayback extends Component {
  play(resource, loop = false) {
    return resource.blobUrl.then((blobUrl) => {
      if (this.audio) {
        this.audio.src = blobUrl;
        this.audio.loop = loop;
        this.audio.play();
      }
    });
  }
  loop(resource) {
    return this.play(resource, true);
  }
  stop() {
    if (this.audio) {
      this.audio.pause();
    }
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

export default function (...props) {
  return new Composer(AudioPlayback, ...props);
}
export { AudioPlayback };
