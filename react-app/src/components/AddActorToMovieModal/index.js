import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addActorToMovieThunk } from '../../store/movie';
import { useModal } from '../../context/Modal';
import { getAllActorsThunk } from '../../store/actors';

function AddActorToMovieModal({ movieId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [selectedActor, setSelectedActor] = useState('');
  const availableActors = useSelector((state) => state.actors.allActors);

  const handleActorSelection = (e) => {
    setSelectedActor(e.target.value);
  };

  const handleAddActors = () => {
    if (selectedActor) {
      dispatch(addActorToMovieThunk(movieId, selectedActor));
      closeModal();
    }
  };

  useEffect(() => {
    dispatch(getAllActorsThunk())
  }, [dispatch]);

  return (
    <div className="add-actor-to-movie-modal">
      <h3>Add Actor to Movie</h3>
      <div>
        <label htmlFor="actorSelect">Select an Actor:</label>
        <select
          id="actorSelect"
          value={selectedActor}
          onChange={handleActorSelection}
        >
          <option value="">-- Select an Actor --</option>
          {Object.values(availableActors).map((actor) => (
            <option key={actor.id} value={actor.id}>
              {actor.name}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleAddActors}>Add Actor to Movie</button>
    </div>
  );
}

export default AddActorToMovieModal;
