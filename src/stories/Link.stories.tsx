import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
    ThemeProvider,
    createTheme,
} from '@mui/material/styles';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

import { lightThemeOptions, darkThemeOptions } from '../theme/themeOptions';

type LinkStoryProps = {
    themeMode?: 'light' | 'dark';
};

const meta: Meta<LinkStoryProps> = {
    title: 'Overall/Link',
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

type Story = StoryObj<LinkStoryProps>;

/* -------------------------------------------------------------------------- */
/*                               Themed Link Grid                             */
/* -------------------------------------------------------------------------- */
const ThemedLinkGrid: React.FC<{
    themeMode: 'light' | 'dark';
}> = ({ themeMode }) => {
    const theme = createTheme(
        themeMode === 'light' ? lightThemeOptions : darkThemeOptions
    );

    const preventNav = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
    };

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
            <Box sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                mt: 6
            }}>
                <Box
                    sx={{
                        border: '2px dashed rgba(156, 39, 176, 0.8)',
                        borderRadius: 2,
                        p: 2,
                        backgroundColor: theme.palette.background.default
                    }}>
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: '180px 240px',
                            gridAutoRows: '80px'
                        }}>

                        <Box sx={{ ...cellSx, border: 'none' }} />
                        <Box sx={cellSx}>
                            <Typography>
                                Hover / Focus / Tab
                            </Typography>
                        </Box>

                        <Box sx={labelCellSx}>
                            <Typography >
                                Primary Link
                            </Typography>
                        </Box>
                        <Box sx={cellSx}>
                            <Link href="#" color="primary" onClick={preventNav}>
                                Link
                            </Link>
                        </Box>

                        <Box sx={labelCellSx}>
                            <Typography>
                                Inherit Link
                            </Typography>
                        </Box>
                        <Box sx={cellSx}>
                            <Link href="#" color="secondary" onClick={preventNav}>
                                Link
                            </Link>
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
    render: (args) => (
        <ThemedLinkGrid
            themeMode={args.themeMode!}
        />
    ),
};