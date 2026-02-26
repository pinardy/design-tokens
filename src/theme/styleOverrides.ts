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
      color: cc.sem.colour.text.tertiary,
      borderColor: cc.sem.colour.action.tertiary,
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
      // enabled label text (PDF: grey00)
      color: cc.ref.palette.grey['00'],

      // disabled label text (PDF: grey00 @ 0.38)
      '&.Mui-disabled': {
        color: alpha(cc.ref.palette.grey['00'], 0.38),
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
        backgroundColor: alpha(cc.sem.colour.action.primary, 0.0),
      },
    },
  },
};

export const textFieldStyleOverrides: Components['MuiTextField'] = {
  defaultProps: {
    variant: 'outlined',
  },
};
export const outlinedInputStyleOverrides: Components['MuiOutlinedInput'] = {
  styleOverrides: {
    root: {
      // Enabled border
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: alpha(cc.ref.palette.grey['00'], 0.23),
      },

      // Hovered border
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: cc.ref.palette.grey['00'],
      },

      // Focused border
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: cc.ref.palette.cyan['400'],
      },

      // Disabled border
      '&.Mui-disabled .MuiOutlinedInput-notchedOutline': {
        borderColor: alpha(cc.ref.palette.grey['00'], 0.23),
        WebkitTextFillColor: alpha(cc.ref.palette.grey['00'], 0.38),
      },

      // Error border
      '&.Mui-error .MuiOutlinedInput-notchedOutline': {
        borderColor: cc.ref.palette.red['400'],
      },
    },

    // The actual text in the input
    input: {
      color: cc.ref.palette.grey['00'],

      // Has value: False → placeholder
      '::placeholder': {
        color: alpha(cc.ref.palette.grey['00'], 0.7),
        opacity: 1,
      },

      // Disabled text
      '&.Mui-disabled': {
        color: alpha(cc.ref.palette.grey['00'], 0.38),
      },
    },
  },
};
export const inputLabelStyleOverrides: Components['MuiInputLabel'] = {
  styleOverrides: {
    root: {
      // Enabled label
      color: alpha(cc.ref.palette.grey['00'], 0.7),

      // Focused label
      '&.Mui-focused': {
        color: cc.ref.palette.cyan['400'],
      },

      // Error label
      '&.Mui-error': {
        color: cc.ref.palette.red['400'],
      },

      // Disabled label
      '&.Mui-disabled': {
        color: alpha(cc.ref.palette.grey['00'], 0.38),
      },
    },
  },
};
export const formHelperTextOverrides: Components['MuiFormHelperText'] = {
  styleOverrides: {
    root: {
      // Enabled / Focused / Hovered helper text
      color: alpha(cc.ref.palette.grey['00'], 0.7),

      // Error helper text
      '&.Mui-error': {
        color: cc.ref.palette.red['400'],
      },

      // Disabled helper text
      '&.Mui-disabled': {
        color: alpha(cc.ref.palette.grey['00'], 0.38),
      },
    },
  },
};
export const inputAdornmentOverrides: Components['MuiInputAdornment'] = {
  styleOverrides: {
    root: {
      // Enabled / Focused / Hovered / Error
      color: alpha(cc.ref.palette.grey['00'], 0.7),

      // Disabled
      '.MuiInputBase-root.Mui-disabled &': {
        // text/disabled
        color: alpha(cc.ref.palette.grey['00'], 0.38),
      },
    },
  },
};

