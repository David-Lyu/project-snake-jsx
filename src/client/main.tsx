import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter } from 'react-router-dom';

import App from './routes/App';
import Snake from './routes/snake/snake';
import HomePage from './routes/homepage/homepage';
import createAppState from './store/store';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage></HomePage>
  },
  {
    path: 'play',
    element: <Snake></Snake>
  }
]);

const AppState = createContext({} as Store);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppState.Provider value={createAppState()}>
      <App router={router}></App>
    </AppState.Provider>
  </React.StrictMode>
);
