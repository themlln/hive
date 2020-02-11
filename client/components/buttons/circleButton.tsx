import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }),
);

export default function CircleButton() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <IconButton aria-label="text">
        <RadioButtonUncheckedIcon/>
      </IconButton>
    </div>
  );
}