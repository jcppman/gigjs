import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import Composer from '../Composer';
import bus from '../bus';
import css from '../styles/video.css';

const propTypes = {
  componentId: PropTypes.string,
};

class VideoPlayback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    };
    this.video = [];
  }
  componentDidMount() {
    this.listenTo('pause', this.pause);
    this.listenTo('play', this.play);
    this.listenTo('loop', this.loop);
  }

  play = (resource, loop = false) => resource
    .blobUrl
    .then((blobUrl) => {
      this.setState((prev) => {
        const [target, current] = prev.current === 0 ?
          [this.video[1], this.video[0]] :
          this.video;

        target.src = blobUrl;
        target.loop = loop;

        target.addEventListener('canplaythrough', () => {
          target.play();
          target.style = 'opacity: 1';
          current.style = 'opacity: 0';
          current.pause();
        }, {
          once: true,
        });

        return {
          current: prev.current === 0 ? 1 : 0,
        };
      });
    })

  loop = resource => this.play(resource, true)

  pause = () => {
    const target = this.state.current === 0 ? this.video[0] : this.video[1];
    target.pause();
  }

  listenTo(event, handler) {
    const { componentId } = this.props;
    bus.on(`${componentId}-${event}`, handler);
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
          className={classNames(css.video, css.secondOne)}
          ref={(ref) => { this.video[1] = ref; }}
        />
      </div>
    );
  }
}

VideoPlayback.propTypes = propTypes;

export default function (props) {
  return new Composer(VideoPlayback, props);
}
export { VideoPlayback };
