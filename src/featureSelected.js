import React from 'react'
import PropTypes from 'prop-types'

import Card from './components/Card'
import CardContent from './components/CardContent';

import Button from './components/Button';
import List from './components/List';
import ListItem from './components/ListItem';
import Typography from './components/Typography';
import TextField from './components/TextField';

import flexStyle from './style/css/flexbox.css';

class FeatureSelected extends React.Component {
  state = {
    keyValue: ''
  }
  render() {
    const row = this.props.row.filter(feature => feature.isSelected).map((val, id) => {
      const isPropertyExist = typeof val.getProperty(this.state.keyValue) === 'undefined';
      return (
        <Card key={id}>
          <CardContent>
            <Typography component='div' variant='title' noWrap>ID: {val.featureId}</Typography>
            <List>
              <PropertyOfFeatureSelected row={val.get().properties} instance={val} />
              <ListItem className={flexStyle['flex-parent']}>
                <div className={flexStyle['flex-child']} style={{ paddingRight: 6, width: '50%' }}>
                  <TextField
                    onChange={e => { this.setState({ keyValue: e.target.value }) }}
                    value={this.state.keyValue}
                    placeholder='key' />
                </div>
                <div className={flexStyle['flex-child']} style={{ width: '50%' }}>
                  {isPropertyExist &&
                    <Button
                      disabled={!(this.state.keyValue !== '')}
                      style={{ display: 'block', width: '100%' }}
                      onClick={this._onClick.bind(this, 'create', val)}
                    >Create</Button>}
                  {isPropertyExist === false &&
                    <Button
                      disabled={!(this.state.keyValue !== '')}
                      style={{ display: 'block', width: '100%' }}
                      color='warning'
                      onClick={this._onClick.bind(this, 'delete', val)}
                    >Delete</Button>}
                </div>
              </ListItem>
            </List>
          </CardContent>
        </Card>
      )
    })
    return (<div>
      {row}
    </div >);
  }
  _onClick(state, val) {
    switch (state) {
      case 'create':
        val.setProperty(this.state.keyValue, '');
        break;
      case 'delete':
        val.setProperty(this.state.keyValue, undefined);
        break;
      default:
        console.error(`Invalid onClick State, expected ${state}.`);
    }
    this.setState({ keyValue: '' })
  }
}

const PropertyOfFeatureSelected = props => {
  const row = Object.keys(props.row).map((val, id) => {
    return (
      <ListItem key={id} className={flexStyle['flex-parent']}>
        <div className={flexStyle['flex-child']} style={{ paddingRight: 6, width: '50%' }}>
          <TextField readOnly defaultValue={val} placeholder='key' />
        </div>
        <div className={flexStyle['flex-child']} style={{ width: '50%' }}>
          <TextField
            onChange={e => props.instance.setProperty(val, e.target.value)}
            value={props.row[val] || ''}
            placeholder='value' />
        </div>
      </ListItem>
    )
  })
  return (
    <React.Fragment>
      {row}
    </React.Fragment>
  )
}

export default FeatureSelected;