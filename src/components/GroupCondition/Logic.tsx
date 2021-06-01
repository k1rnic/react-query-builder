import { MenuItem, TextField } from '@material-ui/core';
import React, { ChangeEvent } from 'react';
import { QueryLogic } from '../../utils/query';

type LogicDesc = {
  value: QueryLogic;
  label: string;
};

const LOGIC_LIST: Array<LogicDesc> = [
  { value: QueryLogic.And, label: 'and' },
  { value: QueryLogic.Or, label: 'or' },
];

type Props = {
  logic: QueryLogic;
  onChange: (logic: QueryLogic) => void;
};

const Logic = ({ logic, onChange }: Props) => {
  const handleChange = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    onChange(value as QueryLogic);
  };

  return (
    <TextField select value={logic} onChange={handleChange}>
      {LOGIC_LIST.map((item) => (
        <MenuItem key={item.value} value={item.value}>
          {item.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default Logic;
