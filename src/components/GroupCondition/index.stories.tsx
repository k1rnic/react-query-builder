import { Meta, Story } from '@storybook/react/types-6-0';
import Component, { GroupConditionProps } from '.';
import QUERY from '../../assets/data/query';

export default {
  title: 'Query/Condition/Group',
  component: Component,
  args: {
    query: QUERY,
  },
} as Meta<GroupConditionProps>;

const Template: Story<GroupConditionProps> = (args) => <Component {...args} />;

export const Overview = Template.bind({});
