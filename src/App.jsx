import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import GridLayout from './Components/GridLayout';

export default function App() {
  const blameGameTheme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#6987c9',
      },
      secondary: {
        main: '#06D6A0',
      },
      background: {
        paper: '#f7f7f2',
      },
    },
  });

  return (
    <div className="App">
      <ThemeProvider theme={blameGameTheme}>
        <GridLayout />
      </ThemeProvider>
    </div>
  );
}
