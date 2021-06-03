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
  value: QueryLogic;
  onChange: (value: QueryLogic) => void;
};

const Logic = ({ value, onChange }: Props) => {
  const handleChange = ({
    target: { value: changes },
  }: ChangeEvent<HTMLInputElement>) => {
    onChange(changes as QueryLogic);
  };
  return (
    <TextField select value={value} onChange={handleChange}>
      {LOGIC_LIST.map((item) => (
        <MenuItem key={item.value} value={item.value}>
          {item.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default Logic;
