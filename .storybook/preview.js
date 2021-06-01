import FIELDS from '../src/assets/data/fields';
import QueryProvider from '../src/providers/QueryProvider';
import '../src/styles/index.css';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => (
    <QueryProvider fields={FIELDS}>
      <Story />
    </QueryProvider>
  ),
];
