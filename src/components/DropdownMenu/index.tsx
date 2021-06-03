import { Menu, MenuItem, MenuProps } from '@material-ui/core';
import React, { useCallback, useState } from 'react';
import DropdownButton from '../DropdownButton';

export type DropdownMenuProps<T = string> = {
  items: T[];
  label: string;
  valueExpr?: keyof T;
  itemFormatter?: (item: T) => any;
  onSelect: (item: T) => void;
};

const Dropdown = <T,>({
  items,
  label,
  valueExpr,
  itemFormatter,
  onSelect,
}: DropdownMenuProps<T>) => {
  const [anchor, setAnchor] = useState<MenuProps['anchorEl']>(null);

  const getValueExpr = useCallback(
    (item: T): any => item?.[valueExpr as keyof T] ?? item,
    [],
  );

  const handleChange = (changes: T) => {
    onSelect?.(changes);
    handleClose();
  };

  const handleOpen = (e: any) => {
    setAnchor(e.currentTarget);
  };

  const handleClose = () => {
    setAnchor(null);
  };

  return (
    <>
      <DropdownButton onToggle={handleOpen}>{label}</DropdownButton>
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
