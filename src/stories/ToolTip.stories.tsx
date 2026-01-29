import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { lightThemeOptions, darkThemeOptions } from '../theme/themeOptions';

type TooltipStoryProps = {
    themeMode?: 'light' | 'dark';
};

const meta: Meta<TooltipStoryProps> = {
    title: 'Overall/Tooltip',
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
type Story = StoryObj<TooltipStoryProps>;

/* -------------------------------------------------------------------------- */
/*                               Tooltip Row                                  */
/* -------------------------------------------------------------------------- */

const ThemedTooltipRow: React.FC<{ themeMode: 'light' | 'dark' }> = ({ themeMode }) => {
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
                    mt: 6,
                }}
            >
                <Stack spacing={6}>
                    <Stack direction="row" spacing={6} justifyContent="center">
                        <Tooltip title="Left Tooltip text" placement="left" open>
                            <Button variant="contained">Left</Button>
                        </Tooltip>
                        <Tooltip title="Right Tooltip text" placement="top" open>
                            <Button variant="contained">Top</Button>
                        </Tooltip>
                        <Tooltip title="Bottom Tooltip text" placement="bottom" open>
                            <Button variant="contained">Bottom</Button>
                        </Tooltip>
                        <Tooltip title="Right Tooltip text" placement="right" open>
                            <Button variant="contained">Right</Button>
                        </Tooltip>
                    </Stack>
                </Stack>

            </Box>
        </ThemeProvider>
    );
};

/* -------------------------------------------------------------------------- */
/*                                   Stories                                  */
/* -------------------------------------------------------------------------- */

export const ToolTips: Story = {
    render: (args) => <ThemedTooltipRow themeMode={args.themeMode!} />,
};
