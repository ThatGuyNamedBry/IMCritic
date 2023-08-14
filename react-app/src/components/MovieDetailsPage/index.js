import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import { getMovieByIdThunk } from '../../store/movie';
import DeleteModal from '../DeleteModal';
import EditMovieForm from '../EditMovieForm';
import './MovieDetailsPage.css';

function MovieDetailsPage() {
  const dispatch = useDispatch();
  const { movieId } = useParams();
  const singleMovie = useSelector(state => state.movies.singleMovie[movieId]);
  const { setModalContent } = useModal();

  useEffect(() => {
    dispatch(getMovieByIdThunk(movieId));
  }, [dispatch, movieId]);

  if (!singleMovie) {
    return <div>Loading details...</div>;
  }

  const handleDeleteButtonClick = () => {
    setModalContent(<DeleteModal type="movie" id={movieId} />);
  };

  const handleEditButtonClick = () => {
    setModalContent(<EditMovieForm movie={singleMovie} />);
  };

  return (
    <div className="movie-details-container">
      <h2>{singleMovie.title}</h2>
      <p>{singleMovie.release_year}</p>
      <img src={singleMovie.img_url} alt={singleMovie.title} />
      <iframe title="Movie Trailer" width="560" height="315" src={singleMovie.trailer} frameBorder="0" allowFullScreen></iframe>
      <button onClick={handleDeleteButtonClick}>Delete Movie</button>
      <button onClick={handleEditButtonClick}>Edit Movie</button>
    </div>
  );
}

export default MovieDetailsPage;
