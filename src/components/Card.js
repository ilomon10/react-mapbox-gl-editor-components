import React from 'react'

import style from '../style/css/card.css';

const Card = props => {
  return (
    <div className={`${props.className || ''} ${style.card}`}>
      {props.children}
    </div >
  );
}

export default Card;