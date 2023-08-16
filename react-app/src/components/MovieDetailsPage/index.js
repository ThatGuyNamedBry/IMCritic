import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import { getMovieByIdThunk } from '../../store/movie';
import DeleteModal from '../DeleteModal';
import EditMovieForm from '../EditMovieForm';
import ReviewModal from '../ReviewModal';
import './MovieDetailsPage.css';
import EditReviewModal from '../EditReviewModal';

function MovieDetailsPage() {
  const dispatch = useDispatch();
  const { movieId } = useParams();
  const singleMovie = useSelector(state => state.movies.singleMovie[movieId]);
  const sessionUser = useSelector(state => state.session.user);
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

  const handleCreateReviewClick = () => {
    setModalContent(<ReviewModal movieId={singleMovie.id} />);
  };


  return (
    <div className="movie-details-container">
      <div className='movie-header'>
        <div className='left-movie-header'>
          <h2>{singleMovie.title}</h2>
          <p>{singleMovie.release_year}</p>
          <img src={singleMovie.img_url} alt={singleMovie.title} />
        </div>
        <div className='right-movie-header'>
          <p>{singleMovie.genre}</p>
          <p>{singleMovie.description}</p>
          <p>Director: {singleMovie.director}</p>
          <p>Writer(s): {singleMovie.writer}</p>
        <div className="movie-details-average-rating">
          <div className='inner-avg-rating-div'>
            {singleMovie.average_rating !== 0 ? (
              <div className="movie-details-rating-content">
                <span className="movie-details-star-icon">★</span>
                {singleMovie.average_rating.toFixed(1)}
              </div>
            ) : (
              <div className="movie-details-rating-content">
                <span className="movie-details-star-icon">★</span>
                New
              </div>
            )}
          </div>
          {sessionUser && (
            <button onClick={handleCreateReviewClick}>Add a Review</button>
          )}
        </div>
        </div>
      </div>
      <p>Trailer</p>
      <iframe title="Movie Trailer" width="360" height="215" src={singleMovie.trailer} frameBorder="0" allowFullScreen></iframe>
      <div className="movie-details-rating">
        <h3>User Reviews:</h3>
        <ul className='reviews-map'>
          {singleMovie.reviews.map(review => (
            <li key={review.id}>
              <p>Rating: {review.rating}</p>
              {review.content && <p>Review: {review.content}</p>}
              <div>
                {sessionUser && sessionUser.id === review.user_id && (
                  <button onClick={() => setModalContent(<EditReviewModal review={review} />)}>Edit Review</button>
                )}
                {sessionUser && sessionUser.id === review.user_id && (
                  <button onClick={() => setModalContent(<DeleteModal type="review" id={review.id} movieId={singleMovie.id} />)}>Delete Review</button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
      {sessionUser && (
        <div>
          <button onClick={handleDeleteButtonClick}>Delete Movie</button>
          <button onClick={handleEditButtonClick}>Edit Movie</button>
        </div>
      )}
    </div>
  );
}

export default MovieDetailsPage;
