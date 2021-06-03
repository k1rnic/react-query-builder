import { Meta, Story } from '@storybook/react/types-6-0';
import Component, { ConditionGroupProps } from '.';
import FIELDS from '../../../assets/data/fields';
import QUERY from '../../../assets/data/query';
import QueryProvider from '../../../providers/QueryProvider';

export default {
  title: 'Query/ConditionGroup',
  component: Component,
  args: {
    query: QUERY,
  },
  decorators: [
    (Story) => (
      <QueryProvider fields={FIELDS}>
        <Story />
      </QueryProvider>
    ),
  ],
} as Meta<ConditionGroupProps>;

const Template: Story<ConditionGroupProps> = (args) => <Component {...args} />;

export const Overview = Template.bind({});
