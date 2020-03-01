import React from 'react';

import './TouchControl.css';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  previous: {
    flex: '1 1 auto',
    fontSize: '24px',
    margin: '8px',
  },
  next: {
    flex: '0 1 70%',
    fontSize: '24px',
    margin: '8px',
  }
}));

export function TouchControl(props: { onBack: () => void, onNext: () => void }) {
  const classes = useStyles();

  return <div className="touch-control">
    <Button variant="contained" color="secondary" className={classes.previous} onClick={props.onBack}>
      Back
    </Button>
    <Button variant="contained" className={classes.next} color="primary" onClick={props.onNext}>
      Next
    </Button>
  </div>;
}
