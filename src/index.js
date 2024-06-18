import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import React from 'react';

import Blog from './components/Blog';
import store from './store';

const root = createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Blog />
  </Provider>
);
