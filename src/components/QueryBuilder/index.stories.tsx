import { Box, Button } from '@material-ui/core';
import { Meta, Story } from '@storybook/react/types-6-0';
import { useState } from 'react';
import Component, { QueryBuilderProps } from '.';
import FIELDS from '../../assets/data/fields';
import QUERY from '../../assets/data/query';
import { IQueryField } from '../../interfaces/query-field';
import { Query, QueryLogic, QueryOperation } from '../../utils/query';

export default {
  title: 'Query/Builder',
  component: Component,
} as Meta<QueryBuilderProps>;

export const Overview: Story<QueryBuilderProps> = (args) => {
  const [query, setQuery] = useState<Query>(QUERY);

  return <Component query={query} fields={FIELDS} onChange={setQuery} />;
};

const TABLE_FIELDS: IQueryField[] = [
  {
    dataField: 'num_legs',
    dataType: 'number',
    label: 'legs',
  },
  {
    dataField: 'num_wings',
    dataType: 'number',
    label: 'wings',
  },
  {
    dataField: 'num_specimen_seen',
    dataType: 'number',
    label: 'specimen',
  },
];

const TABLE_QUERY: Query = {
  logic: QueryLogic.And,
  conditions: [
    ['num_legs', QueryOperation.LessThan, 8],
    ['num_specimen_seen', QueryOperation.Equal, 1],
    {
      logic: QueryLogic.Or,
      conditions: [
        ['num_legs', QueryOperation.Equal, 2],
        ['num_wings', QueryOperation.Equal, 0],
      ],
    },
  ],
};

export const WithRequest: Story<QueryBuilderProps> = (args) => {
  const URI =
    'http://192.168.10.25/back/api/v1/md/parameters/6d0550c7-2665-4027-9e9e-f3d3f1fefc12/table';

  const [query, setQuery] = useState<Query>(TABLE_QUERY);
  const [data, setData] = useState([]);

  const handleFetch = async () => {
    const res = await fetch(URI, {
      method: 'POST',
      body: JSON.stringify(query),
    }).then((res) => res.json());

    setData(res);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      gridGap={16}
    >
      <Component query={query} fields={TABLE_FIELDS} onChange={setQuery} />
      <Button size="small" color="primary" onClick={handleFetch}>
        fetch
      </Button>
    </Box>
  );
};
