import { Chip, makeStyles, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React, { ChangeEvent, useMemo } from 'react';

export type TagBoxProps = {
  value: string[];
  onChange: (value: string[]) => void;
};

const TagBox = ({ value = [], onChange }: TagBoxProps) => {
  const classes = useStyles();
  const arrayValues = useMemo(
    () => (value instanceof Array ? value : [value]),
    [value],
  );

  const handleChange = (_: ChangeEvent<{}>, value: (string | string[])[]) => {
    onChange(value as string[]);
  };

  return (
    <Autocomplete
      multiple
      freeSolo
      disableClearable
      value={arrayValues}
      onChange={handleChange}
      options={[]}
      className={classes.root}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip
            key={index}
            label={option}
            {...getTagProps({ index })}
            style={{ borderRadius: '2px' }}
            size="small"
            color="primary"
          />
        ))
      }
      renderInput={(params) => (
        <TextField {...params} className={classes.input} />
      )}
    />
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: '2px',
    '& .MuiAutocomplete-inputRoot': {},
    backgroundColor: theme.palette.grey['100'],
  },
  input: {
    '& .MuiInputBase-root': {
      padding: '0 3px 0 0',
    },
    '& .MuiInputBase-root:before': {
      content: 'none',
    },
    '& .MuiAutocomplete-input': {
      height: 24,
      borderRadius: '2px',
      padding: '0 4px !important',
      backgroundColor: theme.palette.grey['200'],
    },
  },
}));

export default TagBox;