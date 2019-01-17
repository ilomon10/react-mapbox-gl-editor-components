import React from 'react'
import PropTypes from 'prop-types'

import style from '../style/css/typography.css';

const Typography = props => {
  return React.createElement(props.component, {
    className: `
      ${props.className || ''}
      ${style.typography}
      ${style[props.variant] || ''}
      ${props.noWrap ? style.noWrap : ''}
    `
  }, props.children);
}

Typography.propTypes = {
  variant: PropTypes.oneOf(['title', 'subheading', 'body', 'caption', 'button']),
  component: PropTypes.oneOf(['span', 'div']),
  noWrap: PropTypes.bool
}
Typography.defaultProps = {
  vairant: 'body',
  component: 'span',
  noWrap: false
}

export default Typography;