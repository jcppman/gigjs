import React, { Component, PropTypes } from 'react';
import { isFunction, isArray, defaults } from 'lodash';
import bus from '../bus';
import css from '../styles/application.css';

const propTypes = {
  scenes: PropTypes.arrayOf(PropTypes.object),
  view: PropTypes.object,
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    };
    bus.on('changeScene', this.changeScene);
  }
  onCurrentChange = (newVal) => {
    bus.emit('changeScene', newVal);
  }
  pauseAll = () => {
    bus.emit('pauseAll');
  }
  changeScene = (newVal) => {
    const scene = defaults(this.props.scenes[newVal], {
      actions: [],
    });
    const { actions, goNextWhenFinish } = scene;

    if (this.theNext) {
      this.theNext.stopListening('ended');
      this.theNext = null;
    }

    if (goNextWhenFinish !== undefined) {
      goNextWhenFinish.listenTo('ended', () => {
        this.theNext = goNextWhenFinish;
        this.changeScene(newVal + 1);
      });
    }

    actions.forEach(f => f());

    this.setState({
      current: newVal,
      scene,
    });
  }

  buildComp(Comp) {
    let comp;
    if (Comp.isSceneView) {
      const { current } = this.state;
      const { scenes } = this.props;
      comp = (
        <Comp
          scenes={scenes}
          current={current}
          onChange={this.onCurrentChange}
          onStop={this.pauseAll}
        />
      );
    } else if (isFunction(Comp)) {
      comp = (<Comp />);
    } else if (isFunction(Comp.render)) {
      comp = Comp.render();
    } else {
      comp = <div>Unsupported Compnent {Comp}</div>;
    }
    return (
      <div className={css.component}>
        {comp}
      </div>
    );
  }
  buildRows(layout) {
    const height = `${100 / layout.length}%`;
    return layout.map((l, idx) => (
      <div className={css.row} key={idx} style={{ height }}>
        {isArray(l) ? this.buildCols(l) : this.buildComp(l)}
      </div>
    ));
  }
  buildCols(layout) {
    const width = `${100 / layout.length}%`;
    return layout.map((l, idx) => (
      <div className={css.col} key={idx} style={{ width }}>
        {isArray(l) ? this.buildRows(l) : this.buildComp(l)}
      </div>
    ));
  }
  render() {
    const {
      view: {
        layout,
        background,
      },
      scenes,
    } = this.props;

    const { current } = this.state;

    const view = this.buildRows(layout, scenes, current);
    const backgroundComps = background.map((b, idx) => (
      <div key={idx} className={css.background}>{this.buildComp(b)}</div>
    ));
    return (
      <div>
        <div className={css.view}>
          {view}
        </div>
        {backgroundComps}
      </div>
    );
  }
}

App.propTypes = propTypes;

export default App;
