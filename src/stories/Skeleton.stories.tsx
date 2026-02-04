import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { lightThemeOptions, darkThemeOptions } from '../theme/themeOptions';

type SkeletonStoryProps = {
    themeMode?: 'light' | 'dark';
};

const meta: Meta<SkeletonStoryProps> = {
    title: 'Overall/Skeleton',
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
type Story = StoryObj<SkeletonStoryProps>;

/* -------------------------------------------------------------------------- */
/*                          Themed Skeleton Row                                   */
/* -------------------------------------------------------------------------- */

const ThemedSkeletonRow: React.FC<{ themeMode: 'light' | 'dark' }> = ({ themeMode }) => {
  const theme = createTheme(
    themeMode === 'light' ? lightThemeOptions : darkThemeOptions
  );

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
        <Box
          sx={{
            width: 520,
            p: 4,
            bgcolor: 'background.default',
            borderRadius: 2,
          }}
        >
          <Stack spacing={4}>
            <Stack direction="row" spacing={3} alignItems="center">
              <Typography color="grey.300" sx={{ width: 80 }}>
                Text
              </Typography>
              <Skeleton variant="text" animation="pulse" width={320} />
            </Stack>

            <Stack direction="row" spacing={3} alignItems="center">
              <Typography color="grey.300" sx={{ width: 80 }}>
                Circle
              </Typography>
              <Skeleton variant="circular" animation="pulse" width={56} height={56} />
            </Stack>

            <Stack direction="row" spacing={3} alignItems="center">
              <Typography color="grey.300" sx={{ width: 80 }}>
                Rectangle
              </Typography>
              <Skeleton variant="rectangular" animation="pulse" width={320} height={80} />
            </Stack>

            <Stack direction="row" spacing={3} alignItems="center">
              <Typography color="grey.300" sx={{ width: 80 }}>
                Rounded
              </Typography>
              <Skeleton variant="rounded" animation="pulse" width={96} height={40} />
            </Stack>
          </Stack>
        </Box>
      </Box>
    </ThemeProvider>
  );
};


/* -------------------------------------------------------------------------- */
/*                                   Stories                                  */
/* -------------------------------------------------------------------------- */

export const Skeletons: Story = {
    render: (args) => <ThemedSkeletonRow themeMode={args.themeMode!} />,
};
