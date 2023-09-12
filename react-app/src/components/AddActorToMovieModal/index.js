import React, { useState } from 'react';

function AddActorToMovieModal({ movieId }) {
  const [selectedActorId, setSelectedActorId] = useState(null);

  const handleActorSelect = (actorId) => {
    setSelectedActorId(actorId);
  };

  const handleAddActor = () => {

  };

  return (
    <div className="add-actor-to-movie-modal">
      <h3>Add Actor to Movie</h3>
      <ul>
        {/* Render the list of actors here */}
      </ul>
      <button onClick={handleAddActor}>Add Actor to Movie</button>
    </div>
  );
}

export default AddActorToMovieModal;
