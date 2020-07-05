import { configureStore } from '@reduxjs/toolkit';
import newsReducer from '../features/articles/articlesSlice';

export default configureStore({
  reducer: {
    news: newsReducer,
  },
});
