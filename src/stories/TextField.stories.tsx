import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { lightThemeOptions, darkThemeOptions } from '../theme/themeOptions';

type TextFieldStoryProps = {
  themeMode?: 'light' | 'dark';
};

const meta: Meta<TextFieldStoryProps> = {
  title: 'Overall/TextField',
  args: {
    themeMode: 'light',
  },
  argTypes: {
    themeMode: {
      control: 'radio',
      options: ['light', 'dark'],
    },
  },
};

export default meta;

type Story = StoryObj<TextFieldStoryProps>;

/* -------------------------------------------------------------------------- */
/*                           Themed TextField Row                             */
/* -------------------------------------------------------------------------- */

const ThemedTextFieldRow: React.FC<{ themeMode: 'light' | 'dark' }> = ({ themeMode }) => {
  const theme = createTheme(themeMode === 'light' ? lightThemeOptions : darkThemeOptions);

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          mt: 4,
        }}
      >
        <Stack direction="row" spacing={4} alignItems="center">
          {/* Default */}
          <TextField label="Default" />

          {/* Filled */}
          <TextField label="Filled" variant="filled" />

          {/* Error */}
          <TextField label="Error" error helperText="Incorrect entry" />

          {/* Disabled */}
          <TextField label="Disabled" disabled />
        
          {/* Password */}
          <TextField label="Password" type="password" />
        </Stack>
      </Box>
    </ThemeProvider>
  );
};

/* -------------------------------------------------------------------------- */
/*                                   Stories                                  */
/* -------------------------------------------------------------------------- */

export const TextFields: Story = {
  args: {
    themeMode: 'dark',
  },

  render: (args) => <ThemedTextFieldRow themeMode={args.themeMode!} />,
};
