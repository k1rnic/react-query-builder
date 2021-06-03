import React, { FC } from 'react';
import { IQueryField } from '../../interfaces/query-field';
import QueryProvider from '../../providers/QueryProvider';
import { Query, QueryLogic } from '../../utils/query';
import GroupCondition from '../GroupCondition';

export type QueryBuilderProps = {
  query: Query;
  fields: IQueryField[];
  onChange: (query: Query) => void;
};

const QueryBuilder: FC<QueryBuilderProps> = ({ query, fields, onChange }) => {
  return (
    <QueryProvider fields={fields}>
      <GroupCondition root query={query} onChange={onChange} />
    </QueryProvider>
  );
};

QueryBuilder.defaultProps = {
  query: {
    logic: QueryLogic.And,
    conditions: [],
  },
};

export default QueryBuilder;
