import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { Store } from './redux/store';
import { BrowserRouter } from 'react-router-dom';

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';


const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#262626'
    },
    secondary: {
        main: '#673AB7'
    },
    error: {
      main: '#b00020'
    }
  },
})

ReactDOM.render(
  <BrowserRouter>
    <Provider store={Store}>
        <MuiThemeProvider theme={theme}>
            <App />
        </MuiThemeProvider>
    </Provider>
</BrowserRouter>, document.getElementById('root'));

serviceWorker.unregister();
