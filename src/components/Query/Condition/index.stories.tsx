import { Meta, Story } from '@storybook/react/types-6-0';
import Component, { ConditionProps } from '.';
import FIELDS from '../../../assets/data/fields';
import QueryProvider from '../../../providers/QueryProvider';
import { QueryOperation } from '../../../utils/query';

export default {
  title: 'Query/Condition',
  component: Component,
  args: {
    condition: ['gender', QueryOperation.Equal, 'f'],
  },
  decorators: [
    (Story) => (
      <QueryProvider fields={FIELDS}>
        <Story />
      </QueryProvider>
    ),
  ],
} as Meta<ConditionProps>;

const Template: Story<ConditionProps> = (args) => <Component {...args} />;

export const Overview = Template.bind({});
