import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { lightThemeOptions, darkThemeOptions } from '../theme/themeOptions';

type SwitchStoryProps = {
  themeMode?: 'light' | 'dark';
};

const meta: Meta<SwitchStoryProps> = {
  title: 'Overall/Switch',
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

type Story = StoryObj<SwitchStoryProps>;

/* -------------------------------------------------------------------------- */
/*                           Themed Switch Row                                 */
/* -------------------------------------------------------------------------- */

const ThemedSwitchRow: React.FC<{ themeMode: 'light' | 'dark' }> = ({ themeMode }) => {
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
          <FormControlLabel control={<Switch />} label="Default" />

          {/* Checked */}
          <FormControlLabel control={<Switch defaultChecked />} label="Checked" />

          {/* Disabled */}
          <FormControlLabel control={<Switch disabled />} label="Disabled" />
        </Stack>
      </Box>
    </ThemeProvider>
  );
};

/* -------------------------------------------------------------------------- */
/*                                   Stories                                  */
/* -------------------------------------------------------------------------- */

export const Switches: Story = {
  args: {
    themeMode: 'dark',
  },
  render: (args) => <ThemedSwitchRow themeMode={args.themeMode!} />,
};
