import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { lightThemeOptions, darkThemeOptions } from '../theme/themeOptions';

type CheckboxStoryProps = {
  themeMode?: 'light' | 'dark';
};

const meta: Meta<CheckboxStoryProps> = {
  title: 'Overall/Checkbox',
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

type Story = StoryObj<CheckboxStoryProps>;

/* -------------------------------------------------------------------------- */
/*                             Themed Checkbox Row                             */
/* -------------------------------------------------------------------------- */

const ThemedCheckboxRow: React.FC<{ themeMode: 'light' | 'dark' }> = ({ themeMode }) => {
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
          <FormControlLabel control={<Checkbox />} label="Default" />

          <FormControlLabel control={<Checkbox defaultChecked />} label="Checked" />

          <FormControlLabel control={<Checkbox disabled />} label="Disabled" />

          <FormControlLabel
            control={<Checkbox defaultChecked disabled />}
            label="Disabled Checked"
          />
        </Stack>
      </Box>
    </ThemeProvider>
  );
};

/* -------------------------------------------------------------------------- */
/*                                   Stories                                  */
/* -------------------------------------------------------------------------- */

export const Checkboxes: Story = {
  render: (args) => <ThemedCheckboxRow themeMode={args.themeMode!} />,
};
