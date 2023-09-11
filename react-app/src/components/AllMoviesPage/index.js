import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getAllMoviesThunk } from '../../store/movie';
import './AllMoviesPage.css';

function AllMoviesPage() {
  const dispatch = useDispatch();
  const allMovies = useSelector(state => state.movies.allMovies);

  useEffect(() => {
    dispatch(getAllMoviesThunk());
  }, [dispatch]);

  return (
    <div className="all-movies-page">
      <h2>All Movies</h2>
      <div className="all-movies-list">
        {Object.values(allMovies).map(movie => (
          <div key={movie.id} className="movie-card">
            <NavLink to={`/movies/${movie.id}`}>
              <img src={movie.img_url} alt={movie.title} />
            </NavLink>
            {movie.average_rating !== 0 ? (
              <div className="average-rating">
                <div className="rating-content">
                  <span className="star-icon">★</span>
                  {movie.average_rating.toFixed(1)}
                </div>
              </div>
            ) : (
              <div className="average-rating">
                <div className="rating-content">
                  <span className="star-icon">★</span>
                  New
                </div>
              </div>
            )}
            <NavLink to={`/movies/${movie.id}`}>
              <p>{movie.title}</p>
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllMoviesPage;
