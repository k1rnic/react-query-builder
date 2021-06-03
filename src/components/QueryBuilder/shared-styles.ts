import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  removeWrap: {
    '& $removeCtrl': {
      background: 'none',
      '& svg': {
        opacity: 0,
      },
    },
    '&:hover $removeCtrl': {
      backgroundColor: '#ffedeb',
      '& svg': {
        transform: 'rotate(45deg)',
        opacity: 1,
      },
    },
  },
  removeCtrl: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    color: '#F44336',
    borderRadius: '4px',
    '&,& svg': {
      transition: 'all 200ms ease-out 250ms',
    },
  },
  mathIcon: {
    '&:before': {
      fontFamily: 'MathIcon',
    },
  },
  eq: {
    '&:before': {
      content: '"\\f122"',
    },
  },
  ne: {
    '&:before': {
      content: '"\\f140"',
    },
  },
  gt: {
    '&:before': {
      content: '"\\f138"',
    },
  },
  gte: {
    '&:before': {
      content: '"\\f137"',
    },
  },
  lt: {
    '&:before': {
      content: '"\\f13a"',
    },
  },
  lte: {
    '&:before': {
      content: '"\\f13b"',
    },
  },
  plus: {
    '&:before': {
      content: '"\\f165"',
    },
  },
}));
