import type { Preview } from "@storybook/react-vite";
import React from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { darkThemeOptions } from "../src/theme/themeOptions";


const theme = createTheme(darkThemeOptions);

const preview: Preview = {
  parameters: {
  backgrounds: {
    default: "dark",
    values: [
      { name: "dark", value: "#000000" },   // <- force black
      { name: "light", value: "#ffffff" },
    ],
  },

    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },

  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default preview;

// import type { Preview } from '@storybook/react-vite'

// const preview: Preview = {
//   parameters: {
//     controls: {
//       matchers: {
//        color: /(background|color)$/i,
//        date: /Date$/i,
//       },
//     },
//   },
// };

// export default preview;