import { makeStyles, TextField } from '@material-ui/core';
import React, { ChangeEvent, useMemo } from 'react';
import { QueryOperation } from '../../../utils/query';
import TagBox from '../../TagBox';

type Props = {
  value: any;
  op: QueryOperation;
  onChange: (value: any) => void;
};

const Value = ({ value, op, onChange }: Props) => {
  const classes = useStyles();
  const handleChange = ({
    target: { value: changes },
  }: ChangeEvent<HTMLInputElement>) => {
    onChange(changes);
  };

  const EditorRenderer = useMemo(() => {
    switch (op) {
      case QueryOperation.In:
        return <TagBox value={value} onChange={onChange} />;
      default:
        return (
          <TextField
            value={value}
            className={classes.root}
            onChange={handleChange}
          />
        );
    }
  }, [op, value, onChange]);

  return EditorRenderer;
};

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiInputBase-root:before': {
      content: 'none',
    },
    '& .MuiInput-input': {
      height: 24,
      borderRadius: '2px',
      padding: theme.spacing(0, 1),
      backgroundColor: theme.palette.action.selected,
    },
  },
}));

export default Value;
