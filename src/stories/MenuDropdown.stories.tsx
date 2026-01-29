import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { lightThemeOptions, darkThemeOptions } from '../theme/themeOptions';

type MenuStoryProps = {
    themeMode?: 'light' | 'dark';
};

const meta: Meta<MenuStoryProps> = {
    title: 'Overall/Menu',
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
type Story = StoryObj<MenuStoryProps>;

/* -------------------------------------------------------------------------- */
/*                           Theme Menu Row                                   */
/* -------------------------------------------------------------------------- */

const ThemedMenuItems: React.FC<{ themeMode: 'light' | 'dark' }> = ({ themeMode }) => {
    const theme = createTheme(
        themeMode === 'light' ? lightThemeOptions : darkThemeOptions
    );

    const [clickState0, Setclick0] = useState(false);
    const [clickState1, Setclick1] = useState(false);
    const [clickState2, Setclick2] = useState(false);
    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    rowGap: 4,
                    mt: 4,
                }}
            >
                <Stack direction="row" spacing={4} alignItems="center">
                    <MenuItem>Default</MenuItem>
                    <MenuItem selected>Selected</MenuItem>
                    <MenuItem disabled>Disabled</MenuItem>
                </Stack>

                <MenuList>
                    <MenuItem
                        selected={clickState0}
                        onClick={() => Setclick0(prev => !prev)}
                    >
                        Menu Item
                    </MenuItem>
                    <MenuItem
                        selected={clickState1}
                        onClick={() => Setclick1(prev => !prev)}
                    >
                        Menu Item
                    </MenuItem>
                    <MenuItem
                        selected={clickState2}
                        onClick={() => Setclick2(prev => !prev)}
                    >
                        Menu Item
                    </MenuItem>
                    <MenuItem disabled>Disabled Item</MenuItem>
                    <MenuItem disabled>Disabled Item</MenuItem>
                </MenuList>
            </Box>
        </ThemeProvider>
    );
};


/* -------------------------------------------------------------------------- */
/*                                   Stories                                  */
/* -------------------------------------------------------------------------- */

export const MenuDropdown: Story = {
    render: (args) => <ThemedMenuItems themeMode={args.themeMode!} />,
};
