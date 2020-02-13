import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import PaletteIcon from '@material-ui/icons/Palette';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(0),
      },
    },
  }),
);

export default function ColorButton() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <IconButton title="Color Palette: Select colors for stroke and shape/text fill" aria-label="delete">
        <PaletteIcon/>
      </IconButton>
    </div>
  );
}
