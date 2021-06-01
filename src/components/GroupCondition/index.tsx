import { Box } from '@material-ui/core';
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
    <Box>
      <Logic />
      <Box>
        <FieldArray name="conditions">
          {({ replace }) =>
            values.conditions.map((condition, idx) =>
              (condition as Query)?.logic ? (
                <Formik key={idx} initialValues={condition} onSubmit={() => {}}>
                  <GroupCondition onChange={(value) => replace(idx, value)} />
                </Formik>
              ) : (
                <Formik key={idx} initialValues={condition} onSubmit={() => {}}>
                  <SimpleCondition onChange={(value) => replace(idx, value)} />
                </Formik>
              ),
            )
          }
        </FieldArray>
      </Box>
    </Box>
  );
};

export default GroupCondition;
