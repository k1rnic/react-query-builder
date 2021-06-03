import { IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import React from 'react';

type Props = {
  hidden?: boolean;
  onRemove: () => void;
};

const RemoveCondition = ({ hidden, onRemove }: Props) => (
  <>
    {!hidden && (
      <IconButton onClick={onRemove} size="small">
        <Close />
      </IconButton>
    )}
  </>
);

export default RemoveCondition;
