/* eslint-disable import/no-anonymous-default-export */
import { Grid, IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { useFormikContext } from 'formik';
import React, { FC, useEffect } from 'react';
import { QueryCondition } from '../../utils/query';
import ConditionField from './Field';
import ConditionOperation from './Operation';
import ConditionValue from './Value';

export type SimpleConditionProps = {
  onChange: (condition: QueryCondition) => void;
  onRemove: () => void;
};

const SimpleCondition: FC<SimpleConditionProps> = ({ onChange, onRemove }) => {
  const { values, dirty } = useFormikContext<QueryCondition>();

  useEffect(() => {
    if (dirty) {
      onChange(values);
    }
  }, [values, dirty]);

  return (
    <Grid container spacing={1}>
      <Grid item>
        <ConditionField />
      </Grid>
      <Grid item>
        <ConditionOperation />
      </Grid>
      <Grid item>
        <ConditionValue />
      </Grid>
      <Grid item>
        <IconButton onClick={onRemove} size="small">
          <Close />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default SimpleCondition;
