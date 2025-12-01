import type { ThemeOptions } from '@mui/material/styles';
import { tokens } from './tokens';
import {
  buttonStyleOverrides,
  checkboxStyleOverrides,
  formControlLabelOverrides,
} from './styleOverrides';

const { cc } = tokens;

export const lightThemeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: { main: cc.ref.palette.cyan['400'] },
    secondary: { main: cc.ref.palette.grey['400'] },
    success: { main: cc.ref.palette.green['400'] },
    error: { main: cc.ref.palette.red['400'] },
    warning: { main: cc.ref.palette.amber['400'] },
    info: { main: cc.ref.palette.blue['400'] },
    background: { default: cc.ref.palette.white },
  },
  components: {
    MuiButton: buttonStyleOverrides,
    MuiCheckbox: checkboxStyleOverrides,
    MuiFormControlLabel: formControlLabelOverrides,
  },
};

export const darkThemeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: { main: cc.ref.palette.cyan['300'] },
    secondary: { main: cc.ref.palette.grey['300'] },
    success: { main: cc.ref.palette.green['300'] },
    error: { main: cc.ref.palette.red['300'] },
    warning: { main: cc.ref.palette.amber['300'] },
    info: { main: cc.ref.palette.blue['300'] },
    background: { default: cc.ref.palette.black },
  },
  components: {
    MuiButton: buttonStyleOverrides,
    MuiCheckbox: checkboxStyleOverrides,
    MuiFormControlLabel: formControlLabelOverrides,
  },
};
