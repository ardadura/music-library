import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import axios from "axios";
import {variablesConst} from "../../constants/variables";

export interface SongsState {
  results: any,
  limit: number,
  query: any,
  loading: boolean
}

let initialState: SongsState = {
  results: [],
  limit: 10,
  query: '',
  loading: false
}


export const getSongs = createAsyncThunk('songs/getSongs', (props:any) => {
  const {query, limit} = props
  return axios({
    method: 'GET',
    url: 'https://itunes.apple.com/search?',
    params: {term: query, limit, media: variablesConst.media}
  }).then((response) => response.data)
})

export const songsSlice = createSlice({
  name: 'songs',
  initialState,
  extraReducers: builder => {
    builder.addCase(getSongs.pending, state => {
      state.loading = true
    })
    builder.addCase(getSongs.fulfilled, (state, action) => {
      state.loading = false
      state.results = action.payload.results.map((item: {
        artistName: string; collectionCensoredName: string;
        trackCensoredName: string; artworkUrl100: string; trackId: number
      }) => {
        return {
          artist: item.artistName,
          album: item.collectionCensoredName,
          song: item.trackCensoredName,
          coverImage: item.artworkUrl100,
          trackId: item.trackId
        }
      })
    })
  },
  reducers: {
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

export const { increaseCounter, setQuery } = songsSlice.actions

export default songsSlice.reducer
