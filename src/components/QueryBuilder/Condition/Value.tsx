import { makeStyles, TextField } from '@material-ui/core';
import React, { ChangeEvent } from 'react';

type Props = {
  value: any;
  onChange: (value: any) => void;
};

const Value = ({ value, onChange }: Props) => {
  const classes = useStyles();
  const handleChange = ({
    target: { value: changes },
  }: ChangeEvent<HTMLInputElement>) => {
    onChange(changes);
  };

  return (
    <TextField value={value} className={classes.root} onChange={handleChange} />
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiInputBase-root:before': {
      content: 'none',
    },
    '& .MuiInput-input': {
      height: 22,
      borderRadius: '4px',
      padding: theme.spacing(0, 1),
      backgroundColor: theme.palette.action.selected,
    },
  },
}));

export default Value;
