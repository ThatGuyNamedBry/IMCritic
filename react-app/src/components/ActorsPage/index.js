import React, { useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllMoviesThunk } from '../../store/movie';
import { getActorByIdThunk, getActorMoviesByIdThunk } from '../../store/actors';
import './ActorsPage.css';

function ActorsPage() {
  const { actorId } = useParams();
  const dispatch = useDispatch();
  const singleActor = useSelector(state => state.actors.singleActor[actorId]);
  const actorMovies = useSelector(state => state.actors.actorMovies);
  const allMovies = useSelector(state => state.movies.allMovies);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getActorByIdThunk(actorId));
      await dispatch(getAllMoviesThunk());
      await dispatch(getActorMoviesByIdThunk(actorId));
    };

    fetchData();
  }, [dispatch, actorId]);

  if (!singleActor) {
    return <div>Loading actor details...</div>;
  }

  const movieIds = Object.values(actorMovies).map(actorMovie => actorMovie.movie_id);
  const actorMoviesDetails = Object.values(allMovies).filter(movie => movieIds.includes(movie.id));

  return (
    <div className="actors-page">
      <div className='actor-info'>
        <h2>{singleActor.name}</h2>
        <div className="actor-image">
          <img src={singleActor.img_url} alt={singleActor.name} />
        </div>
      </div>
      <div className='known-for'>
        <h2>Known for:</h2>
      </div>
      <div className="all-movies-list">
        {actorMoviesDetails.map((movie) => (
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

export default ActorsPage;
