import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

import { lightThemeOptions, darkThemeOptions } from '../theme/themeOptions';

type BreadcrumbStoryProps = {
  themeMode?: 'light' | 'dark';
};

const meta: Meta<BreadcrumbStoryProps> = {
  title: 'Overall/BreadCrumbs',
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
type Story = StoryObj<BreadcrumbStoryProps>;

/* -------------------------------------------------------------------------- */
/*                               Icon placeholders                            */
/* -------------------------------------------------------------------------- */
const StarIcon = () => (
  <Box
    component="svg"
    viewBox="0 0 16 16"
    width={16}
    height={16}
    sx={{ fill: 'currentColor', mr: 0.5 }}
  >
    <polygon points="8,1 10,6 15,6 11,9 13,14 8,11 3,14 5,9 1,6 6,6" />
  </Box>
);

const ChevronIcon = () => (
  <Box
    component="svg"
    viewBox="0 0 16 16"
    width={16}
    height={16}
    sx={{ fill: 'none', stroke: 'currentColor', strokeWidth: 2 }}
  >
    <path d="M6 3l4 5-4 5" />
  </Box>
);

/* -------------------------------------------------------------------------- */
/*                               Link Helpers                                 */
/* -------------------------------------------------------------------------- */
const CrumbLink = ({ icon = false }: { icon?: boolean }) => (
  <Link
    href="#"
    color="secondary"
    onClick={(e) => e.preventDefault()}
    sx={{ display: 'inline-flex', alignItems: 'center' }}
  >
    {icon && <StarIcon />}
    Link
  </Link>
);

const Current = ({ icon = false }: { icon?: boolean }) => (
  <Typography color="text.primary" sx={{ display: 'inline-flex', alignItems: 'center' }}>
    {icon && <StarIcon />}
    Link
  </Typography>
);

/* -------------------------------------------------------------------------- */
/*                               BreadCrumb Grid                              */
/* -------------------------------------------------------------------------- */
const BreadCrumbGrid: React.FC<{ themeMode: 'light' | 'dark' }> = ({ themeMode }) => {
  const theme = createTheme(themeMode === 'light' ? lightThemeOptions : darkThemeOptions);

  const cellSx = {
    minHeight: 80,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px dashed rgba(156, 39, 176, 0.6)',
  };

  const labelCellSx = {
    ...cellSx,
    justifyContent: 'flex-start',
    px: 2,
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: 6 }}>
        <Box
          sx={{
            border: '2px dashed rgba(156, 39, 176, 0.8)',
            borderRadius: 2,
            p: 2,
            backgroundColor: theme.palette.background.default,
          }}
        >
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '180px 360px 360px',
              gridAutoRows: '80px',
            }}
          >
            <Box sx={{ ...cellSx, border: 'none' }} />
            <Box sx={cellSx}>
              <Typography>Collapsed: False</Typography>
            </Box>
            <Box sx={cellSx}>
              <Typography>Collapsed: True</Typography>
            </Box>

            <Box sx={labelCellSx}>
              <Typography>Icon: True — Text*</Typography>
            </Box>
            <Box sx={cellSx}>
              <Breadcrumbs separator="/">
                <CrumbLink icon />
                <CrumbLink icon />
                <Current icon />
              </Breadcrumbs>
            </Box>
            <Box sx={cellSx}>
              <Breadcrumbs separator="/" maxItems={2}>
                <CrumbLink icon />
                <CrumbLink icon />
                <CrumbLink icon />
                <Current icon />
              </Breadcrumbs>
            </Box>

            <Box sx={labelCellSx}>
              <Typography>Icon: True — Icon</Typography>
            </Box>
            <Box sx={cellSx}>
              <Breadcrumbs separator={<ChevronIcon />}>
                <CrumbLink icon />
                <CrumbLink icon />
                <Current icon />
              </Breadcrumbs>
            </Box>
            <Box sx={cellSx}>
              <Breadcrumbs separator={<ChevronIcon />} maxItems={2}>
                <CrumbLink icon />
                <CrumbLink icon />
                <CrumbLink icon />
                <Current icon />
              </Breadcrumbs>
            </Box>

            <Box sx={labelCellSx}>
              <Typography>Icon: False — Text*</Typography>
            </Box>
            <Box sx={cellSx}>
              <Breadcrumbs separator="/">
                <CrumbLink />
                <CrumbLink />
                <Current />
              </Breadcrumbs>
            </Box>
            <Box sx={cellSx}>
              <Breadcrumbs separator="/" maxItems={2}>
                <CrumbLink />
                <CrumbLink />
                <CrumbLink />
                <Current />
              </Breadcrumbs>
            </Box>

            <Box sx={labelCellSx}>
              <Typography>Icon: False — Icon</Typography>
            </Box>
            <Box sx={cellSx}>
              <Breadcrumbs separator={<ChevronIcon />}>
                <CrumbLink />
                <CrumbLink />
                <Current />
              </Breadcrumbs>
            </Box>
            <Box sx={cellSx}>
              <Breadcrumbs separator={<ChevronIcon />} maxItems={2}>
                <CrumbLink />
                <CrumbLink />
                <CrumbLink />
                <Current />
              </Breadcrumbs>
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

/* -------------------------------------------------------------------------- */
/*                                   Stories                                  */
/* -------------------------------------------------------------------------- */
export const Default: Story = {
  render: (args) => <BreadCrumbGrid themeMode={args.themeMode!} />,
};
