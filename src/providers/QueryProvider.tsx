/* eslint-disable import/no-anonymous-default-export */
import { Formik } from 'formik';
import React, { PropsWithChildren, useContext, useMemo } from 'react';
import { IQueryField } from '../interfaces/query-field';
import { Query, QueryLogic } from '../utils/query';

type QueryContext = {
  query: Query;
  fields: IQueryField[];
};

const Context = React.createContext<QueryContext>({
  query: {
    logic: QueryLogic.And,
    conditions: [],
  },
  fields: [],
});

type Props = {
  query: Query;
  fields: IQueryField[];
};

export default ({ query, fields, children }: PropsWithChildren<Props>) => {
  const context = useMemo(() => ({ query, fields }), [query, fields]);

  return (
    <Context.Provider value={context}>
      <Formik initialValues={query} onSubmit={() => {}}>
        {children}
      </Formik>
    </Context.Provider>
  );
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
