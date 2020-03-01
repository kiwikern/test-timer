import React from 'react';
import { Timer } from './Timer';
import { TouchControl } from './TouchControl';

import './TestTimer.css';

type Props = {
  testDurationSeconds: number,
  numberOfTasks: number,
};
type State = {
  remainingTestSeconds: number,
  remainingTaskSeconds: number,
  numberOfOpenTasks: number,
};

export class TestTimer extends React.Component<Props, State> {
  state = {
    remainingTestSeconds: this.props.testDurationSeconds,
    remainingTaskSeconds: Math.floor(this.props.testDurationSeconds / this.props.numberOfTasks),
    numberOfOpenTasks: this.props.numberOfTasks,
  };
  currentIntervalId: NodeJS.Timer | null = null;

  componentDidMount(): void {
    this.currentIntervalId = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount(): void {
    this.stop();
  }

  render() {
    return <div className="test-timer">
      <span>Open Tasks: {this.state.numberOfOpenTasks}</span>
      <span>Test: <Timer currentSeconds={this.state.remainingTestSeconds}/></span>
      <span>Test: <Timer currentSeconds={this.state.remainingTaskSeconds}/></span>
      <TouchControl onBack={() => this.previousTask()} onNext={() => this.nextTask()}/>
    </div>;
  }

  private tick() {
    this.setState(state => ({
      remainingTestSeconds: state.remainingTestSeconds - 1,
      remainingTaskSeconds: state.remainingTaskSeconds - 1,
    }));

    if (this.state.remainingTestSeconds === 0) {
      this.stop();
    }
  }

  private stop() {
    if (this.currentIntervalId) {
      clearInterval(this.currentIntervalId);
    }
  }

  private nextTask() {
    if (this.state.numberOfOpenTasks <= 1) {

    } else {
      this.setState(state => ({
        numberOfOpenTasks: state.numberOfOpenTasks - 1,
        remainingTaskSeconds: state.remainingTestSeconds / (state.numberOfOpenTasks - 1)
      }));
    }
  }

  private previousTask() {
    this.setState((state, props) => ({
      numberOfOpenTasks: Math.min(state.numberOfOpenTasks + 1, props.numberOfTasks),
    }));
    this.setState(state => ({
      remainingTaskSeconds: state.remainingTestSeconds / state.numberOfOpenTasks,
    }));
  }
}
