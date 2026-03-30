import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import ToggleButton from '@mui/material/ToggleButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SvgIcon from '@mui/material/SvgIcon';

import { lightThemeOptions, darkThemeOptions } from '../theme/themeOptions';

type ToggleButtonStoryProps = {
  themeMode?: 'light' | 'dark';
};

const meta: Meta<ToggleButtonStoryProps> = {
  title: 'Overall/Toggle Button',
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
type Story = StoryObj<ToggleButtonStoryProps>;

/* -------------------------------------------------------------------------- */
/*                               Helper Icon                                  */
/* -------------------------------------------------------------------------- */

const PlaceholderBoldIcon: React.FC = () => (
  <SvgIcon fontSize="small" viewBox="0 0 24 24">
    <path d="M7 4h6a3 3 0 010 6H7z" fill="currentColor" />
    <path d="M7 10h6.5a3.5 3.5 0 010 7H7z" fill="currentColor" />
  </SvgIcon>
);

/* -------------------------------------------------------------------------- */
/*                          Helper Cell Component                             */
/* -------------------------------------------------------------------------- */

const Cell: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: 56,
    }}
  >
    {children}
  </Box>
);

/* -------------------------------------------------------------------------- */
/*                        Themed Toggle Button Showcase                       */
/* -------------------------------------------------------------------------- */

const ToggleShowcase: React.FC<{ themeMode: 'light' | 'dark' }> = ({ themeMode }) => {
  const theme = createTheme(themeMode === 'light' ? lightThemeOptions : darkThemeOptions);

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          bgcolor: theme.palette.background.default,
          p: 6,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '180px repeat(2, 120px)',
            columnGap: 4,
            rowGap: 5,
            alignItems: 'center',
          }}
        >
          <Box />
          <Typography align="center" variant="subtitle2">
            Default
          </Typography>
          <Typography align="center" variant="subtitle2">
            Disabled
          </Typography>

          <Typography>Selected: False</Typography>

          <Cell>
            <ToggleButton value="false-default">
              <PlaceholderBoldIcon />
            </ToggleButton>
          </Cell>

          <Cell>
            <ToggleButton value="false-disabled" disabled>
              <PlaceholderBoldIcon />
            </ToggleButton>
          </Cell>

          <Box />
          <Cell>
            <ToggleButton value="false-text-default">Button</ToggleButton>
          </Cell>

          <Cell>
            <ToggleButton value="false-text-disabled" disabled>
              Button
            </ToggleButton>
          </Cell>

          <Typography>Selected: True</Typography>

          <Cell>
            <ToggleButton value="true-default" selected>
              <PlaceholderBoldIcon />
            </ToggleButton>
          </Cell>

          <Cell>
            <Box />
          </Cell>

          <Box />
          <Cell>
            <ToggleButton value="true-text-default" selected>
              Button
            </ToggleButton>
          </Cell>

          <Cell>
            <Box />
          </Cell>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

/* -------------------------------------------------------------------------- */
/*                                   Story                                    */
/* -------------------------------------------------------------------------- */

export const Default: Story = {
  render: (args) => <ToggleShowcase themeMode={args.themeMode!} />,
};
