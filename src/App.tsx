import React, {ChangeEvent, useEffect} from 'react';
import SearchInput from "./components/searchInput/SearchInput";
import SearchResults from "./components/searchResults/SearchResults";
import {getSongs, increaseCounter, setQuery} from "./store/slices/songsSlice";
import {useDispatch, useSelector} from "react-redux";
// @ts-ignore
import styled from 'styled-components';


const Container = styled.div`
  max-width: 600px;
  margin: 5rem auto;
  font-family: "Josefin Sans", sans-serif;
`;

const Loading = styled.div`
  display: flex;
  position: fixed;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  align-items: center;
  justify-content: center;
  background: #0000005e;
  pointer-events: none;
`

const LoadingContainer = styled.div`
  display: inline-block;
  width: 80px;
  height: 80px;

  &:after {
    content: " ";
    display: block;
    width: 64px;
    height: 64px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid red;
    border-color: red transparent red transparent;
    animation: lds-dual-ring 1.2s linear infinite;
  }

  @keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

function App() {
    const dispatch = useDispatch();
    const query = useSelector((state: any) => state.songs.query)
    const limit = useSelector((state: any) => state.songs.limit)
    const isLoading = useSelector((state:any) => state.songs.loading)

    useEffect(() => {
        // @ts-ignore
        dispatch(getSongs({query, limit}))
    }, [query, limit, dispatch])

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setQuery(e.target.value));
    };
    const getMoreData = () => {
        dispatch(increaseCounter());
    };

    return (
        <Container className="App">
            <SearchInput handleSearch={handleSearch}/>
            <SearchResults getMoreData={getMoreData}/>
            {isLoading && <Loading><LoadingContainer/></Loading>}
        </Container>
    );
}

export default App;
