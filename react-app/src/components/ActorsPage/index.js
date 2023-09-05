import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ActorsPage() {
  const { actorId } = useParams();
  const [actorMovies, setActorMovies] = useState([]);

  useEffect(() => {
    fetch(`/api/actors/${actorId}/movies`)
      .then((response) => response.json())
      .then((data) => setActorMovies(data))
      .catch((error) => console.error('Error fetching actor movies:', error));
  }, [actorId]);

  return (
    <div>
      <h2>Actor Movies</h2>
      <ul>
        {actorMovies.map((movie) => (
          <li key={movie.id}>
            <p>{movie.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ActorsPage;
