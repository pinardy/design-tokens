import type { Components } from '@mui/material/styles';
import { tokens } from './tokens';
import { alpha } from '@mui/material/styles';

const { cc } = tokens;

export const buttonStyleOverrides: Components['MuiButton'] = {
  styleOverrides: {
    root: {
      fontWeight: '400',
      fontSize: 14,
      textTransform: 'capitalize',
    },
    contained: {
      '&.Mui-disabled': {
        color: alpha(cc.sem.colour.text.disabled, 0.38),
        backgroundColor: alpha(cc.sem.colour.action.disabled, 0.12),
      },
    },
    outlined: {
      '&.Mui-active': {
        color: cc.sem.colour.text.tertiary,
        border: `1px solid ${cc.sem.colour.action.tertiary}`,
      },
      '&:hover': {
        backgroundColor: alpha(cc.sem.colour.text.tertiary, 0.08),
      },
      '&.Mui-disabled': {
        color: alpha(cc.sem.colour.text.tertiary, 0.38),
        borderColor: alpha(cc.sem.colour.action.tertiary, 0.12),
      },
    },
    text: {
      '&.Mui-disabled': {
        color: alpha(cc.sem.colour.text.disabled, 0.38),
      },
    },
  },
};

export const checkboxStyleOverrides: Components['MuiCheckbox'] = {
  styleOverrides: {
    root: {
      color: alpha(cc.sem.colour.action.secondary, 0.56),
      '&.Mui-checked': {
        color: cc.sem.colour.action.primary,
      },
      '&.Mui-disabled': {
        color: alpha(cc.sem.colour.text.disabled, 0.38),
        borderColor: alpha(cc.sem.colour.action.tertiary, 0.12),
      },
      '&:hover': {
        backgroundColor: alpha(cc.sem.colour.action.primary, 0.08),
      },
    },
  },
};

export const formControlLabelOverrides: Components['MuiFormControlLabel'] = {
  styleOverrides: {
    label: {
      color: cc.sem.colour.text.tertiary,
      '&.Mui-disabled': {
        color: alpha(cc.sem.colour.text.disabled, 0.38),
      },
    },
  },
};

export const radioGroupStyleOverrides: Components['MuiRadioGroup'] = {
  styleOverrides: {
    root: {
      color: alpha(cc.sem.colour.action.secondary, 0.56),
      '&.Mui-checked': {
        color: cc.sem.colour.action.primary,
      },
      '&.Mui-disabled': {
        color: alpha(cc.sem.colour.text.disabled, 0.38),
        borderColor: alpha(cc.sem.colour.action.tertiary, 0.12),
      },
      '&:hover': {
        backgroundColor: alpha(cc.sem.colour.action.primary, 0.08),
      },
    },
  },
};

export const radioStyleOverrides: Components['MuiRadio'] = {
  styleOverrides: {
    root: {
      color: alpha(cc.sem.colour.action.secondary, 0.56),
      '&.Mui-checked': {
        color: cc.sem.colour.action.primary,
      },
      '&.Mui-disabled': {
        color: alpha(cc.sem.colour.text.disabled, 0.38),
        borderColor: alpha(cc.sem.colour.action.tertiary, 0.12),
      },
      '&:hover': {
        backgroundColor: alpha(cc.sem.colour.action.primary, 0.08),
      },
    },
  },
};

export const textFieldStyleOverrides: Components['MuiTextField'] = {
  styleOverrides: {
    root: {
      color: alpha(cc.sem.colour.action.tertiary, 0.23),
      '&.Mui-disabled': {
        color: alpha(cc.sem.colour.text.disabled, 0.38),
        borderColor: alpha(cc.sem.colour.action.tertiary, 0.12),
      },
      '&:focused': {
        color: cc.sem.colour.action.primary,
      },
    },
  },
};

export const switchStyleOverrides: Components['MuiSwitch'] = {
  styleOverrides: {
    root: {
      color: alpha(cc.sem.colour.action.tertiary, 0.23),
      '&.Mui-disabled': {
        color: alpha(cc.sem.colour.text.disabled, 0.38),
        borderColor: alpha(cc.sem.colour.action.tertiary, 0.12),
      },
      '&:focus-visible': {
        color: cc.sem.colour.action.primary,
      },
    },
    track: {
      backgroundColor: alpha(cc.sem.colour.action.tertiary, 0.14),
      borderColor: alpha(cc.sem.colour.action.tertiary, 0.12),
      '.Mui-disabled &': {
        backgroundColor: alpha(cc.sem.colour.action.disabled, 0.15),
      },
    },
  },
};
