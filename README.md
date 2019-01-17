# react-mapbox-gl-editor-components

> 

[![NPM](https://img.shields.io/npm/v/mapbox-gl-editor-components.svg)](https://www.npmjs.com/package/mapbox-gl-editor-components) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react@16.2.x react-dom@16.2.x react-mapbox-gl@3.9.2 @mapbox/mapbox-gl-draw@1.0.2 // peerDependencies
npm install --save react-mapbox-gl-editor-components
```

## Usage

```jsx
import React, { Component } from 'react'
import ReactMapboxGL from 'react-mapbox-gl'

import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';

import MBEditorComponents from 'react-mapbox-gl-editor-components'

const Map = ReactMapboxGl({
  accessToken: "YOUR.ACCESS.TOKEN"
})

class Example extends Component {
  render () {
    return (
      <Map 
        containerStyle={{
          height: "100vh",
          width: "100vw",
        }}
        style="mapbox://styles/mapbox/streets-v9">
        <MBEditorComponents />
      </Map>
    )
  }
}
```

## License

MIT © [ilomon10](https://github.com/ilomon10)
