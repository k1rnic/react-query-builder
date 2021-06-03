import { MenuItem, TextField } from '@material-ui/core';
import React, { ChangeEvent } from 'react';
import { useQueryProvider } from '../../providers/QueryProvider';

type Props = {
  value: string;
  onChange: (value: string) => void;
};

const Field = ({ value, onChange }: Props) => {
  const { fields } = useQueryProvider();

  const handleChange = ({
    target: { value: changes },
  }: ChangeEvent<HTMLInputElement>) => {
    onChange(changes);
  };

  return (
    <TextField select value={value} onChange={handleChange}>
      {fields.map((item) => (
        <MenuItem key={item.dataField} value={item.dataField}>
          {item.label || item.dataField}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default Field;
