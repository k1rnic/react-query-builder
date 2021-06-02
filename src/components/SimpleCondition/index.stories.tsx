import { Meta, Story } from '@storybook/react/types-6-0';
import { Formik } from 'formik';
import Component, { SimpleConditionProps } from '.';
import FIELDS from '../../assets/data/fields';
import QUERY from '../../assets/data/query';
import QueryProvider from '../../providers/QueryProvider';
import { QueryOperation } from '../../utils/query';

export default {
  title: 'Query/Condition/Simple',
  component: Component,
  decorators: [
    (Story) => (
      <QueryProvider fields={FIELDS} query={QUERY}>
        <Formik
          initialValues={['gender', QueryOperation.Equal, 'f']}
          onSubmit={() => {}}
        >
          <Story />
        </Formik>
      </QueryProvider>
    ),
  ],
} as Meta<SimpleConditionProps>;

const Template: Story<SimpleConditionProps> = (args) => <Component {...args} />;

export const Overview = Template.bind({});
