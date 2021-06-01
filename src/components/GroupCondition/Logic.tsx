import { MenuItem, TextField } from '@material-ui/core';
import { useField } from 'formik';
import React from 'react';
import { QueryLogic } from '../../utils/query';

type LogicDesc = {
  value: QueryLogic;
  label: string;
};

const LOGIC_LIST: Array<LogicDesc> = [
  { value: QueryLogic.And, label: 'and' },
  { value: QueryLogic.Or, label: 'or' },
];

const Logic = () => {
  const [ctrl] = useField('logic');

  return (
    <TextField select {...ctrl}>
      {LOGIC_LIST.map((item) => (
        <MenuItem key={item.value} value={item.value}>
          {item.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default Logic;
