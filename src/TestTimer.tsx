import React from 'react';
import { TouchControl } from './TouchControl';

import './TestTimer.css';
import { ProgressCounter } from './ProgressCounter';

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
      this.currentIntervalId = null;
    }
  }

  private nextTask() {
    if (this.state.numberOfOpenTasks >= 1) {
      this.setState(state => ({
        numberOfOpenTasks: state.numberOfOpenTasks - 1,
        remainingTaskSeconds: state.remainingTestSeconds / (state.numberOfOpenTasks - 1)
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
}
