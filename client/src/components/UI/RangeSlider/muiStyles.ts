import { makeStyles } from '@mui/styles'

export const useStyles = makeStyles(() => ({
  root: {
    color: 'red', // Цвет линии
    height: 3, // Высота ползунков
  },
  thumb: {
    height: 16,
    width: 16,
    backgroundColor: '#ffffff',
    border: '1px solid #1d1d1d',

    '&:hover': {
      boxShadow: '0 0 0 8px rgba(172, 140, 117, 0.16)',
    },
  },
  active: {
    boxShadow: '0 0 0 14px rgba(172, 140, 117, 0.16) !important',
  },
}))
