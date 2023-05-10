import React from 'react';
import ReactDOM from 'react-dom/client';
import { StyledEngineProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import { debounce } from 'debounce';
import { saveState } from './app/localStorage';
import { store } from './app/store';
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
    <StyledEngineProvider injectFirst>
      <Provider store={store}>
        <App />
      </Provider>
    </StyledEngineProvider>
  </React.StrictMode>
);
