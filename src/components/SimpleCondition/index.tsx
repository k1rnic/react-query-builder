/* eslint-disable import/no-anonymous-default-export */
import { Grid, IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import React, { FC, useState } from 'react';
import useChangeEffect from '../../hooks/useChangeEffect';
import { QueryCondition } from '../../utils/query';
import ConditionField from './Field';
import ConditionOperation from './Operation';
import ConditionValue from './Value';

export type SimpleConditionProps = {
  condition: QueryCondition;
  onChange: (condition: QueryCondition) => void;
  onRemove: () => void;
};

const SimpleCondition: FC<SimpleConditionProps> = ({
  condition,
  onChange,
  onRemove,
}) => {
  const [field, op, value] = condition;

  const [fieldCtrl, setFieldCtrl] = useState(field);
  const [opCtrl, setOpCtrl] = useState(op);
  const [valueCtrl, setValueCtrl] = useState(value);

  useChangeEffect(() => {
    onChange([fieldCtrl, opCtrl, valueCtrl]);
  }, [fieldCtrl, opCtrl, valueCtrl]);

  return (
    <Grid container spacing={1} alignItems="center">
      <Grid item>
        <ConditionField value={fieldCtrl} onChange={setFieldCtrl} />
      </Grid>
      <Grid item>
        <ConditionOperation value={opCtrl} onChange={setOpCtrl} />
      </Grid>
      <Grid item>
        <ConditionValue value={valueCtrl} onChange={setValueCtrl} />
      </Grid>
      <Grid item>
        <IconButton onClick={onRemove} size="small">
          <Close />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default SimpleCondition;