export const switchStyleOverrides: Components['MuiSwitch'] = {
  // defaultProps: {
  //   disableRipple: true,
  // },
  styleOverrides: {
    //knob (Unchecked state)
    thumb: {
      backgroundColor: cc.ref.palette.grey['300'],
    },
    //track behind (unchecked state)
    track: {
      backgroundColor: alpha(cc.ref.palette.grey['00'], 0.14),
      opacity: 1,
    },
    switchBase: {
      // unchecked state
      '&:hover': {
        backgroundColor: alpha(cc.ref.palette.grey['00'], 0.08),
      },
      '&:active': {
        backgroundColor: alpha(cc.ref.palette.grey['00'], 0.3),
      },
      '&.Mui-focusVisible': {
        backgroundColor: alpha(cc.ref.palette.grey['00'], 0.3),
      },

      //Checked state
      '&.Mui-checked': {
        '& .MuiSwitch-thumb': {
          backgroundColor: cc.ref.palette.cyan['400'],
        },
        '& + .MuiSwitch-track': {
          backgroundColor: alpha(cc.ref.palette.cyan['400'], 0.5),
          opacity: 1,
        },
        // hover halo (checked state)
        '&:hover': {
          backgroundColor: alpha(cc.ref.palette.cyan['400'], 0.08),
        },
        '&:active': {
          backgroundColor: alpha(cc.ref.palette.cyan['400'], 0.3),
        },
      },
      '&.Mui-checked.Mui-focusVisible': {
        backgroundColor: alpha(cc.ref.palette.cyan['400'], 0.3),
      },
      //Disabled (disabled state)
      '&.Mui-disabled': {
        '& .MuiSwitch-thumb': {
          backgroundColor: cc.ref.palette.grey['600'],
        },
      },
      //track (disabled state)
      '&.Mui-disabled + .MuiSwitch-track': {
        backgroundColor: alpha(cc.ref.palette.grey['00'], 0.12),
        opacity: 1,
      },
    },
  },
};

export const tabStyleOverrides: Components['MuiTab'] = {
  styleOverrides: {
    root: ({ ownerState }) => {
      const intent = ownerState.textColor;
      const isPrimary = intent === 'primary';

      // Override colour regardless of light or dark theme
      const activeColor = isPrimary ? cc.ref.palette.cyan['400'] : cc.ref.palette.grey['400'];

      return {
        // Inactive state
        color: alpha(cc.ref.palette.grey['00'], 0.7),

        '&.Mui-disabled': {
          color: alpha(cc.ref.palette.grey['00'], 0.38),
          // opacity: 1,
        },

        '& .MuiTab-iconWrapper': {
          color: 'inherit',
        },

        '&:not(.Mui-selected)': {
          '&.Mui-focusVisible, &:active': {
            backgroundColor: alpha(cc.ref.palette.grey['00'], 0.3),
          },
        },

        // Active
        '&.Mui-selected': {
          color: activeColor,

          '&.Mui-focusVisible': {
            backgroundColor: alpha(activeColor, 0.09),
          },

          '&:active': {
            backgroundColor: alpha(activeColor, 0.3),
          },
        },
      };
    },
  },
};

export const menuStyleOverrides: Components['MuiMenu'] = {
  styleOverrides: {
    paper: {
      // Select dropdown menu background
      backgroundColor: cc.sem.colour.paper.elevation['06'],
    },
  },
};

export const selectStyleOverrides: Components['MuiSelect'] = {
  styleOverrides: {
    root: {
      color: alpha(cc.ref.palette.grey['00'], 0.7),

      // chevron icon colour
      '& .MuiSelect-icon': {
        color: alpha(cc.ref.palette.grey['00'], 0.56),
      },

      // disabled state
      '&.Mui-disabled': {
        color: alpha(cc.ref.palette.grey['00'], 0.38),

        '& .MuiSelect-icon': {
          color: alpha(cc.ref.palette.grey['00'], 0.38),
        },
      },
    },
  },
};

export const menuItemStyleOverrides: Components['MuiMenuItem'] = {
  styleOverrides: {
    root: {
      color: cc.ref.palette.grey['00'],
      fontSize: 14,

      '&:hover': {
        backgroundColor: alpha(cc.ref.palette.grey['00'], 0.08),
      },

      '&.Mui-selected': {
        backgroundColor: alpha(cc.ref.palette.cyan['400'], 0.08),

        '&:hover': {
          backgroundColor: alpha(cc.ref.palette.cyan['400'], 0.08),
        },
      },

      '&.Mui-disabled': {
        color: alpha(cc.ref.palette.grey['00'], 0.38),
      },
    },
  },
};

