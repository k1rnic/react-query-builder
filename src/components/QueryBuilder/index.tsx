import React, { FC } from 'react';
import { IQueryField } from '../../interfaces/query-field';
import QueryProvider from '../../providers/QueryProvider';
import { Query, QueryLogic } from '../../utils/query';
import ConditionGroup from './ConditionGroup';

export type QueryBuilderProps = {
  query?: Query;
  fields: IQueryField[];
  onChange: (query: Query) => void;
};

const QueryBuilder: FC<QueryBuilderProps> = ({
  query = {
    logic: QueryLogic.And,
    conditions: [],
  },
  fields,
  onChange,
}) => {
  return (
    <QueryProvider fields={fields}>
      <ConditionGroup root query={query} onChange={onChange} />
    </QueryProvider>
  );
};

export default QueryBuilder;
