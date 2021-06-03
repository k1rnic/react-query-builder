import { Box, Grid, IconButton, List, ListItem } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import React, { FC, useState } from 'react';
import useChangeEffect from '../../hooks/useChangeEffect';
import { Query, QueryCondition, QueryLogic } from '../../utils/query';
import SimpleCondition from '../SimpleCondition';
import Logic from './Logic';

export type GroupConditionProps = {
  root?: boolean;
  query: Query;
  onChange: (query: Query) => void;
  onRemove?: (query: Query) => void;
};

const GroupCondition: FC<GroupConditionProps> = ({
  query,
  root = false,
  onChange,
  onRemove,
}) => {
  const [group, setGroup] = useState(query);

  useChangeEffect(() => {
    onChange(group);
  }, [group]);

  const handleLogicChange = (logic: QueryLogic) => {
    setGroup((state) => ({ ...state, logic }));
  };

  const handleSelfRemove = () => {
    onRemove?.(group);
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

  const handleChildRemove = (targetIdx: number) => {
    setGroup((state) => ({
      ...state,
      conditions: state.conditions.filter((_, idx) => idx !== targetIdx),
    }));
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      gridGap={8}
      alignItems="flex-start"
    >
      <Grid container>
        <Grid item>
          <Logic value={group.logic} onChange={handleLogicChange} />
        </Grid>
        {!root && (
          <Grid item>
            <IconButton onClick={handleSelfRemove} size="small">
              <Close />
            </IconButton>
          </Grid>
        )}
      </Grid>
      <List>
        {group.conditions.map((condition, idx) => (
          <ListItem key={idx}>
            {(condition as Query)?.logic ? (
              <GroupCondition
                query={condition as Query}
                onChange={(changes) => handleChildChange(idx, changes)}
                onRemove={() => handleChildRemove(idx)}
              />
            ) : (
              <SimpleCondition
                condition={condition as QueryCondition}
                onChange={(changes) => handleChildChange(idx, changes)}
                onRemove={() => handleChildRemove(idx)}
              />
            )}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default GroupCondition;
