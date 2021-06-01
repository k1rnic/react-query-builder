import { MenuItem, TextField } from '@material-ui/core';
import { useField } from 'formik';
import React from 'react';
import { useQueryProvider } from '../../providers/QueryProvider';

const Field = () => {
  const { fields } = useQueryProvider();
  const [ctrl] = useField('field');

  return (
    <TextField select {...ctrl}>
      {fields.map((item) => (
        <MenuItem key={item.dataField} value={item.dataField}>
          {item.label || item.dataField}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default Field;
