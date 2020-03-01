import React from 'react';
import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import './Settings.css';

interface State {
  numberOfTasks: number,
  totalMinutes: number
}

export class Settings extends React.Component<{ onStart: (numberOfTasks: number, totalMinutes: number) => void }, State> {
  render() {
    return <div className="column">
      <FormControl>
        <InputLabel>Number of tasks</InputLabel>
        <Input type="number" inputProps={{min: 1}} onChange={event => this.handleChange('numberOfTasks', event)}/>
      </FormControl>
      <FormControl>
        <InputLabel>Total duration (minutes)</InputLabel>
        <Input type="number" onChange={event => this.handleChange('totalMinutes', event)}/>
      </FormControl>
      <Button variant="contained" color="primary"
              onClick={() => this.props.onStart(this.state.numberOfTasks, this.state.totalMinutes)}>Start</Button>
    </div>;
  }

  private handleChange(stateProperty: keyof State, event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    this.setState({[stateProperty]: event.target.value} as any);
  }
}
