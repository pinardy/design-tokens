import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { lightThemeOptions, darkThemeOptions } from '../theme/themeOptions';

type SelectStoryProps = {
  themeMode?: 'light' | 'dark';
  displayHelperText?: boolean;
};

const meta: Meta<SelectStoryProps> = {
  title: 'Overall/Select',
  args: { themeMode: 'dark', displayHelperText: true },
  argTypes: {
    themeMode: { control: 'radio', options: ['light', 'dark'] },
    displayHelperText: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<SelectStoryProps>;

/* -------------------------------------------------------------------------- */
/*                           Themed Select Row                                */
/* -------------------------------------------------------------------------- */

const ThemedSelectRow: React.FC<{
  themeMode: 'light' | 'dark';
  displayHelperText: boolean;
}> = ({ themeMode, displayHelperText }) => {
  const theme = createTheme(themeMode === 'light' ? lightThemeOptions : darkThemeOptions);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Stack direction="column" spacing={6}>
          <Stack direction="row" spacing={10} alignItems="flex-start">
            <Stack spacing={2}>
              <Box sx={{ height: 24, display: 'flex', alignItems: 'center' }}>
                <Typography color="grey.300">Has Value: True</Typography>
              </Box>
              <FormControl sx={{ minWidth: 240 }}>
                <InputLabel shrink>Label</InputLabel>
                <Select value="value" label="Label" renderValue={() => 'Value'} />
                <Box sx={{ minHeight: 24 }}>
                  {displayHelperText && <FormHelperText>Helper text</FormHelperText>}
                </Box>
              </FormControl>
            </Stack>

            <Stack spacing={2}>
              <Box sx={{ height: 24, display: 'flex', alignItems: 'center' }}>
                <Typography color="grey.300">Has Value: False</Typography>
              </Box>
              <FormControl sx={{ minWidth: 240 }}>
                <InputLabel shrink={false}>Label</InputLabel>
                <Select displayEmpty/>
                <Box sx={{ minHeight: 24 }}>
                  {displayHelperText && <FormHelperText>Helper text</FormHelperText>}
                </Box>
              </FormControl>
            </Stack>
          </Stack>

          <Stack direction="row" spacing={10} alignItems="flex-start">
            <Stack spacing={2}>
              <Box sx={{ height: 24, display: 'flex', alignItems: 'center' }}>
                <Typography color="grey.300">Disabled</Typography>
              </Box>
              <FormControl disabled sx={{ minWidth: 240 }}>
                <InputLabel shrink>Label</InputLabel>
                <Select value="value" label="Label" renderValue={() => 'Value'} />
                <Box sx={{ minHeight: 24 }}>
                  {displayHelperText && <FormHelperText>Helper text</FormHelperText>}
                </Box>
              </FormControl>
            </Stack>

            <Stack spacing={2}>
              <Box sx={{ height: 24 }} />
              <FormControl disabled sx={{ minWidth: 240 }}>
                <InputLabel shrink={false}>Label</InputLabel>
                <Select displayEmpty/>
                <Box sx={{ minHeight: 24 }}>
                  {displayHelperText && <FormHelperText>Helper text</FormHelperText>}
                </Box>
              </FormControl>
            </Stack>
          </Stack>

          <Stack direction="row" spacing={10} alignItems="flex-start">
            <Stack spacing={2}>
              <Box sx={{ height: 24, display: 'flex', alignItems: 'center' }}>
                <Typography color="grey.300">Error</Typography>
              </Box>
              <FormControl error sx={{ minWidth: 240 }}>
                <InputLabel shrink>Label</InputLabel>
                <Select value="value" label="Label" renderValue={() => 'Value'} />
                <Box sx={{ minHeight: 24 }}>
                  {displayHelperText && <FormHelperText>Helper text</FormHelperText>}
                </Box>
              </FormControl>
            </Stack>

            <Stack spacing={2}>
              <Box sx={{ height: 24 }} />
              <FormControl error sx={{ minWidth: 240 }}>
                <InputLabel shrink={false}>Label</InputLabel>
                <Select displayEmpty/>
                <Box sx={{ minHeight: 24 }}>
                  {displayHelperText && <FormHelperText>Helper text</FormHelperText>}
                </Box>
              </FormControl>
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

export const Selections: Story = {
  args: {
    displayHelperText: false,
  },
  render: (args) => (
    <ThemedSelectRow themeMode={args.themeMode!} displayHelperText={args.displayHelperText!} />
  ),
};