export const toolTipOverrides: Components['MuiTooltip'] = {
  styleOverrides: {
    tooltip: {
      backgroundColor: alpha(cc.sem.colour.background.tooltip, 0.9),
      color: cc.ref.palette.grey['00'],
    },
  },
};

export const chipStyleOverrides: Components['MuiChip'] = {
  styleOverrides: {
    root: ({ ownerState }) => {
      const intent = ownerState.color;
      const isPrimary = intent === 'primary';
      const isOutlined = ownerState.variant === 'outlined';

      const activeColor = isPrimary
        ? cc.ref.palette.cyan['400']
        : cc.ref.palette.grey['400'];

      const outlinedStyles = {
        borderColor: activeColor,
        color: activeColor,

        '&.MuiChip-clickable:hover': {
          backgroundColor: alpha(activeColor, 0.08),
        },

        '&.Mui-focusVisible, &.MuiChip-clickable:active': {
          backgroundColor: alpha(activeColor, 0.30),
        },

        '&.Mui-disabled': {
          borderColor: alpha(activeColor, 0.38),
          color: alpha(activeColor, 0.38),
        },
      } as const;

      const filledPrimaryStyles = {
        backgroundColor: activeColor,
        color: alpha(cc.ref.palette.grey['1000'], 0.87),

        '&.Mui-disabled': {
          backgroundColor: alpha(cc.ref.palette.grey['00'], 0.06),
          color: alpha(cc.ref.palette.grey['00'], 0.38),
        },
      } as const;

      const filledSecondaryStyles = {
        backgroundColor: activeColor,
        color: alpha(cc.ref.palette.grey['1000'], 0.87),

        '&.Mui-disabled': {
          backgroundColor: alpha(cc.ref.palette.grey['400'], 0.38),
          color: alpha(cc.ref.palette.grey['1000'], 0.33),
        },

        '&.MuiChip-clickable:hover': {
          backgroundColor: cc.ref.palette.grey['600'],
        },

        '&.Mui-focusVisible, &.MuiChip-clickable:active': {
          backgroundColor: cc.ref.palette.grey['600'],
        },
      } as const;

      if (isOutlined) {
        return outlinedStyles;
      }

      return isPrimary ? filledPrimaryStyles : filledSecondaryStyles;
    },
  },
};
export const skeletonOverrides : Components['MuiSkeleton'] = {
  styleOverrides: {
    root: {
      backgroundColor: alpha(cc.ref.palette.grey['00'], 0.04),
    },
  },
};

export const sliderOverrides: Components['MuiSlider'] = {
  styleOverrides: {
    // Disabled state
    root: {
      '&.Mui-disabled': {
        '& .MuiSlider-thumb': {
          backgroundColor: cc.sem.colour.action.secondary,
          boxShadow: 'none',
        },

        '& .MuiSlider-track': {
          backgroundColor: cc.sem.colour.action.secondary,
        },
        '& .MuiSlider-rail': {
          backgroundColor: alpha(cc.sem.colour.action.secondary, 0.38),
        },

        '& .MuiSlider-mark': {
          backgroundColor: cc.sem.colour.action.secondary,
        },

        '& .MuiSlider-markActive': {
          backgroundColor: cc.sem.colour.paper.elevation['00'],
        },
      },
    },

    // Enabled state
    thumb: {
      backgroundColor: cc.sem.colour.action.primary,
      // Box shadow for hover effect
      '&:hover, &.Mui-focusVisible': {
        boxShadow: `0 0 0 8px ${
          alpha(cc.sem.colour.action.primary,0.16)
        }`,
      },
    },

    // selected area
    track: {
      backgroundColor: cc.sem.colour.action.primary,
    },

    // Unselected area
    rail: {
      backgroundColor: alpha(cc.sem.colour.action.primary, 0.38),
    },

    // Selected marker dot
    mark: {
      backgroundColor: cc.sem.colour.action.primary,
    },

    // Unselected marker dot
    markActive: {
      backgroundColor: cc.sem.colour.paper.elevation['00'],
    },

    // Value label (tooltip) 
    valueLabel: { 
      '& .MuiSlider-valueLabelCircle': {
        backgroundColor: cc.ref.palette.grey['600'],
      },
      '& .MuiSlider-valueLabelLabel': {
        color: alpha(cc.ref.palette.grey['00'], 0.7),
      },
    },
  },
};

