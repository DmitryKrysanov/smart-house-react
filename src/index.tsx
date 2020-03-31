import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { Store } from './redux/store'

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';


const theme = createMuiTheme({
  palette: {
    primary: {
        main: '#E33E7F'
      }
    }
  },
)

ReactDOM.render(
<Provider store={Store}>
    <MuiThemeProvider theme={theme}>
        <App />
    </MuiThemeProvider>
</Provider>, document.getElementById('root'));

serviceWorker.unregister();
