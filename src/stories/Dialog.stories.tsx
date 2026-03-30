import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { lightThemeOptions, darkThemeOptions } from '../theme/themeOptions';

type DialogStoryProps = {
  themeMode?: 'light' | 'dark';
};

const meta: Meta<DialogStoryProps> = {
  title: 'Overall/Dialog',
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
type Story = StoryObj<DialogStoryProps>;

/* -------------------------------------------------------------------------- */
/*                          Themed Dialog Row                                 */
/* -------------------------------------------------------------------------- */

const ThemedDialog: React.FC<{ themeMode: 'light' | 'dark' }> = ({ themeMode }) => {
  const theme = createTheme(themeMode === 'light' ? lightThemeOptions : darkThemeOptions);

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          height: '100vh',
          bgcolor: theme.palette.background.default,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Fake page content */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            p: 6,
          }}
        >
          <Typography variant="h3" gutterBottom>
            Page Content
          </Typography>

          <Typography>The standard Lorem Ipsum passage.</Typography>
        </Box>
        <Dialog open disablePortal fullWidth maxWidth="sm">
          <DialogTitle>
            <Typography variant="h6">Title</Typography>
          </DialogTitle>

          <DialogContent>
            <Box
              sx={{
                border: '2px dashed',
                borderColor: 'purple',
                borderRadius: 1,
                py: 2,
                textAlign: 'center',
              }}
            >
              <Typography variant="body1" color="secondary.main">
                Body Object
              </Typography>
            </Box>
          </DialogContent>

          <DialogActions
            sx={{
              px: 3,
              pt: 3,
              justifyContent: 'flex-end',
              gap: 2,
            }}
          >
            <Button variant="contained">Confirm</Button>
            <Button variant="outlined">Cancel</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
};

/* -------------------------------------------------------------------------- */
/*                                   Story                                    */
/* -------------------------------------------------------------------------- */

export const BasicDialog: Story = {
  render: (args) => <ThemedDialog themeMode={args.themeMode!} />,
};
