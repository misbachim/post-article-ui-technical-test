import { configureStore } from '@reduxjs/toolkit';
import listArticleReducer from './listArticleSlice';
import articleReducer from './articleSlice';
import sidebarReducer from './sidebarSlice';

export const store = configureStore({
  reducer: {
    listArticle: listArticleReducer,
    article: articleReducer,
    sidebar: sidebarReducer,
  },
});
