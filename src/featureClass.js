const noop = () => { /* nothing */ }

export default class FeatureClass {
  constructor(options) {
    this.options = {
      onSelect: noop,
      onDeselect: noop,
      onSetProperty: noop,
      map: Object,
      draw: Object,
      featureId: String,
      ...options
    };

    this._map = this.options.map;
    this.draw = this.options.draw;
    this.select = this.select.bind(this);
    this.toggle = this.toggle.bind(this);
    this.deselect = this.deselect.bind(this);
    this._selected = false;
  }
  get featureId(){
    return this.options.featureId;
  }
  get isSelected() {
    return this._selected;
  }
  setProperty(property, value) {
    this.options.onSetProperty(this);
    this.draw.setFeatureProperty(this.featureId, property, value);
    return this;
  }
  toggle() {
    if (this.isSelected) this.deselect();
    else this.select();
    return this;
  }
  select() {
    this.options.onSelect(this);
    let featureIds = [];
    this._selected = true;
    featureIds = [...this.draw.getSelectedIds(), this.featureId];
    this.draw.changeMode('simple_select', { featureIds });
    return this;
  }
  deselect() {
    this.options.onDeselect(this);
    let featureIds = [];
    this._selected = false;
    featureIds = this.draw.getSelectedIds().filter(id => id !== this.featureId);
    this.draw.changeMode('simple_select', { featureIds });
    return this;
  }
  getAll() {
    return this.draw.getAll();
  }
  get() {
    return this.draw.get(this.featureId);
  };
  getGeometry() {
    return this.get().geometry;
  };
  getProperty() {
    return this.get().property;
  };
  delete() {
    this.draw.delete(this.featureId);
    return this.featureId;
  }
}