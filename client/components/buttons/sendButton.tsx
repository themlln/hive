import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(0),
      },
    },
  }),
);

export default function SendButton() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <IconButton aria-label="text">
        <SendIcon/>
      </IconButton>
    </div>
  );
}