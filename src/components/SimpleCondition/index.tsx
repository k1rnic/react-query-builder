/* eslint-disable import/no-anonymous-default-export */
import { Grid } from '@material-ui/core';
import { useFormikContext } from 'formik';
import React, { FC, useEffect } from 'react';
import { QueryCondition } from '../../utils/query';
import ConditionField from './Field';
import ConditionOperation from './Operation';
import ConditionValue from './Value';

export type SimpleConditionFormData = {
  field: QueryCondition[0];
  op: QueryCondition[1];
  value: QueryCondition[2];
};

export type SimpleConditionProps = {
  onChange: (condition: QueryCondition) => void;
};

const SimpleCondition: FC<SimpleConditionProps> = ({ onChange }) => {
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
    </Grid>
  );
};

export default SimpleCondition;
