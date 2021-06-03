import { Meta, Story } from '@storybook/react/types-6-0';
import Component, { QueryBuilderProps } from '.';
import FIELDS from '../../assets/data/fields';
import QUERY from '../../assets/data/query';

export default {
  title: 'Query/Builder',
  component: Component,
  args: {
    query: QUERY,
    fields: FIELDS,
  },
} as Meta<QueryBuilderProps>;

const Template: Story<QueryBuilderProps> = (args) => <Component {...args} />;

export const Overview = Template.bind({});
