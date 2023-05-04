

import React from 'react';
import { Link } from 'react-router-dom';

const MovieList = (props) => {
  const { movies } = props;

  return (
    <div className="bg-gray-100 shadow rounded-md p-5">
      <h5 className="font-bold text-gray-800">Filmler</h5>
      <div className="pt-3 text-sm">
        {movies.map((movie) => (
          <Link
            key={movie.id}
            className="py-1 flex gap-2 justify-between text-gray-800 hover:text-blue-600"
            to={`/movies/${movie.id}`}
          >
            {movie.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
