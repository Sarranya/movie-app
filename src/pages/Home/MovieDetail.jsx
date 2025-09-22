import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const APIKEY = "806d692b";

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  useEffect(() => {
    axios.get(`https://www.omdbapi.com/?apikey=${APIKEY}&i=${id}`)
      .then((resp) => {
        if (resp.data.Response === "True") {
          setMovie(resp.data);
        }
      });
  }, [id]);

  if (!movie) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">

      <button
        onClick={() => window.history.back()}
        className="mb-6 mt-5 self-start bg-gray-800 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-700 transition"
      >
        ← Back
      </button>

      <div className="max-w-5xl w-full grid md:grid-cols-2 gap-8 p-6 rounded-2xl bg-black/50 backdrop-blur-md border border-gray-700 shadow-xl">

        <div className="flex justify-center items-start">
          <img
            src={movie.Poster}
            alt={movie.Title}
            className="w-80 rounded-xl shadow-lg border border-gray-700"
          />
        </div>

        <div className="flex flex-col justify-center space-y-4">
          <h1 className="text-4xl font-bold">{movie.Title}</h1>
          <p className="text-lg text-gray-400">
            {movie.Year} • {movie.Runtime} • {movie.Genre}
          </p>
          <p className="italic text-gray-300">{movie.Plot}</p>

          <div className="flex gap-3 mt-2 flex-wrap">
            {movie.Ratings.map((r) => (
              <span
                key={r.Source}
                className="bg-gray-800 px-3 py-1 rounded-full text-sm font-semibold shadow"
              >
                {r.Source}: <span className="text-yellow-400">{r.Value}</span>
              </span>
            ))}
          </div>

          <div className="space-y-2 mt-4 text-sm md:text-base">
            <p><span className="font-semibold">Director:</span> {movie.Director}</p>
            <p><span className="font-semibold">Writer:</span> {movie.Writer}</p>
            <p><span className="font-semibold">Actors:</span> {movie.Actors}</p>
            <p><span className="font-semibold">Language:</span> {movie.Language}</p>
            <p><span className="font-semibold">Awards:</span> {movie.Awards}</p>
            <p><span className="font-semibold">Box Office:</span> {movie.BoxOffice}</p>
          </div>
        </div>
      </div>
    </div>

  );
}

export default MovieDetail;
