import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store';
import { Toaster } from 'sonner';
import { BrowserRouter } from 'react-router-dom';
import LoadingBar from 'react-redux-loading-bar';

import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <StrictMode>
      <BrowserRouter>
        <LoadingBar
          style={{
            backgroundColor: '#4CAF50',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 50,
          }}
        />
        <Toaster richColors position="top-right" />
        <App />
      </BrowserRouter>
    </StrictMode>
  </Provider>
);
