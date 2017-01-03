import React, { Component } from 'react';
import Composer from '../Composer';
import css from '../styles/video.css';

class VideoPlayback extends Component {
  constructor(props, ...rest) {
    super(props, ...rest);
    this.state = {
      current: 0,
    };
    this.video = [];
  }
  play(resource, loop = false) {
    return resource.blobUrl.then((blobUrl) => {
      this.setState((prev) => {
        const [target, current] = prev.current === 0 ?
          [this.video[1], this.video[0]] :
          this.video;

        target.src = blobUrl;
        target.loop = loop;
        target.play();

        setTimeout(() => {
          target.style = 'opacity: 1';
          current.style = 'opacity: 0';
          current.pause();
        }, 50);

        return {
          current: prev.current === 0 ? 1 : 0,
        };
      });
    });
  }
  loop(resource) {
    return this.play(resource, true);
  }
  stop() {
    const target = this.state.current === 0 ? this.video[1] : this.video[0];
    target.pause();
  }
  render() {
    return (
      <div className={css.container}>
        <video
          width="100%"
          className={css.video}
          ref={(ref) => { this.video[0] = ref; }}
        />
        <video
          width="100%"
          className={css.video}
          ref={(ref) => { this.video[1] = ref; }}
        />
      </div>
    );
  }
}

export default function (...props) {
  return new Composer(VideoPlayback, ...props);
}
export { VideoPlayback };
