import React, {ChangeEvent, useEffect, useState} from 'react';
import './App.css';
import SearchInput from "./components/searchBar/SearchInput";
import SearchResults from "./components/searchResults/SearchResults";
import UseSearchMusic from "./customHooks/UseSearchMusic";
import {increaseCounter, setQuery} from "./store/slices/songsSlice";
import {useDispatch, useSelector} from "react-redux";

function App() {
  const dispatch = useDispatch();
  const {getSongs} = UseSearchMusic();

  const query = useSelector((state: any) => state.songs.query)
  const limit = useSelector((state: any) => state.songs.limit)

  useEffect(()=> {
    getSongs();
  }, [query, limit])

  const handleSearch = (e:  ChangeEvent<HTMLInputElement>) => {
    dispatch(setQuery(e.target.value));
  };
  const getMoreData = () => {
    dispatch(increaseCounter());
  };

  return (
    <div className="App">
      <SearchInput handleSearch={handleSearch} />
      <SearchResults getMoreData={getMoreData}/>
    </div>
  );
}

export default App;
