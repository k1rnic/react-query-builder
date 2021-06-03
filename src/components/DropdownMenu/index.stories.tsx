import { Meta, Story } from '@storybook/react/types-6-0';
import Component, { DropdownMenuProps } from '.';
import FIELDS from '../../assets/data/fields';
import { IQueryField } from '../../interfaces/query-field';

export default {
  title: 'UI/DropdownMenu',
  component: Component,
  args: {
    items: FIELDS,
    label: 'click',
    valueExpr: 'dataField',
    itemFormatter: ({ label }) => label,
    onSelect: console.log,
  },
} as Meta<DropdownMenuProps<IQueryField>>;

const Template: Story<DropdownMenuProps<IQueryField>> = (args) => (
  <Component {...args} />
);

export const Overview = Template.bind({});
