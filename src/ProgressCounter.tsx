import { CircularProgress } from '@material-ui/core';
import { Timer } from './Timer';
import React from 'react';
import './ProgressCounter.css';

function getCompletionPercentage(current: number, total: number): number {
  return Math.min(Math.ceil((total - current) / total * 100), 100);
}

export function ProgressCounter(props: React.PropsWithChildren<{ total: number, remaining: number, showPlainCount?: boolean }>) {
  const progress = getCompletionPercentage(props.remaining, props.total);

  let progressContent;
  if (props.showPlainCount) {
    progressContent = <span>{Math.min(props.total - props.remaining + 1, props.total)} / {props.total}</span>;
  } else {
    progressContent = <Timer currentSeconds={props.remaining}/>;
  }

  return <div className="progress-counter">
    <CircularProgress variant="static" value={progress} size={100} className="progress-count"/>
    <CircularProgress variant="static" value={100} size={100} className="progress-background"/>
    <div className="centered">
      {progressContent}
    </div>
    <span>{props.children}</span>
  </div>;
}
