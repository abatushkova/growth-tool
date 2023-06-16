import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { debounce } from 'debounce';
import { saveState } from './app/localStorage';
import { store } from './app/store';
import { theme } from './themes';
import App from './components/App/App';
import './index.css';

store.subscribe(debounce(() => {
  saveState(store.getState());
}, 1000));

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
