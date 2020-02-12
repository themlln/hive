import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import GetAppIcon from '@material-ui/icons/GetApp';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(0),
      },
    },
  }),
);

export default function DeleteButton() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <IconButton aria-label="delete">
        <GetAppIcon />
      </IconButton>
    </div>
  );
}