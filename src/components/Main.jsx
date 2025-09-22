import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'

const Main = () => {
    const [movies, setMovies] = useState([])
    const movie = movies[Math.floor(Math.random() * movies.length)]
    const highResPoster = movie?.Poster?.replace("SX300", "SX1080");

    useEffect(() => {
        axios.get("https://www.omdbapi.com/?apikey=806d692b&s=batman").then((resp) => {
            setMovies(resp.data.Search)
        })
    }, [])

    return (
        <>
            <Navbar />
            <div className='w-full h-[550px]'>
                <div className='w-full h-full'>
                    <div className='absolute w-full h-[550px]'></div>
                    <img src={highResPoster} alt={movie?.Title} className='w-full h-full object-cover' />
                    <div className='w-full absolute top-[40%] p-4 md:p-8'>
                        {/* <h1 className='text-3lx font-bold'>{movie?.Title}</h1> */}
                        <div className='my-4'>
                            {/* <button className='border bg-gray-300 text-black cursor-pointer border-gray-300 py-2 px-5'>Play</button>
                            <button className='border text-white cursor-pointer border-gray-300 py-2 px-5 ml-4'>Watch later</button> */}
                        </div>
                        {/* <p className='text-grey-400 text-sm '>Released: {movie?.Year}</p> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Main