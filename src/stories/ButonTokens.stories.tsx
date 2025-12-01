// src/stories/ButtonTokens.stories.tsx
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// YOUR THEME (imported from themeOptions.ts)
import { lightThemeOptions, darkThemeOptions } from '../theme/themeOptions';

type ButtonStoryProps = React.ComponentProps<typeof Button> & {
  themeMode?: 'light' | 'dark';
};

const meta: Meta<ButtonStoryProps> = {
  title: 'Overall/Button',
  component: Button,
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

type Story = StoryObj<ButtonStoryProps>;

/* -------------------------------------------------------------------------- */
/*                           Helper: Themed Button Row                         */
/* -------------------------------------------------------------------------- */

const ThemedRow: React.FC<{
  themeMode: 'light' | 'dark';
  color: ButtonStoryProps['color'];
}> = ({ themeMode, color }) => {
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
        <Stack direction="row" spacing={4}>
          <Button variant="contained" color={color}>
            Contained
          </Button>

          <Button variant="outlined" color={color}>
            Outlined
          </Button>

          <Button variant="text" color={color}>
            Text
          </Button>
        </Stack>
      </Box>
    </ThemeProvider>
  );
};

/* -------------------------------------------------------------------------- */
/*                                   Stories                                  */
/* -------------------------------------------------------------------------- */

export const Primary: Story = {
  render: (args) => <ThemedRow themeMode={args.themeMode!} color="primary" />,
};

export const Secondary: Story = {
  render: (args) => <ThemedRow themeMode={args.themeMode!} color="secondary" />,
};

export const Success: Story = {
  render: (args) => <ThemedRow themeMode={args.themeMode!} color="success" />,
};

export const Error: Story = {
  render: (args) => <ThemedRow themeMode={args.themeMode!} color="error" />,
};

export const Warning: Story = {
  render: (args) => <ThemedRow themeMode={args.themeMode!} color="warning" />,
};

export const Info: Story = {
  render: (args) => <ThemedRow themeMode={args.themeMode!} color="info" />,
};
