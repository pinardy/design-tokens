import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import { Surface } from '../_blocks/live';
import { linkBaseProps } from './spec';

type PlaygroundArgs = {
  themeMode: 'light' | 'dark';
  color: 'primary' | 'inherit';
  underline: 'always' | 'hover' | 'none';
  label: string;
};

const meta: Meta<PlaygroundArgs> = {
  title: 'Guidelines/Link',
  args: { themeMode: 'dark', color: 'primary', underline: 'always', label: 'Link' },
  argTypes: {
    themeMode: { control: 'radio', options: ['light', 'dark'] },
    color: { control: 'radio', options: ['primary', 'inherit'] },
    underline: { control: 'radio', options: ['always', 'hover', 'none'] },
  },
};

export default meta;

type Story = StoryObj<PlaygroundArgs>;

/** Interactive Link. Hover it and tab to it to see the real states. */
export const Playground: Story = {
  render: ({ themeMode, color, underline, label }) => (
    <Surface mode={themeMode} style={{ padding: 32 }}>
      <Link {...linkBaseProps} color={color} underline={underline}>
        {label}
      </Link>
    </Surface>
  ),
};

/** Inherit links take the colour of the text around them. */
export const InRunningText: Story = {
  args: { color: 'inherit' },
  render: ({ themeMode, color, underline }) => (
    <Surface mode={themeMode} style={{ padding: 32, maxWidth: 560 }}>
      <Typography>
        Read the{' '}
        <Link {...linkBaseProps} color={color} underline={underline}>
          release notes
        </Link>{' '}
        before upgrading, and check the{' '}
        <Link {...linkBaseProps} color={color} underline={underline}>
          migration guide
        </Link>{' '}
        if you use custom palette colours.
      </Typography>
    </Surface>
  ),
};
