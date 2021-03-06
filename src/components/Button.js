import React from 'react'
import PropTypes from 'prop-types'

import Typography from './Typography'

import style from '../style/css/button.css';

const Button = props => {
  return (
    <button disabled={props.disabled} onClick={props.onClick} style={props.style} className={`${props.className || ''} ${style.button} ${style[props.color] || ''}`}>
      <Typography variant='button'>{props.children}</Typography>
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.array]).isRequired,
  className: PropTypes.string,
  color: PropTypes.oneOf(['default', 'warning'])
}
Button.defaultProps = {
  className: '',
  color: 'default'
}

export default Button;