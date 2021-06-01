import { TextField } from '@material-ui/core';
import { useField, useFormikContext } from 'formik';
import React, { useEffect } from 'react';
import { QueryCondition } from '../../utils/query';

const Value = () => {
  const [ctrl, , { setValue }] = useField('2');
  const {
    values: [conditionField],
    touched: { '0': conditionFieldTouched },
  } = useFormikContext<QueryCondition>();

  useEffect(() => {
    if (conditionFieldTouched) {
      setValue('');
    }
  }, [conditionField, conditionFieldTouched]);

  return <TextField {...ctrl} />;
};

export default Value;
