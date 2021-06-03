import React, { useState } from 'react';
import { QueryFieldType } from '../../../interfaces/query-field';
import { QueryOperation } from '../../../utils/query';
import Dropdown from '../../Dropdown';

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
  onChange: (value: QueryOperation) => void;
};

const Operation = ({ value, onChange }: Props) => {
  const [operations] = useState<ConditionOperationDesc[]>(DEFAULT_OPERATIONS);

  const handleChange = ({ value: op }: ConditionOperationDesc) => {
    onChange(op);
  };

  return (
    <Dropdown
      items={operations}
      selected={value}
      valueExpr="value"
      itemFormatter={({ value, label }) => `${value} ${label}`}
      onSelect={handleChange}
    />
  );
};

export default Operation;
