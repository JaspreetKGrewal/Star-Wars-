import React from 'react';
import './Characters.css';

const Characters = (props) => {
  return (
    <li className='characters'>
      <h2>{props.name}</h2>
      <h3>{props.height}</h3>
      <p>{props.gender}</p>
    </li>
  );
};

export default Characters;