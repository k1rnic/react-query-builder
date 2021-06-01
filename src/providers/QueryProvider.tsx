/* eslint-disable import/no-anonymous-default-export */
import React, { PropsWithChildren, useContext, useMemo } from 'react';
import { IQueryField } from '../interfaces/query-field';

type QueryContext = {
  fields: IQueryField[];
};

const Context = React.createContext<QueryContext>({
  fields: [],
});

type Props = {
  fields: IQueryField[];
};

export default ({ fields, children }: PropsWithChildren<Props>) => {
  const context = useMemo(() => ({ fields }), [fields]);

  return <Context.Provider value={context}>{children}</Context.Provider>;
};

export const useQueryProvider = () => {
  const context = useContext(Context);

  if (!context) {
    console.error(
      `useQueryProvider should be used in pair with QueryProvider.`,
    );
  }

  return context;
};
