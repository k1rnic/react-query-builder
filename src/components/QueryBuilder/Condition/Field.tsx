import { makeStyles } from '@material-ui/core';
import React from 'react';
import { IQueryField } from '../../../interfaces/query-field';
import { useQueryProvider } from '../../../providers/QueryProvider';
import Dropdown from '../../Dropdown';

type Props = {
  value: string;
  onChange: (value: string) => void;
};

const Field = ({ value, onChange }: Props) => {
  const classes = useStyles();

  const { fields } = useQueryProvider();

  const handleChange = ({ dataField }: IQueryField) => {
    onChange(dataField);
  };

  return (
    <Dropdown
      items={fields}
      selected={value}
      valueExpr="dataField"
      buttonProps={{ className: classes.dropdownButton }}
      itemFormatter={({ label }) => label}
      valueFormatter={({ label }) => label}
      onSelect={handleChange}
    />
  );
};

const useStyles = makeStyles((theme) => ({
  dropdownButton: {
    color: '#0d4755',
    backgroundColor: '#ecf7fb',
    '&:hover': {
      backgroundColor: '#b3e6f9',
    },
  },
}));

export default Field;
