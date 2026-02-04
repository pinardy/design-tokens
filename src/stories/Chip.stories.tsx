import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { lightThemeOptions, darkThemeOptions } from '../theme/themeOptions';

type ChipStoryProps = {
    themeMode?: 'light' | 'dark';
    intent?: 'primary' | 'secondary' | undefined;
};

const meta: Meta<ChipStoryProps> = {
    title: 'Overall/Chip',
    args: {
        themeMode: 'dark',
        intent: 'primary',
    },
    argTypes: {
        themeMode: {
            control: 'radio',
            options: ['light', 'dark'],
        },
        intent: {
            control: 'radio',
            options: ['primary', 'secondary'],
        },
    },
};

export default meta;
type Story = StoryObj<ChipStoryProps>;

/* -------------------------------------------------------------------------- */
/*                               Themed Chip Row                                  */
/* -------------------------------------------------------------------------- */

const ThemedChipRow: React.FC<{
    themeMode: 'light' | 'dark';
    intent?: 'primary' | 'secondary';
}> = ({ themeMode, intent }) => {
    const theme = createTheme(themeMode === 'light' ? lightThemeOptions : darkThemeOptions);

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Stack direction="column" spacing={2}>
                    <Stack direction="row" spacing={15} alignItems="flex-start">
                        <Box sx={{ height: 24, width: 64, display: 'flex', alignItems: 'center' }}></Box>
                        <Box sx={{ height: 24, display: 'flex', alignItems: 'center' }}>
                            <Typography color="grey.300">Default</Typography>
                        </Box>
                        <Box sx={{ height: 24, display: 'flex', alignItems: 'center' }}>
                            <Typography color="grey.300">Outlined</Typography>
                        </Box>
                    </Stack>
                    <Stack direction="row" spacing={15} alignItems="flex-start">
                        <Stack spacing={2}>
                            <Box sx={{ height: 24, display: 'flex', alignItems: 'center' }}></Box>
                            <Typography color="grey.300">Enabled</Typography>
                        </Stack>
                        <Stack spacing={2}>
                            <Box sx={{ height: 24, display: 'flex', alignItems: 'center' }}></Box>
                            <Chip label="Basic" onClick={() => { }} color={intent} />
                        </Stack>

                        <Stack spacing={2}>
                            <Box sx={{ height: 24, display: 'flex', alignItems: 'center' }}></Box>
                            <Chip label="Basic" variant="outlined" onClick={() => { }} color={intent} />
                        </Stack>
                    </Stack>

                    <Stack direction="row" spacing={15} alignItems="flex-start">
                        <Stack spacing={2}>
                            <Box sx={{ height: 24, display: 'flex', alignItems: 'center' }}></Box>
                            <Typography color="grey.300">Disabled</Typography>
                        </Stack>
                        <Stack spacing={2}>
                            <Box sx={{ height: 24, display: 'flex', alignItems: 'center' }}></Box>
                            <Chip label="Basic" disabled onClick={() => { }} color={intent} />
                        </Stack>

                        <Stack spacing={2}>
                            <Box sx={{ height: 24 }} />
                            <Chip label="Basic" variant="outlined" disabled onClick={() => { }} color={intent} />
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

export const BasicChip: Story = {
    args: {
        themeMode: 'dark',
        intent: 'secondary',
    },

    render: (args) => <ThemedChipRow themeMode={args.themeMode!} intent={args.intent} />,
};
