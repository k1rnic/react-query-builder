import React from 'react';
import { QueryLogic } from '../../../utils/query';
import Dropdown from '../../Dropdown';

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
  const handleChange = ({ value: logic }: LogicDesc) => {
    onChange(logic);
  };
  return (
    <Dropdown
      items={LOGIC_LIST}
      selected={value}
      valueExpr="value"
      itemFormatter={({ label }) => label.toUpperCase()}
      valueFormatter={({ label }) => label}
      onSelect={handleChange}
    />
  );
};

export default Logic;
