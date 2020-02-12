import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import PanToolIcon from '@material-ui/icons/PanTool';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }),
);

export default function SelectButton() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <IconButton aria-label="select">
        <PanToolIcon />
      </IconButton>
    </div>
  );
}