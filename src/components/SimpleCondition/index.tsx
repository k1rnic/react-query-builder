/* eslint-disable import/no-anonymous-default-export */
import { Box } from '@material-ui/core';
import { Formik, useFormikContext } from 'formik';
import React, { FC, useEffect } from 'react';
import { QueryCondition, QueryOperation } from '../../utils/query';
import ConditionField from './Field';
import ConditionOperation from './Operation';
import ConditionValue from './Value';

export type SimpleConditionFormData = {
  field: QueryCondition[0];
  op: QueryCondition[1];
  value: QueryCondition[2];
};

export type SimpleConditionProps = {
  condition: QueryCondition;
  onChange: (condition: QueryCondition) => void;
};

const SimpleCondition: FC<SimpleConditionProps> = ({ onChange }) => {
  const {
    values: { field, op, value },
    dirty,
  } = useFormikContext<SimpleConditionFormData>();

  useEffect(() => {
    if (dirty) {
      onChange?.([field, op, value]);
    }
  }, [field, op, value]);

  return (
    <Box display="inline-flex" gridGap={1}>
      <ConditionField />
      <ConditionOperation />
      <ConditionValue />
    </Box>
  );
};

SimpleCondition.defaultProps = {
  condition: ['', QueryOperation.Equal, ''],
};

export default (props: SimpleConditionProps) => {
  const { condition } = props;
  const [field, op, value] = condition;

  return (
    <Formik initialValues={{ field, op, value }} onSubmit={() => {}}>
      <SimpleCondition {...props} />
    </Formik>
  );
};
