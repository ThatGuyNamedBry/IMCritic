import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { updateReviewThunk } from '../../store/reviews';
import { getMovieByIdThunk } from '../../store/movie';

const EditReviewModal = ({ review }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [rating, setRating] = useState(review.rating.toString());
  const [content, setContent] = useState(review.content);
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      rating: Number(rating),
      content: content,
    };

    const data = await dispatch(updateReviewThunk(review.id, formData));

    if (data.errors) {
      setErrors(data.errors);
    } else {
      dispatch(getMovieByIdThunk(review.movie_id));
      closeModal();
    }
  };

  return (
    <div>
      <h2>Edit Review</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Rating:
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
        </label>
        <label>
          Content:
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </label>
        <button type="submit">Save Changes</button>
        <button type="button" onClick={closeModal}>Cancel</button>
      </form>
      <ul className="errors-ul">
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
    </div>
  );
};

export default EditReviewModal;
