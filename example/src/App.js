import React, { Component } from 'react'
import MapboxGl from 'react-mapbox-gl'

import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';

import AdapterComponent from 'react-mapbox-gl-editor-components'

const Map = MapboxGl({
  accessToken: 'pk.eyJ1IjoiZmFrZXVzZXJnaXRodWIiLCJhIjoiY2pwOGlneGI4MDNnaDN1c2J0eW5zb2ZiNyJ9.mALv0tCpbYUPtzT7YysA2g'
});

export default class App extends Component {
  render() {
    return (
      <div>
        <Map
          style="mapbox://styles/mapbox/streets-v9" // eslint-disable-line
          containerStyle={{
            height: '100vh',
            width: '100vw'
          }}>
          <AdapterComponent
            drawControl={this._drawControl.bind(this)}
            onDrawCreate={this._onFireEvent('onDrawCreate')}
            onDrawDelete={this._onFireEvent('onDrawDelete')}
            onDrawUpdate={this._onFireEvent('onDrawUpdate')}
            onDrawCombine={this._onFireEvent('onDrawCombine')}
            onDrawUncombine={this._onFireEvent('onDrawUncombine')}
            onDrawSelectionChange={this._onFireEvent('onDrawSelectionChange')}
            onDrawModeChange={this._onFireEvent('onDrawModeChange')}
            // onDrawRender={this._onFireEvent('onDrawRender')}
            onDrawActionable={this._onFireEvent('onDrawActionable')}
          />
        </Map>
      </div >
    )
  }
  _drawControl(a) {
    console.log(a);
  }
  _onFireEvent(a) {
    return (b) => {
      console.log(`${a}:`, b);
    }
  }
}