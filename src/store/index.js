import { configureStore } from '@reduxjs/toolkit';

import BlogReducer from './BlogsSlice';

export default configureStore({
  reducer: {
    blog: BlogReducer,
  },
});
