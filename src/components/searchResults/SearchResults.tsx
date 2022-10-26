import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import './SearchResults.scss'
// @ts-ignore
import styled from "styled-components";

const ListItem = styled.li`
  background-color: white;
  padding: 1rem;
  display: flex;
  align-items: center;
  margin: 0.4rem;
  cursor: pointer;

  &:hover {
    background-color: lightblue;
  }

  span {
    color: ${({color}: any) => color || "blue"};
    display: ${({display}: any) => display || "block"};;
  }
  
  div{
    display: inline-flex;
    flex-direction: column;
    padding-left: 1rem;
  }
`;

const EmptyState = styled.p`
  font-size: 24px;
  font-weight: bold;
  text-transform: uppercase;
`;

const SearchResults = ({getMoreData}: React.PropsWithoutRef<any>) => {
    const dispatch = useDispatch();
    const songs = useSelector((state: Array<any> | Object | any) => state.songs.results)
    const query = useSelector((state: any) => state.songs.query)
    const isLoading = useSelector((state: any) => state.songs.loading)

    const isScrolling = () => {
        if (window.innerHeight + document.documentElement.scrollTop < document.documentElement.offsetHeight - 10) {
            return;
        }
        getMoreData();
    }

    useEffect(() => {
        window.addEventListener("scroll", isScrolling);
        return () => window.removeEventListener("scroll", isScrolling);
    }, [dispatch, isScrolling])

    function RenderSongs() {
        return (
            <>
                {!!songs.length && songs.map((song: any) => {
                    return (
                        <ListItem color={'red'} key={song.trackId}>
                            <div><img src={song.coverImage}/></div>
                            <div>
                                <span>{song.artist}</span>
                                <span>{song.album}</span>
                                <span>{song.song}</span>
                            </div>
                        </ListItem>
                    )
                })
                }
            </>
        )
    }

    function RenderEmptyState() {
        return (
            <EmptyState>
                {!songs.length && !!query.length && !isLoading && 'There are no results'}
            </EmptyState>
        )
    }

    return (
        <ol className={'songs-list'}>
            <RenderSongs/>
            <RenderEmptyState/>
        </ol>
    )
}

export default SearchResults
