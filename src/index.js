import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import MapboxGlDraw from '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.js'

import ToggleControl from './components/toggleControl'

import style from './style/css/index.css'
import Features from './features';
import FeatureSelected from './featureSelected';
import FeatureClass from './featureClass';

const noop = () => { /* Nothing */ }

class AdapterComponent extends React.Component {
  static contextTypes = {
    map: PropTypes.object.isRequired
  }

  static propTypes = {
    drawControl: PropTypes.func,
    onControlReady: PropTypes.func,
    onDrawCreate: PropTypes.func,
    onDrawDelete: PropTypes.func,
    onDrawUpdate: PropTypes.func,
    onDrawCombine: PropTypes.func,
    onDrawUncombine: PropTypes.func,
    onDrawSelectionChange: PropTypes.func,
    onDrawModeChange: PropTypes.func,
    onDrawRender: PropTypes.func,
    onDrawActionable: PropTypes.func,
  }

  static defaultProps = {
    drawControl: noop,
    onControlReady: noop,
    onDrawCreate: noop,
    onDrawDelete: noop,
    onDrawUpdate: noop,
    onDrawCombine: noop,
    onDrawUncombine: noop,
    onDrawSelectionChange: noop,
    onDrawModeChange: noop,
    onDrawRender: noop,
    onDrawActionable: noop,
  }

  state = {
    hide: true,
    features: [],
  }

  componentWillMount() {
    const { map } = this.context;
    this._draw = new MapboxGlDraw({
      controls: {
        "combine_features": false,
        "uncombine_features": false
      }
    });
    this._toggleControl = new ToggleControl(this._toggleHide.bind(this));
    this._container = document.createElement('div');
    this._container.className = `mapboxgl-editor-components_wrapper ${style.componentWrapper}`;
    map.addControl(this._draw, 'top-left');
    map.addControl(this._toggleControl, 'top-left');
  }
  componentDidMount() {
    const { map } = this.context;
    const {
      drawControl,
      onControlReady,
      onDrawUpdate,
      onDrawCombine,
      onDrawUncombine,
      onDrawModeChange,
      onDrawRender,
      onDrawActionable,
    } = this.props;

    map._controlContainer.insertBefore(this._container, map._controlContainer.firstChild);
    map.on('draw.create', this._onDrawCreate.bind(this));
    map.on('draw.delete', this._onDrawDelete.bind(this));
    map.on('draw.selectionchange', this._onDrawSelectionChange.bind(this));

    map.on('draw.update', onDrawUpdate);
    map.on('draw.combine', onDrawCombine);
    map.on('draw.uncombine', onDrawUncombine);
    map.on('draw.modechange', onDrawModeChange);
    map.on('draw.render', onDrawRender);
    map.on('draw.actionable', onDrawActionable);

    drawControl(this._draw);
    onControlReady(this._toggleControl);
  }
  componentWillUnmount() {
    const { map } = this.context;
    if (!map || !map.getStyle()) return;
    map.removeControl(this._draw);
    map.removeControl(this._toggleControl);
    this._container.parentNode.removeChild(this._container);
  }

  render() {
    if (this.state.hide) this._container.classList.add(style.hide);
    else this._container.classList.remove(style.hide);

    return ReactDOM.createPortal(
      (<div className={`${style.componentContainer}`}>
        <Features row={this.state.features} />
        <FeatureSelected row={this.state.features} />
      </div>),
      this._container,
    );
  }

  _toggleHide() {
    this.setState(oState => ({
      hide: !oState.hide
    }))
  }
  
  _onDrawCreate(ev) {
    const { onDrawCreate } = this.props;
    const features = ev.features.map(e => {
      return new FeatureClass({
        draw: this._draw,
        featureId: e.id,
        map: this.context.map,
        onSelect: this._onFeatureHandler.bind(this),
        onDeselect: this._onFeatureHandler.bind(this),
        onSetProperty: this._onFeatureHandler.bind(this)
      });
    })
    this.setState(props => ({
      features: [...props.features, ...features],
    }));
    onDrawCreate(ev);
  }
  _onDrawDelete(ev) {
    const { onDrawDelete } = this.props;
    const ids = ev.features.map((val) => {
      return val.id;
    })
    const filters = { featureId: ids };
    const filterKeys = Object.keys(filters);
    const features = this.state.features.filter((item) => {
      return filterKeys.every(key => !~filters[key].indexOf(item[key]));
    });
    this.setState({
      features,
    });
    onDrawDelete(ev);
  }
  _onDrawSelectionChange(ev) {
    const { onDrawSelectionChange } = this.props;
    const filters = ev.features.map((val) => val.id);
    for (const feature of this.state.features) {
      if (~filters.indexOf(feature.featureId)) {
        feature.select();
      } else {
        feature.deselect();
      }
    }
    this.forceUpdate();
    onDrawSelectionChange(ev);
  }
  _onFeatureHandler() {
    this.forceUpdate();
  }
}

export default AdapterComponent;