import { Button, makeStyles } from '@material-ui/core';
import React, { FC } from 'react';

type Props = {
  onToggle: (e: any) => void;
};

const DropdownButton: FC<Props> = ({ children, onToggle }) => {
  const classes = useStyles();

  return (
    <Button size="small" onClick={onToggle} className={classes.selected}>
      {children}
    </Button>
  );
};

const useStyles = makeStyles((theme) => ({
  selected: {
    height: 22,
    minWidth: 10,
    padding: theme.spacing(0, 1),
    backgroundColor: theme.palette.action.selected,
  },
}));

export default DropdownButton;
