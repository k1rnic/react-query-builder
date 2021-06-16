import { Box, makeStyles } from '@material-ui/core';
import cn from 'classnames';
import React, { useCallback, useEffect, useState } from 'react';
import useChangeEffect from '../../../hooks/useChangeEffect';
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

const OPERATION_DICT: Record<
  QueryOperation,
  Omit<ConditionOperationDesc, 'value'>
> = {
  [QueryOperation.Equal]: {
    label: 'equals',
    dataTypes: ['text', 'number'],
    icon: 'eq',
  },
  [QueryOperation.NotEqual]: {
    label: 'not equals',
    dataTypes: ['text', 'number'],
    icon: 'ne',
  },
  [QueryOperation.GreaterThan]: {
    label: 'greater than',
    dataTypes: ['number'],
    icon: 'gt',
  },
  [QueryOperation.GreaterOrEqual]: {
    label: 'greater or equals',
    dataTypes: ['number'],
    icon: 'gte',
  },
  [QueryOperation.LessThan]: {
    label: 'less than',
    dataTypes: ['number'],
    icon: 'lt',
  },
  [QueryOperation.LessOrEqual]: {
    label: 'less or equals',
    dataTypes: ['number'],
    icon: 'lte',
  },
  [QueryOperation.In]: {
    label: 'in',
    dataTypes: ['number', 'text'],
    icon: 'in',
  },
};

const OPERATION_LIST: ConditionOperationDesc[] = Object.keys(
  OPERATION_DICT,
).map(
  (key): ConditionOperationDesc => ({
    value: key as QueryOperation,
    ...OPERATION_DICT[key as QueryOperation],
  }),
);

type Props = {
  value: QueryOperation;
  dataType: QueryFieldType;
  onChange: (value: QueryOperation) => void;
};

const ConditionOperation = ({ value, dataType, onChange }: Props) => {
  const classes = useStyles();
  const sharedClasses = useSharedStyles();

  const [operations, setOperations] = useState<ConditionOperationDesc[]>(
    OPERATION_LIST,
  );

  const getOperationsByType = useCallback(
    (type: QueryFieldType) =>
      OPERATION_LIST.filter(({ dataTypes }) => dataTypes.includes(type)),
    [],
  );

  useEffect(() => {
    setOperations(getOperationsByType(dataType));
  }, [dataType, getOperationsByType]);

  useChangeEffect(() => {
    if (!OPERATION_DICT[value].dataTypes.includes(dataType)) {
      onChange(operations[0]?.value);
    }
  }, [dataType, operations]);

  const handleChange = ({ value: op }: ConditionOperationDesc) => {
    onChange(op);
  };

  return (
    <Dropdown
      items={operations}
      selected={value}
      valueExpr="value"
      buttonProps={{ className: classes.dropdownButton }}
      valueFormatter={({ icon }: ConditionOperationDesc) => (
        <span
          className={cn(
            sharedClasses.mathIcon,
            sharedClasses[icon as keyof typeof sharedClasses],
          )}
        />
      )}
      itemFormatter={({ icon, label }) => (
        <Box display="flex" gridGap={8}>
          <span
            className={cn(
              sharedClasses.mathIcon,
              sharedClasses[icon as keyof typeof sharedClasses],
            )}
          />
          <span>{label}</span>
        </Box>
      )}
      onSelect={handleChange}
    />
  );
};

const useStyles = makeStyles((theme) => ({
  dropdownButton: {
    color: '#663d0b',
    backgroundColor: '#fff5e9',
    '&:hover': {
      backgroundColor: '#ffddb4',
    },
  },
}));

export default ConditionOperation;
