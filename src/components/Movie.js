import React, { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const Movie = (props) => {
  const [movie, setMovie] = useState(null);
  const { id } = useParams();
  const { push } = useHistory();

  useEffect(() => {
    axios
      .get(`http://localhost:9000/api/movies/${id}`)
      .then((res) => {
        setMovie(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, [id]);

  const handleDelete = () => {
    props.deleteMovie(id);
    push("/movies");
  };

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-100 rounded-md shadow flex-1">
      <div className="p-5 pb-3 border-b border-gray-300">
        <h4 className="text-xl font-bold text-gray-800">{movie.title} Detayları</h4>
      </div>
      <div className="px-5 py-3 text-gray-800">
        <div className="py-1 flex">
          <div className="view-label">İsim</div>
          <div className="flex-1">{movie.title}</div>
        </div>
        <div className="py-1 flex">
          <div className="view-label">Yönetmen</div>
          <div className="flex-1">{movie.director}</div>
        </div>
        <div className="py-1 flex">
          <div className="view-label">Tür</div>
          <div className="flex-1">{movie.genre}</div>
        </div>
        <div className="py-1 flex">
          <div className="view-label">Metascore</div>
          <div className="flex-1">{movie.metascore}</div>
        </div>
        <div className="py-1 flex">
          <div className="view-label">Açıklama</div>
          <p className="flex-1">{movie.description}</p>
        </div>
      </div>
      <div className="px-5 py-3 border-t border-gray-300 flex justify-end gap-2">
        <Link
          to={`/movies/edit/${movie.id}`}
          className="py-2 px-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg shadow-md focus:outline-none"
        >
          Düzenle
        </Link>
        <button
          type="button"
          className="py-2 px-4 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-lg shadow-md focus:outline-none"
          onClick={handleDelete}
        >
          Sil
        </button>
      </div>
    </div>
  );
};

export default Movie;
