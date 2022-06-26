import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchArticle, putArticle } from './articleAPI'

const initialState = {
  value: null,
  status: 'idle',
}

export const getArticle = createAsyncThunk(
  'article/fetchArticle',
  async (id) => {
    const response = await fetchArticle(id)
    return response.data
  }
)

export const editArticle = createAsyncThunk(
  'article/putArticle',
  async (article) => {
    const response = await putArticle(article)
    return response.data
  }
)

export const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    setTitle: (state, action) => {
      state.value.title = action.payload
    },
    setContent: (state, action) => {
      state.value.content = action.payload
    },
    setCategory: (state, action) => {
      state.value.category = action.payload
    },
    setStatus: (state, action) => {
      state.value.status = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getArticle.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getArticle.fulfilled, (state, action) => {
        state.status = 'idle'
        state.value = action.payload
      })
      .addCase(editArticle.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(editArticle.fulfilled, (state, action) => {
        state.status = 'idle'
      })
  },
})

export const { 
  setTitle,
  setContent,
  setCategory,
  setStatus,
} = articleSlice.actions

export const selectArticle = (state) => state.article.value

export default articleSlice.reducer
