export default class ToggleControl {
  constructor(props) {
    this.toggleHide = props;
  }

  onAdd(map) {
    this._map = map;
    this._container = document.createElement('div');
    this._container.className = 'mapboxgl-ctrl mapboxgl-ctrl-group';
    this._button = document.createElement('button');
    this._button.style = 'font-weight: bold;';
    this._button.textContent = 'E';
    this._button.onclick = this.toggleHide;
    this._container.appendChild(this._button);
    return this._container;
  }

  onRemove() {
    this._container.parentNode.removeChild(this._container);
    this._map = undefined;
  }
}