import { Add, Close } from '@material-ui/icons';
import React from 'react';

type Props = {
  hidden?: boolean;
  onRemove: () => void;
};

const RemoveCondition = ({ hidden, onRemove }: Props) => (
  <>{!hidden && <Add fontSize="small" onClick={onRemove} />}</>
);

export default RemoveCondition;
