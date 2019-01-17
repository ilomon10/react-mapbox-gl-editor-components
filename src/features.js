import React from 'react'
import PropTypes from 'prop-types'

import Card from './components/Card'
import CardContent from './components/CardContent';

import List from './components/List';
import ListItem from './components/ListItem';
import ListItemText from './components/ListItemText';
import Typography from './components/Typography';

const Features = props => {
  const row = props.row.map((val, id) => {
    return (<ListItem selected={val.isSelected} key={id} button onClick={val.toggle}>
      <ListItemText secondary={val.featureId} primary={val.getGeometry().type} />
    </ListItem>)
  })
  return (<Card>
    <CardContent>
      <Typography variant='title'>Features</Typography>
      <List style={{maxHeight: 200, overflowX: 'hidden'}}>
        {row}
      </List>
    </CardContent>
  </Card>);
}

Features.propsType = {
  row: PropTypes.array
}

Features.defaultProps = {
  row: []
}

export default Features;