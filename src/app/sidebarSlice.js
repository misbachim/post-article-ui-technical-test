import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sidebarShow: true,
}

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    setSidebarShow: (state, action) => {
      state.sidebarShow = action.payload
    },
    setSidebarUnfoldableShow: (state, action) => {
      state.sidebarUnfoldable = action.payload
    }
  }
});

export const { 
  setSidebarShow,
  setSidebarUnfoldableShow,
} = sidebarSlice.actions;

export const selectSidebarShow = (state) => state.sidebar.sidebarShow;
export const selectSidebarUnfoldable = (state) => state.sidebar.sidebarUnfoldable;

export default sidebarSlice.reducer;
