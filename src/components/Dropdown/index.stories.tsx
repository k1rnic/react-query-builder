import { Meta, Story } from '@storybook/react/types-6-0';
import Component, { DropdownProps } from '.';
import FIELDS from '../../assets/data/fields';
import { IQueryField } from '../../interfaces/query-field';

export default {
  title: 'UI/Dropdown',
  component: Component,
  args: {
    items: FIELDS,
    valueExpr: 'dataField',
    selected: 'gender',
    itemFormatter: ({ label }) => label,
  },
} as Meta<DropdownProps<IQueryField>>;

const Template: Story<DropdownProps<IQueryField>> = (args) => (
  <Component {...args} />
);

export const Overview = Template.bind({});
