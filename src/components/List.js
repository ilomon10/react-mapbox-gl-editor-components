import React from 'react'
import PropTypes from 'prop-types'

import style from '../style/css/list.css';

const List = props => {
  return (
    <div style={props.style} className={`${props.className || ''} ${style.list}`}>
      {props.children}
    </div>
  );
}

List.propTypes = {
  style: PropTypes.object,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]).isRequired,
}

export default List;