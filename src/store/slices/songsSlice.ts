import {createSlice} from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface SongsState {
  results: Array<any>,
  limit: number,
  query: any
}

let initialState: SongsState = {
  results: [],
  limit: 10,
  query: ''
}

export const songsSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {
    resetList: (state) => {
      state.results= [];
      state.limit = 10;
    },
    addList: (state, action: PayloadAction<any>) => {
      state.results= [state.results, ...action.payload];
    },
    increaseCounter: (state) => {
      state.limit = state.limit + 10;
    },
    setQuery: (state, action: PayloadAction<any>)=> {
      state.results= [];
      state.limit = 10;
      state.query = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { resetList, addList, increaseCounter, setQuery } = songsSlice.actions

export default songsSlice.reducer
