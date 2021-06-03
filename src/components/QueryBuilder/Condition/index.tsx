/* eslint-disable import/no-anonymous-default-export */
import { Grid, makeStyles } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import React, { FC, useState } from 'react';
import useChangeEffect from '../../../hooks/useChangeEffect';
import useDebounce from '../../../hooks/useDebounce';
import { QueryCondition } from '../../../utils/query';
import ConditionField from './Field';
import ConditionOperation from './Operation';
import ConditionValue from './Value';

export type ConditionProps = {
  condition: QueryCondition;
  onChange: (condition: QueryCondition) => void;
  onRemove: () => void;
};

const Condition: FC<ConditionProps> = ({ condition, onChange, onRemove }) => {
  const classes = useStyles();
  const [field, setField] = useState(condition[0]);
  const [op, setOp] = useState(condition[1]);
  const [value, setValue] = useState(condition[2]);

  const debouncedValue = useDebounce(value, 500);

  useChangeEffect(() => {
    onChange([field, op, debouncedValue]);
  }, [field, op, debouncedValue]);

  return (
    <Grid container className={classes.root} alignItems="center">
      <Grid item>
        <ConditionField value={field} onChange={setField} />
      </Grid>
      <Grid item>
        <ConditionOperation value={op} onChange={setOp} />
      </Grid>
      <Grid item>
        <ConditionValue value={value} onChange={setValue} />
      </Grid>
      <Grid item className={classes.removeWrap} onClick={onRemove}>
        <Close fontSize="small" />
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    '& $removeWrap': {
      opacity: 0,
    },
    '&:hover $removeWrap': {
      opacity: 1,
    },
  },
  removeWrap: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    color: '#F44336',
  },
}));

export default Condition;
