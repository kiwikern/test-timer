import React from 'react';
import './App.css';
import { TestTimer } from './TestTimer';
import { Settings } from './Settings';

type State = { numberOfTasks?: number, totalMinutes?: number };

export class App extends React.Component<{}, State> {
  state: State = {};

  render(): React.ReactElement {

    return !this.state.numberOfTasks || !this.state.totalMinutes
      ? <Settings onStart={(numberOfTasks, totalSeconds) => this.start(numberOfTasks, totalSeconds)}/>
      : <TestTimer numberOfTasks={this.state.numberOfTasks} testDurationSeconds={this.state.totalMinutes * 60}/>;
  }

  private start(numberOfTasks: number, totalMinutes: number) {
    this.setState({numberOfTasks, totalMinutes});
  }
}
