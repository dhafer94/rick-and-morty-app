// import './wdyr'; // <--- first import
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';

import { createTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/styles";
import background from './background.png';


const theme = createTheme({
  overrides: {
    MuiCssBaseline: {
      "@global": {
        body: {
          fontFamily: 'Playfair Display, serif',
          // backgroundColor: '#00b0c8',
          backgroundImage: `url(${background})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat round',

          height: '100%',
          padding: 0,
          margin: 0,
          textAlign: 'center',
          opacity: 0.8,
        },
        html: {
          fontFamily: 'Playfair Display, serif',
          padding: 0,
          margin: 'auto 0',
          textAlign: 'center',
        },

        h1: {
          color: '#363636'
        },
        "*::-webkit-scrollbar": {
          width: "15px"
        },
        "*::-webkit-scrollbar-track": {
          background: "#E4EFEF"
        },
        "*::-webkit-scrollbar-thumb": {
          background: "#1D388F61",
          borderRadius: "2px",
          height: '20px'
        }
      }
    }
  }
});

ReactDOM.render(

  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode >

  , document.getElementById('root')
);

