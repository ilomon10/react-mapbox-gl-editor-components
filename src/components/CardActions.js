import React from 'react'

import style from '../style/css/card.css';

const CardActions = props => {
  return (
    <div className={`${props.className || ''} ${style.cardActions}`}>
      { props.children }
    </div >
  );
}

export default CardActions;