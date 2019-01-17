import React, { Component } from 'react'
import MapboxGl from 'react-mapbox-gl'

import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';

import AdapterComponent from 'mapbox-gl-editor-components'

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
          <AdapterComponent />
        </Map>
      </div >
    )
  }
}