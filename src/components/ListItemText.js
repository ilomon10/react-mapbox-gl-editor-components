import React from 'react'
import PropTypes from 'prop-types'

import style from '../style/css/list.css';
import Typography from './Typography';

const ListItemText = props => {
  return (
    <div {...props} className={`${props.className || ''} ${style.listItemText}`}>
      <Typography component='div' noWrap>{props.primary}</Typography>
      {props.secondary && <Typography component='div' variant='caption' noWrap>{props.secondary}</Typography>}
    </div>
  );
}

ListItemText.propTypes = {
  primary: PropTypes.string.isRequired,
  secondary: PropTypes.string
}

export default ListItemText;