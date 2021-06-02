import { MenuItem, TextField } from '@material-ui/core';
import { useField, useFormikContext } from 'formik';
import React, { useCallback, useEffect, useState } from 'react';
import { QueryFieldType } from '../../interfaces/query-field';
import { useQueryProvider } from '../../providers/QueryProvider';
import { QueryCondition, QueryOperation } from '../../utils/query';

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

const Operation = () => {
  const { fields } = useQueryProvider();
  const [operations, setOperations] = useState<ConditionOperationDesc[]>(
    DEFAULT_OPERATIONS,
  );
  const [ctrl, , { setValue }] = useField('1');

  const {
    values: [conditionField],
  } = useFormikContext<QueryCondition>();

  const setOperationsByField = useCallback(
    (fieldName: string) => {
      const field = fields.find(({ dataField }) => dataField === fieldName);

      if (field) {
        const operationsByType = DEFAULT_OPERATIONS.filter(({ dataTypes }) =>
          dataTypes.includes(field.dataType),
        );

        const currentSuitableOperation =
          operationsByType.find(({ value }) => value === ctrl.value)?.value ||
          operationsByType[0]?.value;

        setOperations(operationsByType);
        setValue(currentSuitableOperation);
      }
    },
    [ctrl.value],
  );

  useEffect(() => {
    setOperationsByField(conditionField);
  }, [conditionField, setOperationsByField]);

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
