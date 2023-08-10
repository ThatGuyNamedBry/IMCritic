import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getMovieByIdThunk } from '../../store/movie';

function MovieDetailsPage() {
  const dispatch = useDispatch();
  const { movieId } = useParams();
  const singleMovie = useSelector(state => state.movies.singleMovie[movieId]);

  useEffect(() => {
    dispatch(getMovieByIdThunk(movieId));
  }, [dispatch, movieId]);

  if (!singleMovie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="movie-details">
      <h2>{singleMovie.title}</h2>
      <p>{singleMovie.release_year}</p>
      <iframe title="Movie Trailer" width="560" height="315" src={singleMovie.trailer} frameBorder="0" allowFullScreen></iframe>
    </div>
  );
}

export default MovieDetailsPage;
