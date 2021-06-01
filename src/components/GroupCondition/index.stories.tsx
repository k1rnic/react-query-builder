import { Meta, Story } from '@storybook/react/types-6-0';
import { useState } from 'react';
import Component, { GroupConditionProps } from '.';
import QUERY from '../../assets/data/query';

export default {
  title: 'Query/Condition/Group',
  component: Component,
  args: {},
} as Meta<GroupConditionProps>;

const Template: Story<GroupConditionProps> = (args) => {
  const [query, setQuery] = useState(QUERY);

  return <Component query={query} onChange={setQuery} />;
};

export const Overview = Template.bind({});
