import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addActorToMovieThunk } from '../../store/movie';

function AddActorToMovieModal({ movieId }) {
  const dispatch = useDispatch();
  const [selectedActors, setSelectedActors] = useState([]);
  const availableActors = useSelector((state) => state.actors.allActors);

  const handleActorSelection = (actorId) => {
    if (selectedActors.includes(actorId)) {
      setSelectedActors(selectedActors.filter((id) => id !== actorId));
    } else {
      setSelectedActors([...selectedActors, actorId]);
    }
  };

  const handleAddActors = () => {
    selectedActors.forEach((actorId) => {
      dispatch(addActorToMovieThunk(movieId, actorId));
    });
    // Close the modal or perform any other necessary actions.
  };

  useEffect(() => {
    // Fetch available actors here, if needed.
  }, []);

  return (
    <div className="add-actor-to-movie-modal">
      <h3>Add Actor(s) to Movie</h3>
      <ul>
        {Object.values(availableActors).map((actor) => (
          <li key={actor.id}>
            <label>
              <input
                type="checkbox"
                value={actor.id}
                checked={selectedActors.includes(actor.id)}
                onChange={() => handleActorSelection(actor.id)}
              />
              {actor.name}
            </label>
          </li>
        ))}
      </ul>
      <button onClick={handleAddActors}>Add Actor(s) to Movie</button>
    </div>
  );
}

export default AddActorToMovieModal;
