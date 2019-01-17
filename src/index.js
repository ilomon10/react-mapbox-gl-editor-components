import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import MapboxGlDraw from '@mapbox/mapbox-gl-draw'

import ToggleControl from './components/toggleControl'

import style from './style/css/index.css'
import Features from './features';
import FeatureSelected from './featureSelected';
import FeatureClass from './featureClass';

export default class AdapterComponent extends React.Component {
  static contextTypes = {
    map: PropTypes.object.isRequired
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
    map._controlContainer.insertBefore(this._container, map._controlContainer.firstChild);
    map.on('draw.create', this._onDrawCreate.bind(this));
    map.on('draw.delete', this._onDrawDelete.bind(this));
    map.on('draw.selectionchange', this._onDrawSelectionChange.bind(this));
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
    }))
  }
  _onDrawDelete(ev) {
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
  }
  _onDrawSelectionChange(ev) {
    const filters = ev.features.map((val) => val.id);
    for (const feature of this.state.features) {
      if (~filters.indexOf(feature.featureId)) {
        feature.select();
      } else {
        feature.deselect();
      }
    }
    this.forceUpdate();
  }
  _onFeatureHandler() {
    this.forceUpdate();
  }
}
