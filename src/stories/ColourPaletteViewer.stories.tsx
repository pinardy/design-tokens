import type { Meta, StoryObj } from '@storybook/react';
import ColourPaletteViewer from './ColourPaletteViewer';

const meta: Meta<typeof ColourPaletteViewer> = {
  title: 'Overall/Colour Palette',
  component: ColourPaletteViewer,
};

export default meta;

type Story = StoryObj<typeof ColourPaletteViewer>;

export const Colour_Palette: Story = {};
