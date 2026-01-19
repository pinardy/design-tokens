import type { ThemeOptions } from '@mui/material/styles';
import { tokens } from './tokens';
import {
  buttonStyleOverrides,
  checkboxStyleOverrides,
  formControlLabelOverrides,
  radioGroupStyleOverrides,
  radioStyleOverrides,
  switchStyleOverrides,
  textFieldStyleOverrides,
  outlinedInputStyleOverrides,
  inputLabelStyleOverrides,
  formHelperTextOverrides,
  inputAdornmentOverrides,
  selectStyleOverrides,
  menuStyleOverrides,
  tabStyleOverrides,
} from './styleOverrides';

const { cc } = tokens;

export const lightThemeOptions: ThemeOptions = {
  typography: {
    body1: {
      fontSize: '16px',   // label + field text
      lineHeight: '140%',
      fontWeight: 400,
    },
    caption: {
      fontSize: '12px',   // helper text + adornment text
      lineHeight: '140%',
      fontWeight: 400,
    },
  },
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
    MuiRadioGroup: radioGroupStyleOverrides,
    MuiRadio: radioStyleOverrides,
     MuiSwitch: switchStyleOverrides,

    MuiTextField: textFieldStyleOverrides,             // wrapper (defaultProps: { variant: 'outlined' })
    MuiOutlinedInput: outlinedInputStyleOverrides,     // border + input text
    MuiInputLabel: inputLabelStyleOverrides,           // floating label
    MuiFormHelperText: formHelperTextOverrides,        // helper text under field
    MuiInputAdornment: inputAdornmentOverrides,        // "Kg", "$" etc.
    MuiMenu : menuStyleOverrides,
    MuiSelect: selectStyleOverrides,
    MuiTab: tabStyleOverrides,
  },
};

export const darkThemeOptions: ThemeOptions = {
  typography: {
    body1: {
      fontSize: '16px',   // label + field text
      lineHeight: '140%',
      fontWeight: 400,
    },
    caption: {
      fontSize: '12px',   // helper text + adornment text
      lineHeight: '140%',
      fontWeight: 400,
    },
  },
  palette: {
    mode: 'dark',
    primary: { main: cc.ref.palette.cyan['300'] },
    secondary: { main: cc.ref.palette.grey['300'] },
    success: { main: cc.ref.palette.green['300'] },
    error: { main: cc.ref.palette.red['300'] },
    warning: { main: cc.ref.palette.amber['300'] },
    info: { main: cc.ref.palette.blue['300'] },
    // background: { default: cc.ref.palette.black },
    background: {
      default: cc.ref.palette.black,
      paper: cc.ref.palette.black,
    },
  },
  components: {
    MuiButton: buttonStyleOverrides,
    MuiCheckbox: checkboxStyleOverrides,
    MuiFormControlLabel: formControlLabelOverrides,
    MuiRadioGroup: radioGroupStyleOverrides,
    MuiRadio: radioStyleOverrides,
    MuiSwitch: switchStyleOverrides,

    MuiTextField: textFieldStyleOverrides,
    MuiOutlinedInput: outlinedInputStyleOverrides,
    MuiInputLabel: inputLabelStyleOverrides,
    MuiFormHelperText: formHelperTextOverrides,
    MuiInputAdornment: inputAdornmentOverrides,
    MuiMenu : menuStyleOverrides,
    MuiSelect: selectStyleOverrides,
    MuiTab: tabStyleOverrides,

  },
};
