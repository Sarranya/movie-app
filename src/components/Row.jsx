import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Pagination from './Pagination';
import { useNavigate } from "react-router-dom";

const APIKEY = "806d692b"

const Row = () => {
  const [movies, setMovies] = useState([])
  const [noSearchData, setNoSearchData] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const [type, setType] = useState("movie");

  useEffect(() => {
    fetchMovies(currentPage);
  }, [currentPage]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = e.target.search.value;
    axios.get(`http://www.omdbapi.com/?apikey=${APIKEY}&s=${value}&page=1`).then((resp) => {
      console.log(resp.data.Response)
      if (resp.data.Response == "True") {
        setNoSearchData(true)
        setMovies(resp.data.Search)
      } else {
        setNoSearchData(false)
        setMovies([])
      }
    }).catch((error) => {
      console.log(error)
    })
  };

  const fetchMovies = async (page) => {
    try {
      const res = await axios.get(
        `https://www.omdbapi.com/?apikey=${APIKEY}&s=batman&page=${page}`
      );

      if (res.data.Response === "True") {
        setMovies(res.data.Search);
        setTotalPages(Math.ceil(res.data.totalResults / 10));
      } else {
        setMovies([]);
        setTotalPages(1);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const dropdownFilter = async (e) => {
    setType(e)
    try {
      const res = await axios.get(
        `http://www.omdbapi.com/?apikey=${APIKEY}&s=batman&type=${e}`
      );

      if (res.data.Response === "True") {
        setMovies(res.data.Search);
        setNoSearchData(true)
        setTotalPages(Math.ceil(res.data.totalResults / 10));
      } else {
        setMovies([]);
        setNoSearchData(false)
        setTotalPages(1);
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <div className='flex m-4 p-2 items-center justify-center'>
        <select
          value={type}
          onChange={(e) => dropdownFilter(e.target.value)}
          className="w-64 md:w-96 px-4 py-2 rounded-xl 
               bg-black/40 backdrop-blur-sm 
               text-white placeholder-white/70 
               focus:outline-none focus:ring-2 focus:ring-white/50 border border-white"
        >
          <option value="movie">Movie</option>
          <option value="series">Series</option>
          <option value="episode">Episode</option>
        </select>
        <form onSubmit={handleSubmit} className="flex items-center gap-4">
          <input
            type="text"
            name="search"
            placeholder="Search..."
            className="w-64 md:w-96 px-4 py-2 rounded-xl 
                     bg-black/40 backdrop-blur-sm 
                     text-white placeholder-white/70 
                     focus:outline-none focus:ring-2 focus:ring-white/50 border border-white ml-3"
          />
          <button
            type="submit"
            className="bg-red-600 px-6 py-2 rounded font-medium text-white hover:bg-red-700 transition cursor-pointer"
          >
            Search
          </button>
        </form>
      </div>
      {noSearchData ? (
        <div className="relative flex flex-col items-center m-4">
          <div id="slider" className="flex flex-wrap justify-center">
            {movies.map((item, id) => (
              <div
                key={id}
                className="w-[160px] sm:w-[200px] md:w-[240px] inline-block cursor-pointer relative p-4" onClick={() => navigate(`/movie/${item.imdbID}`)}
              >
                <img
                  className="w-full h-auto block"
                  src={item.Poster}
                  alt={item.Title}
                />
                <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
                  <p className="white-space-normal text-lg flex justify-center items-center h-full text-center">
                    {item?.Title} - {item.Year}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center space-x-2 mt-6">
          </div>
        </div>
      ) : (
        <p className="text-center text-lg text-gray-400 mt-10">Data Not Found</p>
      )}
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />

    </>
  )
}

export default Row