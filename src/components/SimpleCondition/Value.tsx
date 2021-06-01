import { TextField } from '@material-ui/core';
import { useField, useFormikContext } from 'formik';
import React, { useEffect } from 'react';
import { SimpleConditionFormData } from '.';
import { QueryOperation } from '../../utils/query';

type Props = {
  value: QueryOperation;
  onChange: (value: any) => void;
};

const Value = () => {
  const [ctrl, , { setValue }] = useField('value');

  const {
    values: { field },
    touched,
  } = useFormikContext<SimpleConditionFormData>();

  useEffect(() => {
    if (touched.field) {
      setValue('');
    }
  }, [field, touched.field]);

  return <TextField {...ctrl} />;
};

export default Value;
