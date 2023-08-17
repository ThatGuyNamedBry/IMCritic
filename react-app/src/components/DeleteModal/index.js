// DeleteModal.js
import React from 'react';
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import { deleteMovieThunk, getMovieByIdThunk } from "../../store/movie";
import { deleteReviewThunk } from '../../store/reviews';
import './DeleteModal.css';

function DeleteModal({ type, id, movieId }) {

  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();

  const handleDelete = async () => {
    if (type === 'movie') {
      await dispatch(deleteMovieThunk(id));
      closeModal();
      history.push('/');
    } else if (type === 'review'){
      await dispatch(deleteReviewThunk(id));
      await dispatch(getMovieByIdThunk(movieId));
      closeModal();
    } else {
      closeModal();
    }
  }

  const handleCancel = () => {
    closeModal();
  }

  return (
    <div className="delete-modal-container">
      <h2>Confirm Delete</h2>
      <p>Are you sure you want to delete this {type}?</p>
      <div>
        <button className="delete-button" id="delete-button" onClick={handleDelete}>Delete</button>
        <button className="keep-button" id="keep-button" onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  )
}

export default DeleteModal;



// import { deleteSongThunk, getCurrentUserAllSongsThunk } from "../../store/songs";
// import { deletePlaylistThunk } from "../../store/playlists";

// await dispatch(getCurrentUserAllSongsThunk());
// } else if (type === 'rating') {
//   dispatch(deleteSongThunk(id));
// } else if (type === 'playlist') {
//   dispatch(deletePlaylistThunk(id))
