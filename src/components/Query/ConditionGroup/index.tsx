import { Box, Grid, List, ListItem } from '@material-ui/core';
import React, { FC, useState } from 'react';
import useChangeEffect from '../../../hooks/useChangeEffect';
import { useQueryProvider } from '../../../providers/QueryProvider';
import {
  Query,
  QueryCondition,
  QueryLogic,
  QueryOperation,
} from '../../../utils/query';
import Condition from '../Condition';
import AddCondition from './AddCondition';
import Logic from './Logic';
import RemoveCondition from './RemoveCondition';

export type ConditionGroupProps = {
  root?: boolean;
  query: Query;
  onChange: (query: Query) => void;
  onRemove?: (query: Query) => void;
};

const ConditionGroup: FC<ConditionGroupProps> = ({
  query,
  root = false,
  onChange,
  onRemove,
}) => {
  const { fields } = useQueryProvider();
  const [group, setGroup] = useState(query);

  const handleGroupAdd = () => {
    setGroup((state) => ({
      ...state,
      conditions: [
        ...state.conditions,
        { logic: QueryLogic.And, conditions: [] },
      ],
    }));
  };

  const handleConditionAdd = () => {
    setGroup((state) => ({
      ...state,
      conditions: [
        ...state.conditions,
        [fields[0]?.dataField, QueryOperation.Equal, ''],
      ],
    }));
  };

  const handleLogicChange = (logic: QueryLogic) => {
    setGroup((state) => ({ ...state, logic }));
  };

  const handleChildChange = (
    targetIdx: number,
    changes: Query | QueryCondition,
  ) => {
    setGroup((state) => ({
      ...state,
      conditions: state.conditions.map((condition, idx) =>
        idx === targetIdx ? changes : condition,
      ),
    }));
  };

  const handleSelfRemove = () => {
    onRemove?.(group);
  };

  const handleChildRemove = (targetIdx: number) => {
    setGroup((state) => ({
      ...state,
      conditions: state.conditions.filter((_, idx) => idx !== targetIdx),
    }));
  };

  useChangeEffect(() => {
    onChange(group);
  }, [group]);

  return (
    <Box display="flex">
      <AddCondition
        onConditionAdd={handleConditionAdd}
        onConditionGroupAdd={handleGroupAdd}
      />

      <Box display="flex" flexDirection="column" alignItems="flex-start">
        <Grid container alignItems="center">
          <Grid item>
            <Logic value={group.logic} onChange={handleLogicChange} />
          </Grid>
          <Grid item>
            <RemoveCondition hidden={root} onRemove={handleSelfRemove} />
          </Grid>
        </Grid>

        <List>
          {group.conditions.map((condition, idx) => (
            <ListItem key={idx}>
              {(condition as Query)?.logic ? (
                <ConditionGroup
                  query={condition as Query}
                  onChange={(changes) => handleChildChange(idx, changes)}
                  onRemove={() => handleChildRemove(idx)}
                />
              ) : (
                <Condition
                  condition={condition as QueryCondition}
                  onChange={(changes) => handleChildChange(idx, changes)}
                  onRemove={() => handleChildRemove(idx)}
                />
              )}
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default ConditionGroup;
