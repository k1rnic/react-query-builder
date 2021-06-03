import React from 'react';
import { IQueryField } from '../../interfaces/query-field';
import { useQueryProvider } from '../../providers/QueryProvider';
import Dropdown from '../Dropdown';

type Props = {
  value: string;
  onChange: (value: string) => void;
};

const Field = ({ value, onChange }: Props) => {
  const { fields } = useQueryProvider();

  const handleChange = ({ dataField }: IQueryField) => {
    onChange(dataField);
  };

  return (
    <Dropdown
      items={fields}
      selected={value}
      valueExpr="dataField"
      itemFormatter={({ label }) => label}
      valueFormatter={({ label }) => label}
      onSelect={handleChange}
    />
  );
};

export default Field;
