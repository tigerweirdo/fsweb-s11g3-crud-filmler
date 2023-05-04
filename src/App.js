import React, { useEffect, useState } from "react";
import { BrowserRouter as Router,Switch, Route, Redirect } from "react-router-dom";
import axios from 'axios';

import MovieList from './components/MovieList';
import Movie from './components/Movie';
import EditMovieForm from "./components/EditMovieForm";
import MovieHeader from './components/MovieHeader';
import FavoriteMovieList from './components/FavoriteMovieList';
import AddMovieForm from './components/AddMovieForm';

const App = (props) => {
  const [movies, setMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:9000/api/movies')
      .then(res => {
        setMovies(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const deleteMovie = (id) => {
    axios
      .delete(`http://localhost:9000/api/movies/${id}`)
      .then((res) => {
        setMovies(movies.filter((movie) => movie.id !== id));
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const addToFavorites = (movie) => {
    // Implement addToFavorites function
  };

  return (
    <div>
      <nav className="bg-zinc-800 px-6 py-3">
        <h1 className="text-xl text-white">HTTP / CRUD Film Projesi</h1>
      </nav>
      <Router>
      <div className="max-w-4xl mx-auto px-3 pb-4">
        <MovieHeader />
        <div className="flex flex-col sm:flex-row gap-4">
          <FavoriteMovieList favoriteMovies={favoriteMovies} />
          
          <Switch>
        <Route exact path="/movies">
          <MovieList movies={movies} />
        </Route>

        <Route path="/movies/edit/:id">
          <EditMovieForm setMovies={setMovies} />
        </Route>
        <Route path="/add-movie">
          <AddMovieForm setMovies={setMovies} />
        </Route>

        <Route path="/movies/:id">
          <Movie deleteMovie={deleteMovie} />
        </Route>

        <Route path="/">
          <Redirect to="/movies" />
        </Route>
      </Switch>
      
        </div>
      </div>
      </Router>
    </div>
  );
};

export default App;
