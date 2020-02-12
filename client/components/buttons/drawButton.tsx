import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CreateIcon from '@material-ui/icons/Create';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(0),
      },
    },
  }),
);

export default function DrawButton() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <IconButton aria-label="draw">
        <CreateIcon />
      </IconButton>
    </div>
  );
}