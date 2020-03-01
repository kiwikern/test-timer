import React from 'react';
import { TouchControl } from './TouchControl';

import './TestTimer.css';
import { ProgressCounter } from './ProgressCounter';
import { IconButton } from '@material-ui/core';
import { VolumeOff, VolumeUp } from '@material-ui/icons';

type Props = {
  testDurationSeconds: number,
  numberOfTasks: number,
};
type State = {
  remainingTestSeconds: number,
  remainingTaskSeconds: number,
  numberOfOpenTasks: number,
  playSounds: boolean,
};

export class TestTimer extends React.Component<Props, State> {
  state = {
    remainingTestSeconds: this.props.testDurationSeconds,
    remainingTaskSeconds: Math.floor(this.props.testDurationSeconds / this.props.numberOfTasks),
    numberOfOpenTasks: this.props.numberOfTasks,
    playSounds: true,
  };
  currentIntervalId: NodeJS.Timer | null = null;

  componentDidMount(): void {
    this.currentIntervalId = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount(): void {
    this.stop();
  }

  render() {
    const soundButton = this.state.playSounds ? <VolumeUp/> : <VolumeOff/>;

    return <div className="test-timer">

      <ProgressCounter remaining={this.state.remainingTestSeconds} total={this.props.testDurationSeconds}>
        Total Duration
      </ProgressCounter>

      <div className="row">
        <ProgressCounter remaining={this.state.numberOfOpenTasks} total={this.props.numberOfTasks}
                         showPlainCount={true}>
          Active Task
        </ProgressCounter>

        <ProgressCounter remaining={this.state.remainingTaskSeconds}
                         total={this.state.remainingTestSeconds / this.state.numberOfOpenTasks}>
          Task Duration
        </ProgressCounter>
      </div>

      <TouchControl onBack={() => this.previousTask()} onNext={() => this.nextTask()}/>

      <IconButton onClick={() => this.toggleSound()}>
        {soundButton}
      </IconButton>
    </div>;
  }

  private tick() {
    this.setState(state => ({
      remainingTestSeconds: state.remainingTestSeconds - 1,
      remainingTaskSeconds: state.remainingTaskSeconds - 1,
    }));

    if (this.state.remainingTaskSeconds === 0 && this.state.playSounds) {
      new Audio('./hint.wav').play();
    }

    if (this.state.remainingTestSeconds === 0) {
      this.stop();
    }
  }

  private stop() {
    if (this.currentIntervalId) {
      clearInterval(this.currentIntervalId);
      this.currentIntervalId = null;
    }
  }

  private nextTask() {
    if (this.state.numberOfOpenTasks >= 1) {
      this.setState(state => ({
        numberOfOpenTasks: state.numberOfOpenTasks - 1,
        remainingTaskSeconds: Math.floor(state.remainingTestSeconds / (state.numberOfOpenTasks - 1))
      }));
    }

    if (this.state.numberOfOpenTasks <= 1) {
      this.stop();
    }
  }

  private previousTask() {
    this.setState((state, props) => ({
      numberOfOpenTasks: Math.min(state.numberOfOpenTasks + 1, props.numberOfTasks),
    }));
    this.setState(state => ({
      remainingTaskSeconds: state.remainingTestSeconds / state.numberOfOpenTasks,
    }));

    if (!this.currentIntervalId) {
      this.componentDidMount();
    }
  }

  private toggleSound() {
    this.setState(state => ({
      playSounds: !state.playSounds,
    }));
  }
}
