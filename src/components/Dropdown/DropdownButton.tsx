import { Button, makeStyles } from '@material-ui/core';
import cn from 'classnames';
import React, { FC, HTMLProps } from 'react';

export type Props = {
  onToggle: (e: any) => void;
};

const DropdownButton: FC<
  Props & Pick<HTMLProps<HTMLButtonElement>, 'className' | 'style'>
> = ({ children, className, style, onToggle }) => {
  const classes = useStyles();

  return (
    <Button
      size="small"
      className={cn(classes.root, className)}
      style={style}
      onClick={onToggle}
    >
      {children}
    </Button>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    height: 24,
    minWidth: 10,
    borderRadius: '2px',
    padding: theme.spacing(0, 1),
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
}));

export default DropdownButton;
