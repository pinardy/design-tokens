import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { lightThemeOptions, darkThemeOptions } from '../theme/themeOptions';

type SliderStoryProps = {
    themeMode?: 'light' | 'dark';
};

const meta: Meta<SliderStoryProps> = {
    title: 'Overall/Slider',
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
type Story = StoryObj<SliderStoryProps>;

/* -------------------------------------------------------------------------- */
/*                          Themed Slider Row                                 */
/* -------------------------------------------------------------------------- */

const ThemedSliderRow: React.FC<{ themeMode: 'light' | 'dark' }> = ({ themeMode }) => {
    const theme = createTheme(
        themeMode === 'light' ? lightThemeOptions : darkThemeOptions
    );

    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    width: 600,
                    p: 4,
                    bgcolor: 'background.default',
                }}
            >
                <Stack spacing={4}>
                    <Stack spacing={1}>
                        <Typography color="grey.300">Primary – Continuous</Typography>
                        <Slider
                            valueLabelDisplay="on"
                            defaultValue={50}
                            min={0}
                            max={100}
                        />
                        <Slider
                            valueLabelDisplay="auto"
                            defaultValue={50}
                            min={0}
                            max={100}
                            disabled
                        />
                    </Stack>

                    <Stack spacing={1}>
                        <Typography color="grey.300">Primary – Discrete</Typography>
                        <Slider
                            valueLabelDisplay="on"
                            defaultValue={50}
                            step={10}
                            marks
                            min={0}
                            max={100}
                        />
                        <Slider
                            valueLabelDisplay="auto"
                            defaultValue={50}
                            step={10}
                            marks
                            min={0}
                            max={100}
                            disabled
                        />
                    </Stack>

                    {/* Primary – Range */}
                    <Stack spacing={1}>
                        <Typography color="grey.300">Primary – Range</Typography>
                        <Slider
                            valueLabelDisplay="on"
                            defaultValue={[30, 70]}
                            step={10}
                            marks
                            min={0}
                            max={100}
                        />
                        <Slider
                            valueLabelDisplay="auto"
                            defaultValue={[30, 70]}
                            step={10}
                            marks
                            min={0}
                            max={100}
                            disabled
                        />
                    </Stack>
                </Stack>
            </Box>
        </ThemeProvider>
    );
};

/* -------------------------------------------------------------------------- */
/*                                   Story                                    */
/* -------------------------------------------------------------------------- */

export const PrimarySlider: Story = {
    args: {
        themeMode: 'dark',
    },
    render: (args) => <ThemedSliderRow themeMode={args.themeMode!} />,
};
