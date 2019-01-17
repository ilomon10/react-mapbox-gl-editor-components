import React from 'react'
import PropTypes from 'prop-types'

import style from '../style/css/textfield.css';

const TextField = props => {
  return (<div readOnly={props.readOnly} className={`${props.className || ''} ${style.textField}`}>
    <input
      readOnly={props.readOnly}
      onChange={props.onChange}
      type={props.type}
      value={props.value}
      defaultValue={props.defaultValue}
      placeholder={props.placeholder} />
  </div>)
}

TextField.propTypes = {
  readOnly: PropTypes.bool,
  label: PropTypes.string,
  type: PropTypes.oneOf(['text', 'number']),
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  defaultValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  placeholder: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onChange: PropTypes.func
}
TextField.defaultProps = {
  type: 'text',
  value: undefined,
  defaultValue: undefined
}

export default TextField;