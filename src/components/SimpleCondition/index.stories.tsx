import { Meta, Story } from '@storybook/react/types-6-0';
import Component, { SimpleConditionProps } from '.';
import { QueryOperation } from '../../utils/query';

export default {
  title: 'Query/Condition/Simple',
  component: Component,
  args: {
    condition: ['field', QueryOperation.Equal, 'value'],
  },
} as Meta<SimpleConditionProps>;

const Template: Story<SimpleConditionProps> = (args) => <Component {...args} />;

export const Overview = Template.bind({});
