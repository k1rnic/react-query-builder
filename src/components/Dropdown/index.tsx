import { Menu, MenuItem, MenuProps } from '@material-ui/core';
import React, { ReactText, useCallback, useState } from 'react';
import useChangeEffect from '../../hooks/useChangeEffect';
import DropdownButton from './DropdownButton';

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
    setSelectedItem({ ...changes });
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
      <DropdownButton onToggle={handleOpen}>
        {valueFormatter?.(selectedItem) || getValueExpr(selectedItem)}
      </DropdownButton>
      <Menu keepMounted anchorEl={anchor} open={!!anchor} onClose={handleClose}>
        {items.map((item) => (
          <MenuItem key={getValueExpr(item)} onClick={() => handleChange(item)}>
            {itemFormatter?.(item) || getValueExpr(item)}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default Dropdown;
