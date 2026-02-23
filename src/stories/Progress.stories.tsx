import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  ThemeProvider,
  createTheme,
} from '@mui/material/styles';

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import { lightThemeOptions, darkThemeOptions } from '../theme/themeOptions';

type ProgressStoryProps = {
  themeMode?: 'light' | 'dark';
};


const meta: Meta<ProgressStoryProps> = {
  title: 'Overall/Progress',
  args: {
    themeMode: 'dark',
  },
  argTypes: {
    themeMode: {
      control: 'radio',
      options: ['light', 'dark'],
    },
  },
};

export default meta;
type Story = StoryObj<ProgressStoryProps>;

/* -------------------------------------------------------------------------- */
/*                          Themed Progress Component                         */
/* -------------------------------------------------------------------------- */

const ThemedProgress: React.FC<{ themeMode: 'light' | 'dark' }> = ({
  themeMode,
}) => {
  const theme = createTheme(
    themeMode === 'light' ? lightThemeOptions : darkThemeOptions
  );

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress />
      </Box>
    </ThemeProvider>
  );
};

/* -------------------------------------------------------------------------- */
/*                                   Story                                    */
/* -------------------------------------------------------------------------- */

export const Circular: Story = {
  render: (args) => (
    <ThemedProgress themeMode={args.themeMode!} />
  ),
};
