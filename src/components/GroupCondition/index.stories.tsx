import { Meta, Story } from '@storybook/react/types-6-0';
import Component, { GroupConditionProps } from '.';
import FIELDS from '../../assets/data/fields';
import QUERY from '../../assets/data/query';
import QueryProvider from '../../providers/QueryProvider';

export default {
  title: 'Query/Condition/Group',
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
} as Meta<GroupConditionProps>;

const Template: Story<GroupConditionProps> = (args) => <Component {...args} />;

export const Overview = Template.bind({});
