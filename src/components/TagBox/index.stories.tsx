import { Meta, Story } from '@storybook/react/types-6-0';
import { useState } from 'react';
import Component, { TagBoxProps } from '.';

export default {
  title: 'UI/TagBox',
  component: Component,
  args: {},
} as Meta<TagBoxProps>;

const Template: Story<TagBoxProps> = (args) => {
  const [value, setValue] = useState<string[]>([]);

  return <Component {...args} value={value} onChange={setValue} />;
};

export const Overview = Template.bind({});
