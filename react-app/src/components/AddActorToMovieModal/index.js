import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addActorToMovieThunk, getMovieByIdThunk, removeActorFromMovieThunk } from '../../store/movie';
import { useModal } from '../../context/Modal';
import { getAllActorsThunk } from '../../store/actors';
import { NavLink } from 'react-router-dom/cjs/react-router-dom';
import './AddActorToMovieModal.css';

function AddActorToMovieModal({ movieId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [selectedActor, setSelectedActor] = useState('');
  const singleMovie = useSelector((state) => state.movies.singleMovie[movieId]);
  const sessionUser = useSelector((state) => state.session.user);

  const availableActors = useSelector((state) => {
    const movieActorIds = singleMovie.actors.map((actorData) => actorData.actor.id);
    return Object.values(state.actors.allActors).filter(
      (actor) => !movieActorIds.includes(actor.id)
    );
  });

  const handleActorSelection = (e) => {
    const selectedValue = e.target.value;
    // console.log('Selected value:', selectedValue);
    setSelectedActor(selectedValue);
  };

  const handleAddActors = async () => {
    if (selectedActor) {
      await dispatch(addActorToMovieThunk(movieId, { actor_id: selectedActor }));
      await dispatch(getMovieByIdThunk(movieId))
      closeModal();
    }
  };

  const handleAddActorClick = () => {
    closeModal();
  };

  const handleRemoveActor = async (actorId) => {
    await dispatch(removeActorFromMovieThunk(movieId, actorId));
    await dispatch(getMovieByIdThunk(movieId));
  };

  useEffect(() => {
    dispatch(getAllActorsThunk())
  }, [dispatch]);

  return (
    <div className="add-actor-to-movie-modal">
      <h3>Add Actor to Movie</h3>
      <div>
        <label htmlFor="actorSelect">Select an Actor:</label>
        <select id="actorSelect" value={selectedActor} onChange={handleActorSelection}>
          <option value="">-- Select an Actor --</option>
          {availableActors.map((actor) => (
            <option key={actor.id} value={actor.id}>
              {actor.name}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleAddActors}>Add Actor to Movie</button>
      <div className="link-div">
        <p>
          Don't see the actor listed?
        </p>
        <p>
          <NavLink to="/actors/new" onClick={handleAddActorClick}>Add one here!</NavLink>
        </p>
      </div>
      <div className="current-actors">
        <h4>Current Cast in Movie:</h4>
        <ul>
          {singleMovie.actors.map((actorData) => (
            <div className='inner-actors-map-div'>
              <li key={actorData.actor.id}>
                {actorData.actor.name}
              </li>
              <li>
                {sessionUser && (
                  <button onClick={() => handleRemoveActor(actorData.actor.id)}>Remove</button>
                )}
              </li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AddActorToMovieModal;
