import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import SvgIcon from '@mui/material/SvgIcon';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { lightThemeOptions, darkThemeOptions } from '../theme/themeOptions';

type TabStoryProps = {
  themeMode?: 'light' | 'dark';
  intent?: 'primary' | 'secondary' | undefined;
};

const meta: Meta<TabStoryProps> = {
  title: 'Overall/Tabs',
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
type Story = StoryObj<TabStoryProps>;

/* -------------------------------------------------------------------------- */
/*                          Placeholder Icon                                  */
/* -------------------------------------------------------------------------- */

const PlaceholderIcon = () => (
  <SvgIcon fontSize="small">
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </SvgIcon>
);

/* -------------------------------------------------------------------------- */
/*                          Themed Tabs Row                                   */
/* -------------------------------------------------------------------------- */

type TabsVariant = 'icon-text' | 'text-only' | 'icon-only' | 'no-text';

const ThemedTabsRow: React.FC<{
  themeMode: 'light' | 'dark';
  intent?: 'primary' | 'secondary';
  variant: TabsVariant;
}> = ({ themeMode, intent, variant }) => {
  const theme = createTheme(themeMode === 'light' ? lightThemeOptions : darkThemeOptions);

  const renderTabs = () => {
    switch (variant) {
      case 'icon-text':
        return (
          <Tabs value={1} onChange={() => {}} textColor={intent} indicatorColor={intent}>
            <Tab icon={<PlaceholderIcon />} autoFocus label="Inactive" iconPosition="top" />
            <Tab icon={<PlaceholderIcon />} label="Active" iconPosition="top" />
            <Tab icon={<PlaceholderIcon />} label="Disabled" disabled iconPosition="top" />
          </Tabs>
        );

      case 'text-only':
        return (
          <Tabs value={1} onChange={() => {}} textColor={intent} indicatorColor={intent}>
            <Tab autoFocus label="Inactive" />
            <Tab label="Active" />
            <Tab label="Disabled" disabled />
          </Tabs>
        );

      case 'icon-only':
        return (
          <Tabs value={1} onChange={() => {}} textColor={intent} indicatorColor={intent}>
            <Tab icon={<PlaceholderIcon />} autoFocus aria-label="inactive" />
            <Tab icon={<PlaceholderIcon />} aria-label="active" />
            <Tab icon={<PlaceholderIcon />} disabled aria-label="disabled" />
          </Tabs>
        );

      case 'no-text':
        return (
          <Tabs value={1} onChange={() => {}} textColor={intent} indicatorColor={intent}>
            <Tab autoFocus aria-label="inactive" />
            <Tab aria-label="active" />
            <Tab disabled aria-label="disabled" />
          </Tabs>
        );
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: 6 }}>
        {renderTabs()}
      </Box>
    </ThemeProvider>
  );
};

/* -------------------------------------------------------------------------- */
/*                                   Stories                                  */
/* -------------------------------------------------------------------------- */

export const IconWithText: Story = {
  args: {
    themeMode: 'light',
  },

  render: (args) => (
    <ThemedTabsRow themeMode={args.themeMode!} intent={args.intent} variant="icon-text" />
  ),
};

export const TextOnly: Story = {
  render: (args) => (
    <ThemedTabsRow themeMode={args.themeMode!} intent={args.intent} variant="text-only" />
  ),
};

export const IconOnly: Story = {
  render: (args) => (
    <ThemedTabsRow themeMode={args.themeMode!} intent={args.intent} variant="icon-only" />
  ),
};

export const NoTextTabs: Story = {
  render: (args) => (
    <ThemedTabsRow themeMode={args.themeMode!} intent={args.intent} variant="no-text" />
  ),
};
