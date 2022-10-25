import {useEffect, useState} from 'react'
import axios from 'axios'
import {useDispatch, useSelector} from 'react-redux'
import {addList} from '../store/slices/songsSlice'

const UseSearchMusic = () => {
    const dispatch = useDispatch();
    const limit = useSelector((state: any) => state.songs.limit)
    const query = useSelector((state: any) => state.songs.query)

    function getSongs() {
        axios({
            method: 'GET',
            url: 'https://itunes.apple.com/search?',
            params: {term: query, limit, media: 'music'}
        }).then((response) => {
            dispatch(addList(response.data.results.map((item: {
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
            })))
        })
            .catch((error => {
                console.log(error)
            }))
            .finally(() => {
            })
    }

    return {getSongs}
}

export default UseSearchMusic
