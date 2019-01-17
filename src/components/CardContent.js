import React from 'react'

import style from '../style/css/card.css';

const CardContent = props => {
  return (
    <div className={`${props.className || ''} ${style.cardContent}`}>
      { props.children }
    </div >
  );
}

export default CardContent;