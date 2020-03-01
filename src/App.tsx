import React from 'react';
import './App.css';
import { TestTimer } from './TestTimer';

export class App extends React.Component<{}, {}> {
  render(): React.ReactElement {

    return (
      <TestTimer numberOfTasks={18} testDurationSeconds={15 * 60} />
    );
  }

}
