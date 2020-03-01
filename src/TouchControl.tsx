import React from 'react';

import './TouchControl.css';

export function TouchControl(props: { onBack: () => void, onNext: () => void }) {
  return <div className="touch-control">
    <div className="previous" onClick={props.onBack}/>
    <div className="next" onClick={props.onNext}/>
  </div>;
}
