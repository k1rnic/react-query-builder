/* eslint-disable import/no-anonymous-default-export */
import { Grid, IconButton } from '@material-ui/core';
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
  const [field, setField] = useState(condition[0]);
  const [op, setOp] = useState(condition[1]);
  const [value, setValue] = useState(condition[2]);

  const debouncedValue = useDebounce(value, 500);

  useChangeEffect(() => {
    onChange([field, op, debouncedValue]);
  }, [field, op, debouncedValue]);

  return (
    <Grid container spacing={1} alignItems="center">
      <Grid item>
        <ConditionField value={field} onChange={setField} />
      </Grid>
      <Grid item>
        <ConditionOperation value={op} onChange={setOp} />
      </Grid>
      <Grid item>
        <ConditionValue value={value} onChange={setValue} />
      </Grid>
      <Grid item>
        <IconButton onClick={onRemove} size="small">
          <Close />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default Condition;
