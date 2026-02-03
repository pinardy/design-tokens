import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { lightThemeOptions, darkThemeOptions } from '../theme/themeOptions';

type RadioStoryProps = {
  themeMode?: 'light' | 'dark';
};

const meta: Meta<RadioStoryProps> = {
  title: 'Overall/RadioButtonGroup',
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

type Story = StoryObj<RadioStoryProps>;

/* -------------------------------------------------------------------------- */
/*                             Themed Radio Row                                */
/* -------------------------------------------------------------------------- */

const ThemedRadioRow: React.FC<{ themeMode: 'light' | 'dark' }> = ({ themeMode }) => {
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
          <FormControlLabel value="default" control={<Radio />} label="Default" />

          {/* Checked */}
          <FormControlLabel value="checked" control={<Radio defaultChecked />} label="Selected" />

          {/* Disabled */}
          <FormControlLabel value="disabled" control={<Radio disabled />} label="Disabled" />

          {/* Disabled + Checked */}
          <FormControlLabel
            value="disabled-checked"
            control={<Radio defaultChecked disabled />}
            label="Disabled Selected"
          />
        </Stack>
      </Box>
    </ThemeProvider>
  );
};

/* -------------------------------------------------------------------------- */
/*                                   Stories                                  */
/* -------------------------------------------------------------------------- */

export const RadioButtons: Story = {
  render: (args) => <ThemedRadioRow themeMode={args.themeMode!} />,
};
