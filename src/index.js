import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import Blog from './components/Blog';
import store from './store';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

const root = createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Blog />
  </Provider>
);
