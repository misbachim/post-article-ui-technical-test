import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchArticles, fetchCountArticle } from './articleAPI'

const initialState = {
  value: {
    articles: {},
    articleCount: {},
  },
  status: 'idle',
}

export const getArticles = createAsyncThunk(
  'article/fetchArticles',
  async ({ limit, offset, status }) => {
    const response = await fetchArticles(limit, offset, status)
    return { [status]: response.data }
  }
)

export const countArticle = createAsyncThunk(
  'article/fetchCountArticle',
  async (status) => {
    const response = await fetchCountArticle(status)
    return { [status]: response.data }
  }
)

export const listArticleSlice = createSlice({
  name: 'listArticle',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getArticles.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getArticles.fulfilled, (state, action) => {
        state.status = 'idle'
        state.value.articles = { ...state.value.articles, ...action.payload }
      })
      .addCase(countArticle.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(countArticle.fulfilled, (state, action) => {
        state.status = 'idle'
        state.value.articleCount = { ...state.value.articleCount, ...action.payload }
      })
  },
})

export const selectArticles = (state) => state.listArticle.value.articles
export const selectArticleCount = (state) => state.listArticle.value.articleCount

export default listArticleSlice.reducer
