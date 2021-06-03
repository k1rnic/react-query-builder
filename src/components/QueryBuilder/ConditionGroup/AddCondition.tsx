import { Box } from '@material-ui/core';
import cn from 'classnames';
import React from 'react';
import Dropdown from '../../Dropdown';
import useStyles from '../shared-styles';

const OPTION_LIST: Array<{ value: 'condition' | 'group'; label: string }> = [
  { value: 'condition', label: 'Add condition' },
  { value: 'group', label: 'Add group' },
];

type Props = {
  onConditionAdd: () => void;
  onConditionGroupAdd: () => void;
};

const AddCondition = ({ onConditionAdd, onConditionGroupAdd }: Props) => {
  const classes = useStyles();
  const handleChange = ({ value }: { value: 'condition' | 'group' }) => {
    switch (value) {
      case 'condition':
        onConditionAdd();
        break;
      case 'group':
        onConditionGroupAdd();
        break;
    }
  };

  return (
    <Box display="flex" flexDirection="column">
      <Dropdown
        items={OPTION_LIST}
        valueExpr="value"
        valueFormatter={() => (
          <span className={cn(classes.mathIcon, classes.plus)} />
        )}
        itemFormatter={({ label }) => label}
        onSelect={handleChange}
      />
    </Box>
  );
};

export default AddCondition;