export const backdropOverrides: Components['MuiBackdrop'] = 
{
  styleOverrides:
  {
    root:
    {
      backgroundColor: '#363636'
    }
  }
}

export const dialogTitleOverrides: Components['MuiDialogTitle'] = 
{
  styleOverrides:
  {
    root:
    {
      color: cc.ref.palette.grey['00']
    }
  }
}

export const circularProgressOverrides: Components["MuiCircularProgress"] = {
  styleOverrides: {
    root: {
      color: cc.ref.palette.cyan['400'],
    }
  },
};

export const toggleButtonOverrides: Components['MuiToggleButton'] =
{
  styleOverrides:
  {
    root:
    {
      /* -------------- Unselected ------------------ */
      color: cc.ref.palette.grey['00'],

      borderColor: alpha(cc.ref.palette.grey['00'], 0.12),

      '& .MuiSvgIcon-root':
      {
        color: alpha(cc.ref.palette.grey['00'], 0.7),
      },

      // Hover - activeState colour is transparent here, can just set the colour value with alpha 0.08
      '&:hover':
      {
        backgroundColor: alpha(cc.ref.palette.grey['00'], 0.08),
      },

      //Pressed focused
      '&:active':
      {
        backgroundColor: alpha(cc.ref.palette.grey['00'], 0.12),
      },

      '&.Mui-focusVisible':
      {
        backgroundColor: alpha(cc.ref.palette.grey['00'], 0.12),
      },

      '&.Mui-disabled':
      {
        color: alpha(cc.ref.palette.grey['00'], 0.38),
        borderColor: alpha(cc.ref.palette.grey['00'], 0.12),

        // To prevent MUI global opacity dimming
        opacity: 1,

        '& .MuiSvgIcon-root':
        {
          color: alpha(cc.ref.palette.grey['00'], 0.38),
        },
      },

      /* -------------- Selected ------------------  */
      '&.Mui-selected': {
        backgroundColor: alpha(cc.ref.palette.grey['00'], 0.16),
        borderColor: alpha(cc.ref.palette.grey['00'], 0.12),
        color: cc.ref.palette.grey['00'],

        '& .MuiSvgIcon-root': {
          color: cc.ref.palette.grey['00'],
        },
      },


      // Final_Hover_colour = active_state_clr + hover_overlay_colour
      '&.Mui-selected:hover': {
        backgroundColor: alpha(cc.ref.palette.grey['00'], 0.24),
      },

      '&.Mui-selected:active': {
        backgroundColor: alpha(cc.ref.palette.grey['00'], 0.12),
      },

      '&.Mui-selected:focusVisible':
      {
        backgroundColor: alpha(cc.ref.palette.grey['00'], 0.12),
      },
    },
  },
};

export const linkStyleOverrides: Components['MuiLink'] = {
  defaultProps: {
    underline: 'hover',
  },
  styleOverrides: {
    root: ({ ownerState }) => {
      const linkColor = ownerState.color;

      const primaryColor = cc.ref.palette.cyan['400'];
      const secondaryColor = cc.ref.palette.grey['00'];
      const focusBorderColor = cc.ref.palette.cyan['600'];

      const activeColor =
        linkColor === 'primary'
          ? primaryColor
          : linkColor === 'secondary'
          ? secondaryColor
          : primaryColor; 

      return {
        color: activeColor,

        '&:focus-visible': {
          outline: `2px solid ${focusBorderColor}`,
          outlineOffset: '2px',
          borderRadius: 2,
        },

        '&:visited': {
          color: activeColor,
        },
      };
    },
  },
};






