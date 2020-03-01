import React from 'react';

import './Timer.css';

export function Timer(props: { currentSeconds: number }) {
  const isNegative = props.currentSeconds < 0;

  // bitwise operation to round to integer
  const seconds = (props.currentSeconds % 60) | 0;
  const secondsString = `${Math.abs(seconds)}`.padStart(2, '0');

  const minutes = (props.currentSeconds / 60) | 0;
  const minutesString = `${Math.abs(minutes)}`.padStart(2, '0');


  return <span className={`timer ${isNegative ? 'is-negative' : 'is-positive'}`}>
    <span className="prefix">-</span><span>{`${minutesString}:${secondsString}`}</span>
  </span>;
}
