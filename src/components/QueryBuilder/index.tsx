import React, { FC } from 'react';
import { Query, QueryLogic } from '../../utils/query';
import GroupCondition from '../GroupCondition';

export type QueryBuilderProps = {
  query: Query;
};

const QueryBuilder: FC<QueryBuilderProps> = ({ query }) => {
  return <GroupCondition query={query} onChange={console.log} />;
};

QueryBuilder.defaultProps = {
  query: {
    logic: QueryLogic.And,
    conditions: [],
  },
};

export default QueryBuilder;
