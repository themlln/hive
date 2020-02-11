import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }),
);

export default function RectangleButton() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <IconButton aria-label="text">
        <CheckBoxOutlineBlankIcon/>
      </IconButton>
    </div>
  );
}