import { MenuItem, TextField } from '@material-ui/core';
import { useField, useFormikContext } from 'formik';
import React, { useEffect, useState } from 'react';
import { SimpleConditionFormData } from '.';
import { QueryFieldType } from '../../interfaces/query-field';
import { useQueryProvider } from '../../providers/QueryProvider';
import { QueryOperation } from '../../utils/query';

type ConditionOperationDesc = {
  value: QueryOperation;
  label?: string;
  dataTypes: QueryFieldType[];
  icon?: string;
};

const DEFAULT_OPERATIONS: ConditionOperationDesc[] = [
  {
    value: QueryOperation.Equal,
    label: 'equals',
    dataTypes: ['text', 'number'],
  },
  {
    value: QueryOperation.NotEqual,
    label: 'not equals',
    dataTypes: ['text', 'number'],
  },
  {
    value: QueryOperation.GreaterThan,
    label: 'greater than',
    dataTypes: ['number'],
  },
  {
    value: QueryOperation.GreaterOrEqual,
    label: 'greater or equals',
    dataTypes: ['number'],
  },
  {
    value: QueryOperation.LessThan,
    label: 'less than',
    dataTypes: ['number'],
  },
  {
    value: QueryOperation.LessOrEqual,
    label: 'less or equals',
    dataTypes: ['number'],
  },
];

type Props = {
  value: any;
  onChange: (value: any) => void;
};

const Operation = () => {
  const { fields } = useQueryProvider();

  const [operations, setOperations] = useState<ConditionOperationDesc[]>([]);
  const [ctrl, , { setValue }] = useField('op');
  const {
    values: { field },
    touched,
  } = useFormikContext<SimpleConditionFormData>();

  useEffect(() => {
    const currentField = fields.find(({ dataField }) => dataField === field);

    if (currentField) {
      setOperations(
        DEFAULT_OPERATIONS.filter(({ dataTypes }) =>
          dataTypes.includes(currentField.dataType),
        ),
      );
    }
  }, [field]);

  useEffect(() => {
    if (touched.field) {
      setValue('');
    }
  }, [field, touched.field]);

  return (
    <TextField select {...ctrl}>
      {operations.map((item) => (
        <MenuItem key={item.value} value={item.value}>
          {item.label || item.value}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default Operation;
