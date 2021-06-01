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
          {({ replace }) =>
            values.conditions.map((condition, idx) => (
              <ListItem>
                {(condition as Query)?.logic ? (
                  <Formik
                    key={idx}
                    initialValues={condition}
                    onSubmit={() => {}}
                  >
                    <GroupCondition onChange={(value) => replace(idx, value)} />
                  </Formik>
                ) : (
                  <Formik
                    key={idx}
                    initialValues={condition}
                    onSubmit={() => {}}
                  >
                    <SimpleCondition
                      onChange={(value) => replace(idx, value)}
                    />
                  </Formik>
                )}
              </ListItem>
            ))
          }
        </FieldArray>
      </List>
    </Box>
  );
};

export default GroupCondition;
