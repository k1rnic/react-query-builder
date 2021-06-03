import { Box } from '@material-ui/core';
import cn from 'classnames';
import React, { useState } from 'react';
import { QueryFieldType } from '../../../interfaces/query-field';
import { QueryOperation } from '../../../utils/query';
import Dropdown from '../../Dropdown';
import useSharedStyles from '../shared-styles';

type ConditionOperationDesc = {
  value: QueryOperation;
  label?: string;
  dataTypes: QueryFieldType[];
  icon: string;
};

const DEFAULT_OPERATIONS: ConditionOperationDesc[] = [
  {
    value: QueryOperation.Equal,
    label: 'equals',
    dataTypes: ['text', 'number'],
    icon: 'eq',
  },
  {
    value: QueryOperation.NotEqual,
    label: 'not equals',
    dataTypes: ['text', 'number'],
    icon: 'ne',
  },
  {
    value: QueryOperation.GreaterThan,
    label: 'greater than',
    dataTypes: ['number'],
    icon: 'gt',
  },
  {
    value: QueryOperation.GreaterOrEqual,
    label: 'greater or equals',
    dataTypes: ['number'],
    icon: 'gte',
  },
  {
    value: QueryOperation.LessThan,
    label: 'less than',
    dataTypes: ['number'],
    icon: 'lt',
  },
  {
    value: QueryOperation.LessOrEqual,
    label: 'less or equals',
    dataTypes: ['number'],
    icon: 'lte',
  },
];

type Props = {
  value: QueryOperation;
  onChange: (value: QueryOperation) => void;
};

const Operation = ({ value, onChange }: Props) => {
  const classes = useSharedStyles();
  const [operations] = useState<ConditionOperationDesc[]>(DEFAULT_OPERATIONS);

  const handleChange = ({ value: op }: ConditionOperationDesc) => {
    onChange(op);
  };

  return (
    <Dropdown
      items={operations}
      selected={value}
      valueExpr="value"
      valueFormatter={({ icon }) => (
        <span
          className={cn(
            classes.mathIcon,
            classes[icon as keyof typeof classes],
          )}
        />
      )}
      itemFormatter={({ icon, label }) => (
        <Box display="flex" gridGap={8}>
          <span
            className={cn(
              classes.mathIcon,
              classes[icon as keyof typeof classes],
            )}
          />
          <span>{label}</span>
        </Box>
      )}
      onSelect={handleChange}
    />
  );
};

export default Operation;
