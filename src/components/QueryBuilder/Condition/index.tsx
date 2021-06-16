/* eslint-disable import/no-anonymous-default-export */
import { Grid, makeStyles } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import cn from 'classnames';
import React, { FC, useEffect, useState } from 'react';
import useChangeEffect from '../../../hooks/useChangeEffect';
import useDebounce from '../../../hooks/useDebounce';
import { QueryFieldType } from '../../../interfaces/query-field';
import { useQueryProvider } from '../../../providers/QueryProvider';
import { QueryCondition } from '../../../utils/query';
import useSharedStyles from '../shared-styles';
import ConditionField from './Field';
import ConditionOperation from './Operation';
import ConditionValue from './Value';

export type ConditionProps = {
  condition: QueryCondition;
  onChange: (condition: QueryCondition) => void;
  onRemove: () => void;
};

const Condition: FC<ConditionProps> = ({ condition, onChange, onRemove }) => {
  const classes = useStyles();
  const sharedClasses = useSharedStyles();

  const { fields } = useQueryProvider();

  const [dataType, setDataType] = useState<QueryFieldType>();
  const [field, setField] = useState(condition[0]);
  const [op, setOp] = useState(condition[1]);
  const [value, setValue] = useState(condition[2]);

  const debouncedValue = useDebounce(value, 500);

  useChangeEffect(() => {
    setValue('');
  }, [op]);

  useEffect(() => {
    setDataType(fields.find(({ dataField }) => dataField === field)!.dataType);
  }, [field]);

  useChangeEffect(() => {
    onChange([field, op, debouncedValue]);
  }, [field, op, debouncedValue]);

  return (
    <Grid
      container
      className={cn(classes.root, sharedClasses.removeWrap)}
      alignItems="center"
    >
      <Grid item>
        <ConditionField value={field} onChange={setField} />
      </Grid>
      <Grid item>
        <ConditionOperation value={op} dataType={dataType!} onChange={setOp} />
      </Grid>
      <Grid item>
        <ConditionValue value={value} op={op} onChange={setValue} />
      </Grid>
      <Grid item className={sharedClasses.removeCtrl} onClick={onRemove}>
        <Add />
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    gap: theme.spacing(0.5),
  },
}));

export default Condition;
