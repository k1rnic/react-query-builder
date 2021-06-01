import { Box } from '@material-ui/core';
import React, { FC } from 'react';
import { Query, QueryCondition, QueryLogic } from '../../utils/query';
import SimpleCondition from '../SimpleCondition';
import Logic from './Logic';

export type GroupConditionProps = {
  query: Query;
  onChange: (query: Query) => void;
};

const GroupCondition: FC<GroupConditionProps> = ({ query, onChange }) => {
  const { logic, conditions } = query;

  const Condition = ({
    condition,
    idx,
  }: {
    condition: Query | QueryCondition;
    idx: number;
  }) =>
    (condition as Query)?.logic ? (
      <GroupCondition
        query={condition as Query}
        onChange={handleChildConditionChange(idx)}
      />
    ) : (
      <SimpleCondition
        condition={condition as QueryCondition}
        onChange={handleChildConditionChange(idx)}
      />
    );

  const handleChildConditionChange = (idx: number) => (
    condition: Query | QueryCondition,
  ) => {
    onChange({
      logic,
      conditions: [
        ...conditions.slice(0, idx),
        condition,
        ...conditions.slice(idx + 1, conditions.length),
      ],
    });
  };

  const handleLogicChange = (logic: QueryLogic) => {
    onChange({ logic, conditions });
  };

  return (
    <Box>
      <Logic logic={logic} onChange={handleLogicChange} />
      <Box>
        {conditions.map((condition, idx) => (
          <Condition key={idx} idx={idx} condition={condition} />
        ))}
      </Box>
    </Box>
  );
};

export default GroupCondition;
