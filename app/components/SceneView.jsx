import React, { PropTypes } from 'react';
import classNames from 'classnames';
import css from '../styles/scene.css';

function noop() {}

const propTypes = {
  current: PropTypes.number,
  scenes: PropTypes.arrayOf(PropTypes.object),
  onStop: PropTypes.func,
  onChange: PropTypes.func,
};

const defaultProps = {
  onStop: noop,
  onChange: noop,
};

function SceneView({ scenes, current, onChange, onStop }) {
  const rows = scenes.map((scene, idx) => (
    <button
      key={idx}
      className={classNames(css.scene, (current === idx ? css.activated : null))}
      onClick={() => onChange(idx)}
    >
      <h4>{scene.title}</h4>
      <p>{scene.description}</p>
    </button>
  ));
  return (
    <div className={css.main}>
      <h3>Scene View</h3>
      <button onClick={() => onStop()} className={css.scene}>Stop</button>
      {rows}
    </div>
  );
}

SceneView.isSceneView = true;
SceneView.propTypes = propTypes;
SceneView.defaultProps = defaultProps;

export default SceneView;
