import { Box, Grid, IconButton, List, ListItem } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { FieldArray, Formik, useFormikContext } from 'formik';
import React, { FC, useEffect } from 'react';
import { Query } from '../../utils/query';
import SimpleCondition from '../SimpleCondition';
import Logic from './Logic';

export type GroupConditionProps = {
  root?: boolean;
  onChange: (query: Query) => void;
  onRemove: (query: Query) => void;
};

const GroupCondition: FC<GroupConditionProps> = ({
  root = false,
  onChange,
  onRemove,
}) => {
  const { values, dirty } = useFormikContext<Query>();

  const handleRemoveSelf = () => {
    onRemove(values);
  };

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
      <Grid container>
        <Grid item>
          <Logic />
        </Grid>
        {!root && (
          <Grid item>
            <IconButton onClick={handleRemoveSelf} size="small">
              <Close />
            </IconButton>
          </Grid>
        )}
      </Grid>
      <List>
        <FieldArray name="conditions">
          {({ replace, remove }) =>
            values.conditions.map((condition, idx) =>
              (condition as Query)?.logic ? (
                <ListItem key={idx}>
                  <Formik initialValues={condition} onSubmit={() => {}}>
                    <GroupCondition
                      onChange={(value) => replace(idx, value)}
                      onRemove={() => remove(idx)}
                    />
                  </Formik>
                </ListItem>
              ) : (
                <ListItem key={idx}>
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
