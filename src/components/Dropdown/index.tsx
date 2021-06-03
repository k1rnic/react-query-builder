import {
  Button,
  makeStyles,
  Menu,
  MenuItem,
  MenuProps,
} from '@material-ui/core';
import React, { ReactText, useCallback, useState } from 'react';
import useChangeEffect from '../../hooks/useChangeEffect';

export type DropdownProps<T = string> = {
  items: T[];
  selected?: T | ReactText;
  valueExpr?: keyof T;
  itemFormatter?: (item: T) => any;
  valueFormatter?: (item: T) => any;
  onSelect: (item: T) => void;
};

const Dropdown = <T,>({
  items,
  selected,
  valueExpr,
  valueFormatter,
  itemFormatter,
  onSelect,
}: DropdownProps<T>) => {
  const classes = useStyles();

  const [anchor, setAnchor] = useState<MenuProps['anchorEl']>(null);

  const getValueExpr = useCallback(
    (item: T): any => item?.[valueExpr as keyof T] ?? item,
    [],
  );

  const [selectedItem, setSelectedItem] = useState<T>(
    items.find(
      (item) => getValueExpr(item) === getValueExpr(selected as T),
    ) as T,
  );

  const handleChange = (changes: T) => {
    setSelectedItem(changes);
    handleClose();
  };

  const handleOpen = (e: any) => {
    setAnchor(e.currentTarget);
  };

  const handleClose = () => {
    setAnchor(null);
  };

  useChangeEffect(() => {
    onSelect(selectedItem);
  }, [selectedItem]);

  return (
    <>
      <Button size="small" onClick={handleOpen} className={classes.selected}>
        {valueFormatter?.(selectedItem) || getValueExpr(selectedItem)}
      </Button>
      <Menu keepMounted anchorEl={anchor} open={!!anchor} onClose={handleClose}>
        {items.map((item) => (
          <MenuItem
            key={getValueExpr(item)}
            selected={getValueExpr(item) === getValueExpr(selectedItem)}
            onClick={() => handleChange(item)}
          >
            {itemFormatter?.(item) || getValueExpr(item)}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  selected: {
    height: 22,
    padding: theme.spacing(0, 1),
    backgroundColor: theme.palette.action.selected,
  },
}));

export default Dropdown;
