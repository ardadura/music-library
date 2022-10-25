import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";

const SearchResults = ({getMoreData}: React.PropsWithoutRef<any>) => {
    const songs = useSelector((state: any) => state.songs.results)

    const isScrolling =()=>{
        if(window.innerHeight + document.documentElement.scrollTop!==document.documentElement.offsetHeight){
            return;
        }
        getMoreData();
    }

    useEffect(()=>{
        window.addEventListener("scroll", isScrolling);
        return () => window.removeEventListener("scroll", isScrolling);
    }, [])

    function RenderSongs() {
        return (
            <>
                {songs && songs.map((song: any) => {
                    return (
                        <li key={song.trackId} style={{ marginBottom: '100px' }}>
                            <span>{song.artist}</span>
                            <span>{song.album}</span>
                            <span>{song.song}</span>
                            <span>{song.coverImage}</span>
                        </li>
                    )
                })
                }
            </>
        )
    }

    return (
        <ol>
            <RenderSongs/>
        </ol>
    )
}

SearchResults.propTypes = {
    songs: Array
}

export default SearchResults
