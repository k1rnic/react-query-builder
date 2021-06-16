import { makeStyles, Menu, MenuItem, MenuProps } from '@material-ui/core';
import React, {
  HTMLProps,
  ReactText,
  useCallback,
  useMemo,
  useState,
} from 'react';
import DropdownButton from './DropdownButton';

export type DropdownProps<T = string> = {
  items: T[];
  selected?: T | ReactText;
  valueExpr?: keyof T;
  buttonProps?: HTMLProps<HTMLButtonElement>;
  itemFormatter?: (item: T) => any;
  valueFormatter?: (item: T) => any;
  onSelect: (item: T) => void;
};

const Dropdown = <T,>({
  items,
  selected,
  valueExpr,
  buttonProps = {},
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

  const selectedItem = useMemo<T>(
    () =>
      items.find(
        (item) => getValueExpr(item) === getValueExpr(selected as T),
      ) as T,
    [selected],
  );

  const handleChange = (changes: T) => {
    onSelect(changes);
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
      <DropdownButton {...buttonProps} onToggle={handleOpen}>
        {valueFormatter?.(selectedItem) || getValueExpr(selectedItem)}
      </DropdownButton>
      <Menu
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        elevation={1}
        anchorEl={anchor}
        getContentAnchorEl={null}
        open={!!anchor}
        onClose={handleClose}
        PaperProps={{
          className: classes.dropdownPaper,
        }}
      >
        {items.map((item) => (
          <MenuItem key={getValueExpr(item)} onClick={() => handleChange(item)}>
            {itemFormatter?.(item) || getValueExpr(item)}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  dropdownPaper: {
    borderRadius: '2px',
    backgroundColor: theme.palette.grey['100'],
    '& .MuiMenu-list': {
      padding: 0,
      '& li': {
        fontSize: theme.spacing(1.85),
      },
    },
  },
}));

export default Dropdown;
