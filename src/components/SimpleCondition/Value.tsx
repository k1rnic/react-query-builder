import { TextField } from '@material-ui/core';
import React, { ChangeEvent } from 'react';

type Props = {
  value: any;
  onChange: (value: any) => void;
};

const Value = ({ value, onChange }: Props) => {
  const handleChange = ({
    target: { value: changes },
  }: ChangeEvent<HTMLInputElement>) => {
    onChange(changes);
  };

  return <TextField value={value} onChange={handleChange} />;
};

export default Value;
