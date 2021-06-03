import { MenuItem, TextField } from '@material-ui/core';
import React, { ChangeEvent, useState } from 'react';
import { QueryFieldType } from '../../interfaces/query-field';
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
  value: QueryOperation;
  // dataType: QueryFieldType;
  onChange: (value: QueryOperation) => void;
};

const Operation = ({ value, onChange }: Props) => {
  const [operations] = useState<ConditionOperationDesc[]>(DEFAULT_OPERATIONS);

  const handleChange = ({
    target: { value: changes },
  }: ChangeEvent<HTMLInputElement>) => {
    onChange(changes as QueryOperation);
  };

  return (
    <TextField select value={value} onChange={handleChange}>
      {operations.map((item) => (
        <MenuItem key={item.value} value={item.value}>
          {item.label || item.value}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default Operation;
