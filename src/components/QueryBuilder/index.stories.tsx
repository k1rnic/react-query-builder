import { Box, Button, Grid } from '@material-ui/core';
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

export const WithControls: Story<QueryBuilderProps> = (args) => {
  const defaultQuery: Query = {
    logic: QueryLogic.And,
    conditions: [],
  };
  const [query, setQuery] = useState<Query>(TABLE_QUERY);

  const handleApply = () => {
    console.log(query);
  };

  const handleReset = () => {
    setQuery(defaultQuery);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      alignItems="flex-start"
      gridGap={16}
    >
      <Component query={query} fields={TABLE_FIELDS} onChange={setQuery} />

      <Grid container spacing={1}>
        <Grid item>
          <Button size="small" color="secondary" onClick={handleReset}>
            reset
          </Button>
        </Grid>
        <Grid item>
          <Button size="small" color="primary" onClick={handleApply}>
            apply
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
