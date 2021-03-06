import {
  Box,
  Grid,
  List,
  ListItem,
  makeStyles,
  Slide,
} from '@material-ui/core';
import cn from 'classnames';
import React, { FC, useEffect, useState } from 'react';
import useArrayKeys from '../../../hooks/useArrayKeys';
import useChangeEffect from '../../../hooks/useChangeEffect';
import { useQueryProvider } from '../../../providers/QueryProvider';
import {
  Query,
  QueryCondition,
  QueryLogic,
  QueryOperation,
} from '../../../utils/query';
import Condition from '../Condition';
import useSharedStyles from '../shared-styles';
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
  const classes = useStyles();
  const sharedClasses = useSharedStyles();

  const { fields } = useQueryProvider();
  const { getKey, updateKey } = useArrayKeys();
  const [group, setGroup] = useState(query);

  useEffect(() => {
    setGroup(query);
  }, [query]);

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
    updateKey(query.conditions[targetIdx], changes);
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
    <Box display="flex" gridGap={4}>
      <AddCondition
        onConditionAdd={handleConditionAdd}
        onConditionGroupAdd={handleGroupAdd}
      />

      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        gridGap={2}
      >
        <Grid
          container
          className={cn(classes.ctrlWrap, sharedClasses.removeWrap)}
          alignItems="center"
        >
          <Grid item>
            <Logic value={group.logic} onChange={handleLogicChange} />
          </Grid>
          <Grid item className={sharedClasses.removeCtrl}>
            <RemoveCondition hidden={root} onRemove={handleSelfRemove} />
          </Grid>
        </Grid>

        <List className={classes.list}>
          {group.conditions.map((condition, idx) => (
            <Slide key={getKey(condition)} in direction="right">
              <ListItem className={classes.listItem}>
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
            </Slide>
          ))}
        </List>
      </Box>
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  ctrlWrap: {
    gap: theme.spacing(0.5),
  },
  list: {
    padding: 0,
  },
  listItem: {
    padding: theme.spacing(0.25, 0),
  },
}));

export default ConditionGroup;
