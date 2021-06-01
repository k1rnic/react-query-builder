import { Box } from '@material-ui/core';
import React, { FC } from 'react';
import { Query, QueryCondition } from '../../utils/query';
import SimpleCondition from '../SimpleCondition';
import Logic from './Logic';

export type GroupConditionProps = {
  query: Query;
  onChange: (query: Query) => void;
};

const GroupCondition: FC<GroupConditionProps> = ({ query }) => {
  const { logic, conditions } = query;

  const Condition = ({ condition }: { condition: Query | QueryCondition }) =>
    (condition as Query)?.logic ? (
      <GroupCondition query={condition as Query} onChange={console.log} />
    ) : (
      <SimpleCondition
        condition={condition as QueryCondition}
        onChange={console.log}
      />
    );

  return (
    <Box>
      <Logic />
      {conditions.map((condition, idx) => (
        <Condition key={idx} condition={condition} />
      ))}
    </Box>
  );
};

export default GroupCondition;
