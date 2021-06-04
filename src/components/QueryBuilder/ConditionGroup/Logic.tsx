import { makeStyles } from '@material-ui/core';
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
  const classes = useStyles();
  const handleChange = ({ value: logic }: LogicDesc) => {
    onChange(logic);
  };
  return (
    <Dropdown
      items={LOGIC_LIST}
      selected={value}
      valueExpr="value"
      buttonProps={{
        className: value === QueryLogic.And ? classes.and : classes.or,
      }}
      itemFormatter={({ label }) => label.toUpperCase()}
      valueFormatter={({ label }) => label}
      onSelect={handleChange}
    />
  );
};

const useStyles = makeStyles((theme) => ({
  and: {
    color: '#204621',
    fontWeight: theme.typography.fontWeightBold,
    backgroundColor: '#eef7ee',
    '&:hover': {
      backgroundColor: '#c1efc1',
    },
  },
  or: {
    color: '#621c17',
    fontWeight: theme.typography.fontWeightBold,
    backgroundColor: '#ffedeb',
    '&:hover': {
      backgroundColor: '#ffc1ba',
    },
  },
}));

export default Logic;
