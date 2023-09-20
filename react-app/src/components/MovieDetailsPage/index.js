import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import { getMovieByIdThunk } from '../../store/movie';
import DeleteModal from '../DeleteModal';
import EditMovieForm from '../EditMovieForm';
import ReviewModal from '../ReviewModal';
import './MovieDetailsPage.css';
import EditReviewModal from '../EditReviewModal';
import AddActorToMovieModal from '../AddActorToMovieModal';

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
          <div className='edit-delete-bttns-container'>
            {sessionUser && sessionUser.id === singleMovie.user_id && (
              <div>
                <div onClick={handleEditButtonClick} className='update-delete-buttons'>
                  <i className='fa-regular fa-pen-to-square'></i>
                </div>
                <div onClick={handleDeleteButtonClick} className='update-delete-buttons'>
                  <i className='fa-regular fa-trash-can'></i>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="right-movie-header">
          <div className="movie-details-rating-container">
            <div className="movie-details-average-rating">
              <div className="inner-avg-rating-div">
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
              <div className="review-bttn-container">
                {sessionUser && (
                  <div className="review-bttn" onClick={handleCreateReviewClick}>
                    ☆ Rate
                  </div>
                )}
              </div>
            </div>
            <p>{singleMovie.genre}</p>
          </div>
          <div className="description-div">
            <p>{singleMovie.description}</p>
          </div>
          <p>Director: {singleMovie.director}</p>
          <p>Writer(s): {singleMovie.writer}</p>
          <p >Actor(s): {singleMovie.actors.map((actorData, index) => (
            <span key={actorData.actor.id}>
              <Link to={`/actors/${actorData.actor.id}`} key={actorData.actor.id} className="actor-link">
                {actorData.actor.name}
              </Link>
              {index < singleMovie.actors.length - 1 && ', '}
            </span>
          ))}
          </p>
        </div>
      </div>
      <div className="movie-trailer-div">
        <h3>Trailer:</h3>
        <iframe title="Movie Trailer" width="360" height="215" src={singleMovie.trailer} frameBorder="0" allowFullScreen></iframe>
      </div>
      <div className="movie-actors">
        <div className="actors-header">
          <h3>Top Cast:</h3>
          {sessionUser ? (
            <div
              onClick={() =>
                setModalContent(
                  <AddActorToMovieModal
                    movieId={singleMovie.id}
                    onClose={() => setModalContent(null)}
                  />
                )
              }
              className="cast-bttn"
            >
              🖉 Edit
            </div>
          ) : (
            <div
              onClick={() => {
                window.alert("Please sign in to edit the cast.");
              }}
              className="cast-bttn"
            >
              🖉 Edit
            </div>
          )}
        </div>
        {singleMovie.actors.length === 0 ? (
          <p>
            Be the first to{' '}
            <span
              className="add-actor-link"
              onClick={() =>
                sessionUser
                  ? setModalContent(
                    <AddActorToMovieModal
                      movieId={singleMovie.id}
                      onClose={() => setModalContent(null)}
                    />
                  )
                  : window.alert("Please sign in to add an actor to the movie.")
              }
            >
              add an actor
            </span>{' '}
            to the movie!
          </p>
        ) : null}
        <div className="cast-container">
          {singleMovie.actors.map((actorData, index) => (
            <div key={actorData.actor.id} className="actor-info">
              <Link
                to={`/actors/${actorData.actor.id}`}
                className="movie-actor-link"
              >
                <img
                  src={actorData.actor.img_url}
                  alt={actorData.actor.name}
                />
                {actorData.actor.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="movie-details-rating">
        <h3>User Reviews:</h3>
        <ul className='reviews-map'>
          {singleMovie.reviews.length === 0 ? (
            <p>
              Be the first to{' '}
              <span
                className="review-link"
                onClick={() =>
                  sessionUser
                    ? setModalContent(<ReviewModal movieId={singleMovie.id} />)
                    : window.alert("Please sign in to leave a review.")
                }
              >
                leave a review
              </span>
              !
            </p>
          ) : null}
          {singleMovie.reviews.map(review => (
            <li key={review.id}>
              <div className='inner-reviews-map'>
                <p>
                  <span className='star-icon'>★</span>
                  {review.rating}/5
                </p>
                <div className='edit-delete-bttns-container'>
                  {sessionUser && sessionUser.id === review.user_id && (
                    <div onClick={() => setModalContent(<EditReviewModal review={review} />)} className='update-delete-buttons'>
                      <i className='fa-regular fa-pen-to-square'></i>
                    </div>
                  )}
                  {sessionUser && sessionUser.id === review.user_id && (
                    <div onClick={() => setModalContent(<DeleteModal type="review" id={review.id} movieId={singleMovie.id} />)} className='update-delete-buttons'>
                      <i className='fa-regular fa-trash-can'></i>
                    </div>
                  )}
                </div>
              </div>
              <p className='username-p'>{review.username}</p>
              {review.content && <p>{review.content}</p>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MovieDetailsPage;

{/* <p>Actor(s): {singleMovie.actors.map(actorData => actorData.actor.name).join(', ')}</p> */ }
