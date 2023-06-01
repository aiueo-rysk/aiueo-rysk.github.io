import './App.css';

import React from 'react';

import { createTheme, ThemeProvider } from '@mui/material';

import HomePage from './components/pages/HomePage';

function App() {
  const defaultTheme = createTheme();
  const theme = createTheme(
    {
      components: {

        // TableHead配下のTableCellの文字色と背景色を変更
        MuiTableCell: {
          styleOverrides: {
            head: {
              color: defaultTheme.palette.common.white,
              backgroundColor: defaultTheme.palette.success.light,
            },
          },
        },

        MuiTab: {
          styleOverrides: {
            root: {
              minWidth: 150,
              // 選択中のタブの文字色をいい感じにする
              "&.Mui-selected": {
                color: "#fff",
                backgroundColor : defaultTheme.palette.primary.light
              },
              // 文字を太字
              fontWeight: "bold",
              display: 'inline-flex',
            },
          },
        },
      },
    }
  );
  return (
    <div className="App" style={{minWidth: 600}}>
      <ThemeProvider theme={theme}>
        <HomePage />
      </ThemeProvider>
    </div>
  );
}

export default App;
