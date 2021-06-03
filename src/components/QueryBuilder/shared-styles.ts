import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  removeWrap: {
    '& $removeCtrl': {
      opacity: 0,
    },
    '&:hover $removeCtrl': {
      opacity: 1,
    },
  },
  removeCtrl: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    color: '#F44336',
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
