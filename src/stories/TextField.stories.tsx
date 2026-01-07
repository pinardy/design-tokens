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
        <Stack direction="column" spacing={4}>
        {/* Row 1 – Enabled */}
        <Stack direction="row" spacing={10} alignItems="flex-start">
          {/* Has Value: True */}
          <Stack spacing={2}>
            <Box sx={{ color: 'grey.300', fontSize: 14 }}>Has Value: True</Box>
            <TextField label="Label" defaultValue="Value" />
          </Stack>

          {/* Has Value: False */}
          <Stack spacing={2}>
            <Box sx={{ color: 'grey.300', fontSize: 14 }}>Has Value: False</Box>
            <TextField label="Label" />
          </Stack>

          {/* Input Adornments */}
          <Stack spacing={2}>
            <Box sx={{ color: 'grey.300', fontSize: 14 }}>Input Adornments</Box>
            <TextField
              label="Label"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">Kg</InputAdornment>
                  ),
                },
              }}
            />
            <TextField
              label="Label"
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">Kg</InputAdornment>
                  ),
                },
              }}
            />
          </Stack>
        </Stack>
        
        {/* Row 2 – Disabled */}
        <Stack direction="row" spacing={10} alignItems="flex-start">
          {/* Has Value: True – Disabled */}
          <Stack spacing={2}>
            <Box sx={{ color: 'grey.300', fontSize: 14 }}>Has Value: True – Disabled</Box>
            <TextField label="Label" defaultValue="Value" disabled />
          </Stack>

          {/* Has Value: False – Disabled */}
          <Stack spacing={2}>
            <Box sx={{ color: 'grey.300', fontSize: 14 }}>Has Value: False – Disabled</Box>
            <TextField label="Label" disabled />
          </Stack>

          {/* Input Adornments – Disabled */}
          <Stack spacing={2}>
            <Box sx={{ color: 'grey.300', fontSize: 14 }}>Input Adornments – Disabled</Box>
            <TextField
              label="Label"
              disabled
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start" disableTypography>Kg</InputAdornment>
                  ),
                },
              }}
            />
          </Stack>
        </Stack>

        {/* Row 3 – Error (NO helper text) */}
        <Stack direction="row" spacing={10} alignItems="flex-start">
          {/* Has Value: True – Error */}
          <Stack spacing={2}>
            <Box sx={{ color: 'grey.300', fontSize: 14 }}>Has Value: True – Error</Box>
            <TextField
              label="Label"
              defaultValue="Value"
              error
            />
          </Stack>

          {/* Has Value: False – Error */}
          <Stack spacing={2}>
            <Box sx={{ color: 'grey.300', fontSize: 14 }}>Has Value: False – Error</Box>
            <TextField
              label="Label"
              error
            />
          </Stack>

          {/* Input Adornments – Error */}
          <Stack spacing={2}>
            <Box sx={{ color: 'grey.300', fontSize: 14 }}>Input Adornments – Error</Box>
            <TextField
              label="Label"
              error
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">Kg</InputAdornment>
                  ),
                },
              }}
            />
            {/* Error + suffix */}
            <TextField
              label="Label"
              error
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">Kg</InputAdornment>
                  ),
                },
              }}
            />
          </Stack>
        </Stack>

        {/* Row 4 – Error + Helper (bottom rows of PDF) */}
        <Stack direction="row" spacing={10} alignItems="flex-start">
          {/* Has Value: True – Error + helper */}
          <Stack spacing={2}>
            <Box sx={{ color: 'grey.300', fontSize: 14 }}>Has Value: True – Error</Box>
            <TextField
              label="Label"
              defaultValue="Value"
              error
              helperText="Helper text"
            />
          </Stack>

          {/* Has Value: False – Error + helper */}
          <Stack spacing={2}>
            <Box sx={{ color: 'grey.300', fontSize: 14 }}>Has Value: False – Error</Box>
            <TextField
              label="Label"
              error
              helperText="Helper text"
            />
          </Stack>

          {/* Input Adornments – Error + helper */}
          <Stack spacing={2}>
            <Box sx={{ color: 'grey.300', fontSize: 14 }}>Input Adornments – Error</Box>
            <TextField
              label="Label"
              error
              helperText="Helper text"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">Kg</InputAdornment>
                  ),
                },
              }}
            />
            {/* Error + helper + suffix */}
            <TextField
              label="Label"
              error
              helperText="Helper text"
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">Kg</InputAdornment>
                  ),
                },
              }}
            />
          </Stack>
        </Stack>
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
