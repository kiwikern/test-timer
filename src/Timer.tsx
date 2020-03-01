import React from 'react';

import './Timer.css';

export class Timer extends React.Component<{ startSeconds: number }, { currentSeconds: number, isRunning: boolean }> {

  state = {currentSeconds: this.props.startSeconds, isRunning: true};
  private currentIntervalId: NodeJS.Timeout | null = null;

  componentDidMount(): void {
    this.currentIntervalId = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount(): void {
    if (this.currentIntervalId)
      clearInterval(this.currentIntervalId);
  }

  render(): React.ReactElement<null> {
    const isNegative = this.state.currentSeconds < 0;

    const seconds = Math.floor(this.state.currentSeconds % 60);
    const secondsString = `${Math.abs(seconds)}`.padStart(2, '0');

    const minutes = Math.floor(this.state.currentSeconds / 60) + (isNegative ? 1 : 0);
    const minutesString = `${Math.abs(minutes)}`.padStart(2, '0');


    return <div className={`timer ${isNegative ? 'is-negative' : 'is-positive'}`}>
      <span className="prefix">-</span><span>{`${minutesString}:${secondsString}`}</span>
    </div>;
  }

  private tick() {
    this.setState(state => ({currentSeconds: state.currentSeconds - 1}));
  }
}
