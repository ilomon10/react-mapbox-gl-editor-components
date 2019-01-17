import React from 'react'
import PropTypes from 'prop-types'

import style from '../style/css/list.css';
import Button from './Button';

const ListItem = props => {
  return React.createElement(props.button ? Button : 'div', {
    className: `${props.className || ''} ${style.listItem} ${props.selected ? style.listItemSelected : ''}`,
    onClick: props.onClick
  }, props.children);
}

ListItem.propTypes = {
  selected: PropTypes.bool,
  button: PropTypes.bool,
  onClick: (props, propName, componentName) => {
    if (props.button && typeof props.onClick !== 'function') {
      return new Error(
        `Invalid prop \`${propName}\` of type \`function\` supplied to \`${componentName}\`, expected \`${typeof props.onClick}\`.`
      )
    }
  }
}

export default ListItem;