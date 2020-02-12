import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(0),
      },
    },
  }),
);

export default function LineButton() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <IconButton aria-label="text">
        <RemoveIcon/>
      </IconButton>
    </div>
  );
}