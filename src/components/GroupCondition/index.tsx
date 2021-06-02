import { Box, List, ListItem } from '@material-ui/core';
import { FieldArray, Formik, useFormikContext } from 'formik';
import React, { FC, useEffect } from 'react';
import { Query } from '../../utils/query';
import SimpleCondition from '../SimpleCondition';
import Logic from './Logic';

export type GroupConditionProps = {
  onChange: (query: Query) => void;
};

const GroupCondition: FC<GroupConditionProps> = ({ onChange }) => {
  const { values, dirty } = useFormikContext<Query>();

  useEffect(() => {
    if (dirty) {
      onChange(values);
    }
  }, [values, dirty]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      gridGap={8}
      alignItems="flex-start"
    >
      <Logic />
      <List>
        <FieldArray name="conditions">
          {({ replace, remove }) =>
            values.conditions.map((condition, idx) =>
              (condition as Query)?.logic ? (
                <ListItem key={JSON.stringify(condition) + idx}>
                  <Formik initialValues={condition} onSubmit={() => {}}>
                    <GroupCondition onChange={(value) => replace(idx, value)} />
                  </Formik>
                </ListItem>
              ) : (
                <ListItem key={JSON.stringify(condition) + idx}>
                  <Formik initialValues={condition} onSubmit={() => {}}>
                    <SimpleCondition
                      onChange={(value) => replace(idx, value)}
                      onRemove={() => remove(idx)}
                    />
                  </Formik>
                </ListItem>
              ),
            )
          }
        </FieldArray>
      </List>
    </Box>
  );
};

export default GroupCondition;
